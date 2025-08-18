export class EmailTemplates {
    static passwordReset(resetUrl: string, userName?: string): string {
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { 
            display: inline-block; 
            padding: 12px 30px; 
            background: #4CAF50; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0; 
          }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔒 Redefinir Senha</h1>
          </div>
          <div class="content">
            ${userName ? `<p>Olá, ${userName}!</p>` : '<p>Olá!</p>'}
            
            <p>Você solicitou a redefinição da sua senha. Para criar uma nova senha, clique no botão abaixo:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Redefinir Senha</a>
            </div>
            
            <p><strong>⏰ Este link expira em 24 horas.</strong></p>
            
            <p>Se você não solicitou esta alteração, pode ignorar este email. Sua senha permanecerá inalterada.</p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="color: #666; font-size: 14px;">
              <strong>Dica de Segurança:</strong> Se o botão não funcionar, copie e cole este link no seu navegador:<br>
              <span style="color: #4CAF50; word-break: break-all;">${resetUrl}</span>
            </p>
          </div>
          <div class="footer">
            <p>Este é um email automático, não responda.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    }

    static emailConfirmation(confirmationUrl: string, userName?: string): string {
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2196F3; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { 
            display: inline-block; 
            padding: 12px 30px; 
            background: #2196F3; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0; 
          }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          .welcome { background: #e3f2fd; padding: 15px; border-radius: 5px; border-left: 4px solid #2196F3; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Bem-vindo!</h1>
          </div>
          <div class="content">
            ${userName ? `<p>Olá, ${userName}!</p>` : '<p>Olá!</p>'}
            
            <div class="welcome">
              <p><strong>Obrigado por se cadastrar!</strong> Estamos felizes em tê-lo conosco.</p>
            </div>
            
            <p>Para completar seu cadastro e ativar sua conta, precisamos confirmar seu endereço de email. Clique no botão abaixo:</p>
            
            <div style="text-align: center;">
              <a href="${confirmationUrl}" class="button">Confirmar Email</a>
            </div>
            
            <p><strong>⏰ Este link expira em 7 dias.</strong></p>
            
            <p>Após a confirmação, você terá acesso completo à plataforma e poderá aproveitar todos os recursos disponíveis.</p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="color: #666; font-size: 14px;">
              Se o botão não funcionar, copie e cole este link no seu navegador:<br>
              <span style="color: #2196F3; word-break: break-all;">${confirmationUrl}</span>
            </p>
          </div>
          <div class="footer">
            <p>Este é um email automático, não responda.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    }
}