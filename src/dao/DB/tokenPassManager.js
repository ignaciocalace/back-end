import { Schema } from "mongoose";
import { ManagerMongoose } from "./ManagerMongoose.js";

const tokenPassSchema = new Schema({
  tokenId: { type: String, required: true },
  expireAt: { type: Date, default: Date.now, index: { expires: "1h" } },
});

export const tokenPassManager = new ManagerMongoose(
  "tokenPass",
  tokenPassSchema
);
