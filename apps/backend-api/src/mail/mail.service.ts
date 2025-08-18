import { Injectable, Inject } from '@nestjs/common';
import { IMailProvider, MailOptions, MailResponse } from './interfaces/mail.interface';
import { EmailTemplates } from '../auth/templates/email.templates';

@Injectable()
export class MailService {
    constructor(
        @Inject('MAIL_PROVIDER') private readonly mailProvider: IMailProvider,
    ) { }

    async sendMail(options: MailOptions): Promise<MailResponse> {
        return await this.mailProvider.sendMail(options);
    }

    async sendPasswordResetEmail(
        to: string,
        resetToken: string,
        userName?: string
    ): Promise<MailResponse> {
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        return await this.sendMail({
            to,
            subject: 'Redefinição de Senha',
            html: EmailTemplates.passwordReset(resetUrl, userName),
        });
    }

    async sendEmailConfirmation(
        to: string,
        confirmationToken: string,
        userName?: string
    ): Promise<MailResponse> {
        const confirmationUrl = `${process.env.FRONTEND_URL}/confirm-email?token=${confirmationToken}`;

        return await this.sendMail({
            to,
            subject: 'Confirme seu Email',
            html: EmailTemplates.emailConfirmation(confirmationUrl, userName),
        });
    }
}