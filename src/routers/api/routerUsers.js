import { Router } from "express";
import {
  handlePostFileSaver,
  handlePutUserPass,
  handlePutUserRole,
} from "../../controllers/api/userController.js";
import { extractFile } from "../../utils/fileExtractor.js";

const routerUsers = Router();

routerUsers.put("/premium/:uid", handlePutUserRole);
routerUsers.put("/updatePass", handlePutUserPass);
routerUsers.post(
  "/:uid/documents",
  extractFile(["profile", "product", "docId", "docAdress", "docAccount"]),
  handlePostFileSaver
);

export default routerUsers;
