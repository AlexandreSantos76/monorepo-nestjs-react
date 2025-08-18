import { Injectable } from '@nestjs/common';
import * as  nodemailer from 'nodemailer';
import { IMailProvider, MailOptions, MailResponse } from '../interfaces/mail.interface';

@Injectable()
export class NodemailerProvider implements IMailProvider {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true' || false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    async sendMail(options: MailOptions): Promise<MailResponse> {
        try {
            const result = await this.transporter.sendMail({
                from: options.from || process.env.MAIL_FROM_ADDRESS,
                to: options.to,
                subject: options.subject,
                html: options.html,
            });

            return {
                success: true,
                messageId: result.messageId,
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
            };
        }
    }
}