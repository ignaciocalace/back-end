import jwt from "jsonwebtoken";
import { PASSJWT } from "../../config/passwords.js";
import UserDTO from "../../dao/models/userDTO.js";
import { errors } from "../../errors/errors.js";
import { errorHandler } from "../../middlewares/errorsHandler.js";

export function loginController(req, res, next) {
  try {
    const user = new UserDTO(req.user);
    const options = { expiresIn: "1d" };
    const token = jwt.sign(user.returnUser(), PASSJWT, options);
    res.cookie("user", token, { signed: true, httpOnly: true });
    res.redirect("/");
  } catch (err) {
    new errorHandler(errors.INVALID_TOKEN, req, req.res);
  }
}
