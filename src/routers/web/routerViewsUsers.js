import { Router } from "express";
import {
  ensureNotAuthenticated,
  isAuthenticated,
  isLastConnected,
} from "../../middlewares/authToken.js";
const routerViewsUsers = Router();

routerViewsUsers.get("/", (req, res) => {
  res.redirect("/login");
});

routerViewsUsers.get("/register", ensureNotAuthenticated, (req, res) => {
  res.render("register");
});

routerViewsUsers.get("/login", ensureNotAuthenticated, (req, res) => {
  res.render("login");
});

routerViewsUsers.get("/profile", isAuthenticated, (req, res) => {
  res.render("profile", { user: req["user"] });
});

routerViewsUsers.get(
  "/logout",
  isAuthenticated,
  isLastConnected,
  (req, res) => {
    return res.clearCookie("user").redirect("/");
  }
);

export default routerViewsUsers;
