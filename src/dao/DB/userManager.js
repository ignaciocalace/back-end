import { Schema } from "mongoose";
import { ManagerMongoose } from "./ManagerMongoose.js";

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: false },
  password: { type: String, required: false },
  role: { type: String, required: true },
});

export const userManager = new ManagerMongoose("users", userSchema);
