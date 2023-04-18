import { Router } from "express";
import { routerRealTime } from "./routerRealTime.js";
import { routerChat } from "./routerChat.js";
import routersViewUsers from "./routerViewsUsers.js";

export const webRouter = Router();

webRouter.use("/", routersViewUsers);
webRouter.use("/realtimeproducts", routerRealTime);
webRouter.use("/chat", routerChat);
