import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ManagerMongoose } from "./ManagerMongoose.js";

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: String, required: false },
  owner: { type: String, required: true },
});

productSchema.plugin(mongoosePaginate);

export const productManager = new ManagerMongoose("products", productSchema);
