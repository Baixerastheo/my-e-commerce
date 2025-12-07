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

    if (
      path.startsWith('/api-json') || 
      path.startsWith('/api/swagger') || 
      path.includes('.') ||
      (!path.startsWith('/api') && !path.startsWith('/auth'))
    ) {
      return next();
    }

    if (this.isPublicRoute(path, method)) {
      return next();
    }

    let token: string | null = null;
    
    if (req.cookies?.['auth_token']) {
      token = req.cookies['auth_token'];
    } else {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    
    if (!token) {
      throw new UnauthorizedException('Token manquant ou invalide');
    }

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

    if (method === 'GET' && normalizedPath === '/api/analytics/top-products') {
      return true;
    }

    if (method === 'POST' && normalizedPath === '/api/analytics/track') {
      return true;
    }

    return false;
  }
}

