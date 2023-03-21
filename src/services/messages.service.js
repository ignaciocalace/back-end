import { messageManager } from "../dao/DB/messagesManager.js";

class MessagesService {
  constructor(user, msg) {
    this.toSend = [{ user: user, message: msg }];
  }

  async add(toSend) {
    return await messageManager.save(toSend);
  }

  async getAll() {
    return await messageManager.get(undefined, undefined, undefined, 1);
  }
}

export const messagesManager = new MessagesService();
