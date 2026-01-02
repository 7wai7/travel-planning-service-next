import { env } from "@/app/config/env";
import nodemailer from "nodemailer";
import path from "path";
import pug from "pug";

interface SendEmailParams {
  smtpTo: string;
  smtpFrom: string;
  subject: string;
  template: string;
  context?: Record<string, unknown>;
}

export const MailService = {
  sendEmail: async (params: SendEmailParams) => {
    try {
      const transporter = nodemailer.createTransport({
        host: env.MAIL_HOST,
        port: Number(env.MAIL_PORT),
        secure: false, // true for 465
        auth: {
          user: env.MAIL_USER,
          pass: env.MAIL_PASSWORD,
        },
      });

      const templatePath = path.resolve(params.template);
      const html = pug.renderFile(templatePath, { ...params.context });

      const info = await transporter.sendMail({
        from: params.smtpFrom,
        to: params.smtpTo,
        subject: params.subject,
        html,
      });

      console.log(
        `Email sent successfully to ${params.smtpTo}`,
        info.messageId
      );

      return info;
    } catch (error: unknown) {
      console.error(
        `Error while sending mail to ${params.smtpTo}`,
        error instanceof Error ? error.message : "Unknown error"
      );
      throw new Error("Sending error");
    }
  },
};
