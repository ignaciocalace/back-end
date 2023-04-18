import { Router } from "express";

export const routerChat = Router();

routerChat.get("/", (req, res) => {
  res.render("chat", { title: "Chat" });
});
