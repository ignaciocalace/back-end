import { Router } from "express";
import { recoverPassController } from "../../controllers/api/recoverPassController.js";

const routerRecoverPass = Router();

routerRecoverPass.post("/", recoverPassController);

export default routerRecoverPass;
