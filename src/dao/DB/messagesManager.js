import { ManagerMongoose } from "./ManagerMongoose.js";

export const messageManager = new ManagerMongoose("messages", {
  user: { type: String, requiered: true },
  message: { type: String, requiered: true },
});
