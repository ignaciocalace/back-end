import { Router } from "express";
import { resetPassController } from "../../controllers/web/resetPassController.js";

const routerResetPass = Router();

routerResetPass.get("/:token", resetPassController);

export default routerResetPass;
