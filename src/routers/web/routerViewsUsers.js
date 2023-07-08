import { Router } from "express";
import {
  ensureNotAuthenticated,
  isAdmin,
  isAuthenticated,
  isLastConnected,
} from "../../middlewares/authToken.js";
import { usersService } from "../../services/users.service.js";
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
  res.render("profile", {
    user: req["user"],
    isAdmin: req["user"].role === "admin",
    isPremium: req["user"].role === "premium" || req["user"].role === "admin",
  });
});
routerViewsUsers.get("/admin", isAdmin, async (req, res) => {
  const userList = await usersService.findAllUsers();
  res.render("admin", { userList });
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
