import { Injectable } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { IMailProvider, MailOptions, MailResponse } from '../interfaces/mail.interface';

@Injectable()
export class AWSSESProvider implements IMailProvider {
  private sesClient: SESClient;

  constructor() {
    this.sesClient = new SESClient({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async sendMail(options: MailOptions): Promise<MailResponse> {
    try {
      const params = {
        Source: options.from || process.env.MAIL_FROM_ADDRESS,
        Destination: {
          ToAddresses: [options.to],
        },
        Message: {
          Subject: {
            Data: options.subject,
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: options.html,
              Charset: 'UTF-8',
            },
          },
        },
      };

      const command = new SendEmailCommand(params);
      const result = await this.sesClient.send(command);

      return {
        success: true,
        messageId: result.MessageId,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}