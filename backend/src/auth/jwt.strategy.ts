import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    if (request?.cookies?.['auth_token']) {
                        return request.cookies['auth_token'];
                    }
                    return ExtractJwt.fromAuthHeaderAsBearerToken()(request);
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'default-secret-key',
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, email: payload.email, role: payload.role };
    }
}

