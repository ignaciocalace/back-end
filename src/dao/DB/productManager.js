import { ManagerMongoose } from "./ManagerMongoose.js";

export const productManager = new ManagerMongoose("products", {
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: String, required: false },
});
