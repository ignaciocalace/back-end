import { Schema } from "mongoose";
import { ManagerMongoose } from "./ManagerMongoose.js";

const cartSchema = new Schema({
  products: {
    type: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, required: true },
      },
    ],
    default: [],
  },
});
cartSchema.pre(/^find/, function (next) {
  this.populate("products._id");
  next();
});
export const cartManager = new ManagerMongoose("carts", cartSchema);
