import passport from "passport";
import { errors } from "../../errors/errors.js";
import { errorHandler } from "../../middlewares/errorsHandler.js";

export async function handleGetCurrentUser(req, res, next) {
  try {
    passport.authenticate("verifyTokenAuth", function (err, userDTO) {
      if (userDTO) {
        return res.status(200).json(userDTO.user);
      }
      new errorHandler(errors.NOT_LOGGED_IN, req, req.res);
    })(req, res, next);
  } catch (err) {
    new errorHandler(errors.NOT_FOUND, req, req.res);
  }
}
