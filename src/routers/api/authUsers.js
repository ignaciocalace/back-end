import { Router } from "express";
import { loginController } from "../../controllers/api/loginController.js";
import {
  authenticateLogin,
  authenticateRegister,
  authenticateWithGithub,
  authenticateWithGithub_CB,
} from "../../controllers/api/authController.js";

const authUsers = Router();

authUsers.post("/register", authenticateRegister, loginController);
authUsers.post("/login", authenticateLogin, loginController);

authUsers.get("/github", authenticateWithGithub);
authUsers.get("/githubcallback", authenticateWithGithub_CB, loginController);

export default authUsers;
