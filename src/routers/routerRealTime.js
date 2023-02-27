import { Router } from "express";

export const routerRealTime = Router();

routerRealTime.get("/", (req, res) => {
  res.render("realtimeproducts", { title: "Real Time Poducts" });
});
