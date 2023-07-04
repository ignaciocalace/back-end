import jwt from "jsonwebtoken";
import { PASSJWT } from "../../config/passwords.js";
import UserDTO from "../../dao/models/userDTO.js";
import { errors } from "../../errors/errors.js";
import { errorHandler } from "../../middlewares/errorsHandler.js";
import { usersService } from "../../services/users.service.js";

export async function loginController(req, res, next) {
  try {
    const user = new UserDTO(req.user);
    const options = { expiresIn: "1d" };
    const token = jwt.sign(user.returnUser(), PASSJWT, options);
    res.cookie("user", token, { signed: true, httpOnly: true });
    await usersService.updateUser("email", user.email, {
      last_connection: new Date(),
    });
    res.redirect("/");
  } catch (err) {
    new errorHandler(errors.INVALID_TOKEN, req, res);
  }
}
