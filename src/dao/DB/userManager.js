import { Schema } from "mongoose";
import { ManagerMongoose } from "./ManagerMongoose.js";

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export const userManager = new ManagerMongoose("users", userSchema);
