import { Router } from "express";
import routerUsers from "./routerUsers.js";
import routerCarts from "./routerCarts.js";
import authUsers from "./routerAuthUsers.js";
import routerProducts from "./routerProducts.js";
import currentUser from "./routerCurrentUser.js";
import routerRecoverPass from "./routerRecoverPass.js";
import sendMail from "../../controllers/api/mailingController.js";
import generateProductMock from "../../controllers/api/mockupController.js";
import { loggerTest } from "../../controllers/api/loggerTestController.js";

export const apiRouter = Router();

apiRouter.use("/", authUsers);
apiRouter.use("/products", routerProducts);
apiRouter.use("/carts", routerCarts);
apiRouter.use("/sessions/current", currentUser);
apiRouter.use("/mockingproducts", generateProductMock);
apiRouter.use("/loggerTest", loggerTest);
apiRouter.use("/mail", sendMail);
apiRouter.use("/users", routerUsers);
apiRouter.use("/recoverPass", routerRecoverPass);
