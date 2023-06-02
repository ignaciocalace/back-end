import { createTransport } from "nodemailer";
import { EMAIL_CONFIG } from "../config/mailing.js";
import { errors } from "../errors/errors.js";

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
      text: message,
    };

    try {
      const info = await this.#nodemailerClient.sendMail(mailOptions);
      return info;
    } catch (err) {
      new errorHandler(errors.INVALID_ARG, req, req.res);
    }
  }
}

export const emailService = new EmailService(EMAIL_CONFIG);
