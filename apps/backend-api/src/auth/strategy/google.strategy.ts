// src/auth/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
      passReqToCallback: true, // Habilita a passagem da requisição para o método `validate`
    });
  }

  async validate(
    request: any, // Adicione este parâmetro
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails, photos, name } = profile;
    const googleId = profile.id;
    const user = request.user; // O usuário autenticado, se existir

    // Cenário 1: Vincular conta
    if (user) {
      const existingUserWithGoogle = await this.usersService.findByGoogleId(googleId);

      // Se a conta Google já estiver vinculada a outro usuário, impede a vinculação
      if (existingUserWithGoogle && existingUserWithGoogle.id !== user.id) {
        return done(null, false, { message: 'Esta conta Google já está vinculada a outro usuário.' });
      }

      // Atualiza o usuário logado com o googleId
      const updatedUser = await this.usersService.update(user.id, {
        googleId
      });
      return done(null, updatedUser);
    }

    // Cenário 2: Login social novo (já implementado antes)
    const existingUser = await this.usersService.findByEmail(emails[0].value);

    if (existingUser) {
      // Se o usuário já existe, mas a conta Google não está vinculada, a gente vincula
      if (!existingUser.googleId) {
        const updatedUser = await this.usersService.update(existingUser.id, {

        });
        return done(null, updatedUser);
      }
      return done(null, existingUser);
    } else {
      // Cria um novo usuário, se não existir
      const newUser = await this.usersService.create({
        email: emails[0].value,
        name: name.givenName + ' ' + name.familyName,
        isEmailVerified: true,
        googleId,
      });
      return done(null, newUser);
    }
  }
}