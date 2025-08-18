// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Importe aqui!
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { MailProvider } from './mail/enums/mail-provider.enum';

@Module({
  imports: [
    // Torne o ConfigModule global para que todos os outros módulos possam usá-lo
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    MailModule.forRoot({
      provider: MailProvider.NODEMAILER, // ou MailProvider.AWS_SES  ou outro provider que vc quiser implementar
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }