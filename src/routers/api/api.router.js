import { Router } from "express";
import authUsers from "./authUsers.js";
import routerCarts from "./routerCarts.js";
import routerProducts from "./routerProducts.js";
import currentUser from "./currentUser.js";
import generateProductMock from "../../controllers/api/mockupController.js";
import { loggerTest } from "../../controllers/api/loggerTestController.js";

export const apiRouter = Router();

apiRouter.use("/", authUsers);
apiRouter.use("/products", routerProducts);
apiRouter.use("/carts", routerCarts);
apiRouter.use("/sessions/current", currentUser);
apiRouter.use("/mockingproducts", generateProductMock);
apiRouter.use("/loggerTest", loggerTest);
