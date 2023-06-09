import { Router } from "express";
import {
  handleDeleteCart,
  handleDeleteProdCart,
  handleGetCart,
  handleGetPurchase,
  handlePostCart,
  handlePutCart,
  handlePutProdCart,
} from "../../controllers/api/cartController.js";
import { isUser } from "../../middlewares/authToken.js";

const routerCarts = Router();

routerCarts.post("/", handlePostCart);

routerCarts.get("/:cid", handleGetCart);

routerCarts.put("/:cid", handlePutCart);

routerCarts.delete("/:cid", handleDeleteCart);

routerCarts.get("/:cid/purchase", isUser, handleGetPurchase);

routerCarts.put("/:cid/products/:pid", isUser, handlePutProdCart);

routerCarts.delete("/:cid/products/:pid", handleDeleteProdCart);

export default routerCarts;
