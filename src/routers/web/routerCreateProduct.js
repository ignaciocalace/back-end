import { Router } from "express";
import { renderCreateProduct } from "../../controllers/web/productControllerWeb.js";
import { isAuthenticated } from "../../middlewares/authToken.js";

export const routerCreateProduct = Router();

routerCreateProduct.get("/", isAuthenticated, renderCreateProduct);
