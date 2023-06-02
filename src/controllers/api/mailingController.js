import { errors } from "../../errors/errors.js";
import { emailService } from "../../services/mailing.service.js";

export default async function sendMail(req, res) {
  try {
    let recipient = req.body.recipient || "ignacio.calace@gmail.com";
    let subject = req.body.subject || "Testing";
    let message = req.body.message || "lorem ipsum";

    await emailService.send(recipient, subject, message);
    return res.status(200).json("Email sent");
  } catch (err) {
    new errorHandler(errors.INVALID_ARG, req, req.res);
  }
}
