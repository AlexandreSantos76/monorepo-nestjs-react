// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // A estratégia falha se o token estiver expirado
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        // O 'payload' é o objeto que você incluiu no token,
        // por exemplo: { email: 'test@example.com', sub: 1 }

        // Você pode fazer uma validação adicional aqui,
        // como buscar o usuário no banco de dados para garantir que ele ainda exista.

        return { id: payload.sub, email: payload.email };
        // O retorno dessa função se torna o objeto 'req.user'
    }
}