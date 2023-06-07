import { errors } from "../../errors/errors.js";
import { errorHandler } from "../../middlewares/errorsHandler.js";
import { tokenPassService } from "../../services/tokenPass.service.js";
import { usersService } from "../../services/users.service.js";
import { comparePass, hashPass } from "../../utils/crypt.js";
import { decoToken } from "../../utils/tokenGen.js";

export async function handlePutUserRole(req, res) {
  try {
    const uid = req.params.uid;
    const userToUpdate = await usersService.findUserId(uid);

    if (!userToUpdate) {
      throw new Error("INVALID_ARG");
    }

    if (userToUpdate.role === "user") {
      userToUpdate.role = "premium";
    } else if (userToUpdate.role === "premium") {
      userToUpdate.role = "user";
    } else {
      throw new Error("DATABASE_ERROR");
    }

    const updatedUser = await usersService.updateUser("_id", uid, userToUpdate);
    res.status(201).json(updatedUser);
  } catch (err) {
    errorHandler(err.message, req, req.res);
  }
}
export async function handlePutUserPass(req, res) {
  try {
    const userEmail = decoToken(req.body.token);
    const userDB = await usersService.findCredentials(userEmail);
    if (!userDB) {
      return new errorHandler(errors.NOT_FOUND, req, res);
    }
    if (comparePass(req.body.password, userDB.password)) {
      return new errorHandler(errors.INVALID_ARG, req, res);
    } else {
      const updatedUser = await usersService.updateUser("email", userEmail, {
        password: hashPass(req.body.password),
      });
      const removeToken = await tokenPassService.removeToken(req.body.token);
    }
    delete userDB.password;
    delete req.body.password;
    res.status(201).json("Password Changed");
  } catch (err) {
    new errorHandler(errors.INVALID_ARG, req, req.res);
  }
}
