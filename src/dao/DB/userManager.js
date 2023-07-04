import { Schema } from "mongoose";
import { ManagerMongoose } from "./ManagerMongoose.js";

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: false },
  password: { type: String, required: false },
  cart: { type: String, required: true },
  role: { type: String, required: true },
  documents: [
    {
      name: { type: String, required: false },
      reference: { type: String, required: false },
    },
  ],
  last_connection: { type: Date, default: Date.now },
});

export const userManager = new ManagerMongoose("users", userSchema);
