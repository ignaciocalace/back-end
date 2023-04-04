import { Router } from "express";

export const routerRealTime = Router();

routerRealTime.get("/", (req, res) => {
  req.session.user = { id: "awh" };
  console.log(req.session.id);
  res.render("realtimeproducts", { title: "Real Time Poducts" });
});
