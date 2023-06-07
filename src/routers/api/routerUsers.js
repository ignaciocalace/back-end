import { Router } from "express";
import {
  handlePutUserPass,
  handlePutUserRole,
} from "../../controllers/api/userController.js";

const routerUsers = Router();

routerUsers.put("/premium/:uid", handlePutUserRole);
routerUsers.put("/updatePass", handlePutUserPass);

export default routerUsers;
