import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly publicRoutes: string[] = [
    '/auth/login',
    '/auth/register',
  ];

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const path = req.path;
    const method = req.method;

    if (this.isPublicRoute(path, method)) {
      return next();
    }

    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant ou invalide');
    }

    const token = authHeader.substring(7);

    try {
      const secret = this.configService.get<string>('JWT_SECRET') || 'default-secret-key';
      const payload = this.jwtService.verify(token, { secret });
      
      (req as any).user = payload;
      
      next();
    } catch (error) {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }

  private isPublicRoute(path: string, method: string): boolean {
    const normalizedPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;

    if (this.publicRoutes.some(route => normalizedPath.startsWith(route))) {
      return true;
    }


    if (method === 'GET' && (normalizedPath === '/api/products' || normalizedPath.startsWith('/api/products/'))) {
      return true;
    }

    // GET sur analytics/top-products est public pour la mise en page de la landing page
    if (method === 'GET' && normalizedPath === '/api/analytics/top-products') {
      return true;
    }

    // POST sur analytics/track peut être public pour tracker les visiteurs anonymes
    if (method === 'POST' && normalizedPath === '/api/analytics/track') {
      return true;
    }

    return false;
  }
}

