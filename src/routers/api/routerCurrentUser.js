import { Router } from "express";
import { handleGetCurrentUser } from "../../controllers/api/currentUserController.js";

const currentUser = Router();

currentUser.get("/", handleGetCurrentUser);
export default currentUser;
