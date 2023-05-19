import { ticketsRepository } from "../repository/tickets.repository.js";

class TicketsService {
  async newTicket(userEmail, toTicket) {
    return await ticketsRepository.newTicket(userEmail, toTicket);
  }
}
export const ticketsService = new TicketsService();
