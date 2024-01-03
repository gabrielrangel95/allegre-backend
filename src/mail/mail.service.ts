import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { ForgotPasswordEmailDto } from './dto';

@Injectable()
export class MailService {
  private readonly resend = new Resend(process.env.RESEND_API_KEY);
  constructor() {}

  async sendForgotEmailPassword(data: ForgotPasswordEmailDto) {
    try {
      await this.resend.emails.send({
        from: 'no-reply@allegre.mapadaprogramacao.com.br',
        to: data.email,
        subject: 'Allegre - Sua solicitação para alterar a senha',
        html: `<p>Seu token para trocar a senha: ${data.forgotPasswordToken}</strong>!</p>`,
      });

      return { success: true };
    } catch (error) {
      return { error };
    }
  }
}
