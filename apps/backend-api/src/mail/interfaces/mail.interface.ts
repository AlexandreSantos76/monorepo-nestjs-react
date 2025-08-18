export interface MailOptions {
    to: string;
    subject: string;
    html: string;
    from?: string;
}

export interface MailResponse {
    success: boolean;
    messageId?: string;
    error?: string;
}

export interface IMailProvider {
    sendMail(options: MailOptions): Promise<MailResponse>;
}