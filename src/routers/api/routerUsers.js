import { Router } from "express";
import {
  handleDeleteInactiveUsers,
  handleDeleteUser,
  handleGetAllUsers,
  handlePostFileSaver,
  handlePutUserPass,
  handlePutUserRole,
} from "../../controllers/api/userController.js";
import { extractFile } from "../../utils/fileExtractor.js";
import { isAdmin } from "../../middlewares/authToken.js";

const routerUsers = Router();

routerUsers.get("/", isAdmin, handleGetAllUsers);
routerUsers.put("/premium/:uid", isAdmin, handlePutUserRole);
routerUsers.put("/updatePass", handlePutUserPass);
routerUsers.post(
  "/:uid/documents",
  extractFile(["profile", "product", "docId", "docAdress", "docAccount"]),
  handlePostFileSaver
);
routerUsers.delete("/", isAdmin, handleDeleteInactiveUsers);
routerUsers.delete("/:uid", isAdmin, handleDeleteUser);

export default routerUsers;
