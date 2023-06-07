import { Router } from "express";
import { routerRealTime } from "./routerRealTime.js";
import { routerChat } from "./routerChat.js";
import routersViewUsers from "./routerViewsUsers.js";
import { routerCreateProduct } from "./routerCreateProduct.js";
import { routerForgotPass } from "./routerForgotPass.js";
import routerRecoverPass from "../api/routerRecoverPass.js";
import routerResetPass from "./routerResetPass.js";

export const webRouter = Router();

webRouter.use("/", routersViewUsers);
webRouter.use("/realtimeproducts", routerRealTime);
webRouter.use("/chat", routerChat);
webRouter.use("/createProduct", routerCreateProduct);
webRouter.use("/forgotPass", routerForgotPass);
webRouter.use("/resetPassword", routerResetPass);
