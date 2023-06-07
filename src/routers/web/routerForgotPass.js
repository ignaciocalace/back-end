import { Router } from "express";

export const routerForgotPass = Router();

routerForgotPass.get("/", (req, res) => {
  res.render("forgotPass");
});
