import { Module, DynamicModule } from '@nestjs/common';
import { MailService } from './mail.service';
import { NodemailerProvider } from './providers/nodemailer.provider';
import { AWSSESProvider } from './providers/aws-ses.provider';
import { MailProvider } from './enums/mail-provider.enum';

export interface MailModuleOptions {
    provider: MailProvider;
}

@Module({})
export class MailModule {
    static forRoot(options: MailModuleOptions): DynamicModule {
        const providerMap = {
            [MailProvider.NODEMAILER]: NodemailerProvider,
            [MailProvider.AWS_SES]: AWSSESProvider,
        };

        const SelectedProvider = providerMap[options.provider];

        return {
            module: MailModule,
            providers: [
                {
                    provide: 'MAIL_PROVIDER',
                    useClass: SelectedProvider,
                },
                MailService,
            ],
            exports: [MailService],
            global: true,
        };
    }
}