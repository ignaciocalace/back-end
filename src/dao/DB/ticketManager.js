import { Schema } from "mongoose";
import { ManagerMongoose } from "./ManagerMongoose.js";

const ticketSchema = new Schema({
  code: { type: Number, required: true },
  purchase_datetime: { type: String, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

export const ticketManager = new ManagerMongoose("tickets", ticketSchema);
