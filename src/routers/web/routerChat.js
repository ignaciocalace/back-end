import { Router } from "express";
import { isUser } from "../../middlewares/authToken.js";
import { renderChat } from "../../controllers/web/chatController.js";

export const routerChat = Router();

routerChat.get("/", isUser, renderChat);
