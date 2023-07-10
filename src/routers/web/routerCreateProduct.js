import { Router } from "express";
import { isAuthenticated } from "../../middlewares/authToken.js";
import { renderCreateProduct } from "../../controllers/web/productControllerWeb.js";

export const routerCreateProduct = Router();

routerCreateProduct.get("/", isAuthenticated, renderCreateProduct);
