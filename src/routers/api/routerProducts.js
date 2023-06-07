import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middlewares/authToken.js";
import {
  handleDeleteProduct,
  handleGetAllProducts,
  handleGetProduct,
  handlePostProduct,
  handlePutProduct,
} from "../../controllers/api/productsController.js";

const routerProducts = Router();

routerProducts.get("/", isAuthenticated, handleGetAllProducts);

routerProducts.get("/:pid", isAuthenticated, handleGetProduct);

routerProducts.post("/", isAuthenticated, handlePostProduct);

routerProducts.put("/:pid", isAdmin, handlePutProduct);

routerProducts.delete("/:pid", isAuthenticated, handleDeleteProduct);

export default routerProducts;
