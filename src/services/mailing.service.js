import { createTransport } from "nodemailer";
import { EMAIL_CONFIG } from "../config/mailing.js";

class EmailService {
  #nodemailerClient;

  constructor(config) {
    this.#nodemailerClient = createTransport(config);
  }

  async send(recipient, subject, message) {
    const mailOptions = {
      from: "Testing email",
      to: recipient,
      subject: subject,
      html: message,
    };

    const info = await this.#nodemailerClient.sendMail(mailOptions);
    return info;
  }
}

export const emailService = new EmailService(EMAIL_CONFIG);
