import crypto from "crypto";
import { ticketManager } from "../dao/DB/ticketManager.js";

class TicketsRepository {
  constructor(ticketsDao) {
    this.ticketsDao = ticketsDao;
  }
  async newTicket(userEmail, toTicket) {
    const randomNumber = crypto.randomInt(1000, 9999);
    const codeNumber = Number(`${Date.now()}${randomNumber}`);
    const totalPrice = toTicket.reduce(
      (accum, prod) => prod._id.price * prod.quantity + accum,
      0
    );
    const newTicket = {
      code: codeNumber,
      purchase_datetime: new Date().toLocaleDateString(),
      amount: totalPrice,
      purchaser: userEmail,
    };
    return await this.ticketsDao.save(newTicket);
  }
}
export const ticketsRepository = new TicketsRepository(ticketManager);
