import { Router } from "express";
import { routerChat } from "./routerChat.js";
import routerResetPass from "./routerResetPass.js";
import { routerRealTime } from "./routerRealTime.js";
import routersViewUsers from "./routerViewsUsers.js";
import { routerForgotPass } from "./routerForgotPass.js";
import { routerCreateProduct } from "./routerCreateProduct.js";

export const webRouter = Router();

webRouter.use("/", routersViewUsers);
webRouter.use("/realtimeproducts", routerRealTime);
webRouter.use("/chat", routerChat);
webRouter.use("/createProduct", routerCreateProduct);
webRouter.use("/forgotPass", routerForgotPass);
webRouter.use("/resetPassword", routerResetPass);
