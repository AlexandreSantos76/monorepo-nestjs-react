import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private mailService: MailService,
        private configService: ConfigService,
    ) { }
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (await bcrypt.compare(pass, user?.password ?? '')) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas.');
        }
        const payload = { email: user.email, sub: user.id };
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }
    async requestPasswordReset(email: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            // Para evitar enumerar e-mails, retorne uma resposta genérica
            return { message: 'Se o e-mail estiver cadastrado, um link de recuperação foi enviado.' };
        }
        const payload = { email: user.email, sub: user.id, purpose: 'reset-password' };
        const token = this.jwtService.sign(payload, {
            expiresIn: '1h',
            secret: this.configService.get('JWT_SECRET'),
        });
        await this.mailService.sendPasswordResetEmail(email, token);
        return { message: 'Se o e-mail estiver cadastrado, um link de recuperação foi enviado.' };
    }

    // Método para redefinir a senha
    async resetPassword(token: string, newPasswordDto: ResetPasswordDto) {
        try {
            const payload = this.jwtService.verify(token, { secret: this.configService.get('JWT_SECRET') });
            if (payload.purpose !== 'reset-password') {
                throw new UnauthorizedException('Token inválido para esta operação.');
            }
            const user = await this.usersService.findByEmail(payload.email);
            if (!user) {
                throw new UnauthorizedException('Usuário não encontrado.');
            }
            const hashedPassword = await bcrypt.hash(newPasswordDto.password, 10);
            await this.usersService.update(user.id, { password: hashedPassword });
            return { message: 'Senha redefinida com sucesso.' };
        } catch (e) {
            throw new UnauthorizedException('Token de recuperação inválido ou expirado.');
        }
    }

    async forgotPassword(email: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Usuário não encontrado.');
        }
        const token = this.jwtService.sign({ email: user.email, sub: user.id }, {
            expiresIn: '1h',
            secret: this.configService.get('JWT_SECRET'),
        });
        await this.mailService.sendPasswordResetEmail(email, token);
        return { message: 'E-mail de recuperação enviado.' };
    }

    async confirmEmail(email: string, token: string) {
        try {
            const payload = this.jwtService.verify(token, { secret: this.configService.get('JWT_SECRET') });
            if (payload.email !== email) {
                throw new UnauthorizedException('E-mail não corresponde ao token.');
            }
            const user = await this.usersService.findByEmail(payload.email);
            if (!user) {
                throw new UnauthorizedException('Usuário não encontrado.');
            }
            if (user.isEmailVerified) {
                return { message: 'E-mail já confirmado.' };
            }
            user.verifyEmail();
            await this.usersService.update(user.id, user);
            return { message: 'E-mail confirmado com sucesso.' };
        } catch (e) {
            throw new UnauthorizedException('Token de confirmação inválido ou expirado.');
        }
    }

    // Método para login com Google
    async googleLogin(req: any) {
        if (!req.user) {
            throw new UnauthorizedException('Usuário não autenticado.');
        }
        const user = req.user;
        const payload = { email: user.email, sub: user.id };
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }
}
