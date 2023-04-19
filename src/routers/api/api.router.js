import { Router } from "express";
import authUsers from "./authUsers.js";
import routerCarts from "./routerCarts.js";
import routerProducts from "./routerProducts.js";
import currentUser from "./currentUser.js";

export const apiRouter = Router();

apiRouter.use("/", authUsers);
apiRouter.use("/products", routerProducts);
apiRouter.use("/carts", routerCarts);
apiRouter.use("/sessions/current", currentUser);
