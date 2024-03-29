import passport from "passport";
import { errors } from "../errors/errors.js";
import { errorHandler } from "./errorsHandler.js";
import { usersService } from "../services/users.service.js";

const authenticate = (req, res, next, roles) => {
  passport.authenticate("verifyTokenAuth", (err, payload) => {
    if (!payload || !payload.user) {
      return new errorHandler(errors.NOT_LOGGED_IN, req, res);
    }
    const user = payload.user;
    if (roles && !roles.includes(user.role)) {
      return new errorHandler(errors.NOT_LOGGED_IN, req, res);
    }
    req.user = user;
    next();
  })(req, res, next);
};
export const ensureNotAuthenticated = (req, res, next) => {
  passport.authenticate("verifyTokenAuth", (err, payload) => {
    if (payload && payload.user) {
      return res.redirect("/profile");
    }
    next();
  })(req, res, next);
};

export const isAuthenticated = (req, res, next) => {
  authenticate(req, res, next);
};

export const isAdmin = (req, res, next) => {
  authenticate(req, res, next, ["admin"]);
};

export const isUser = (req, res, next) => {
  authenticate(req, res, next, ["user", "premium"]);
};

export async function isLastConnected(req, res, next) {
  const { email } = req.user;
  const updatedFields = {
    last_connection: new Date(),
  };
  await usersService.updateUser("email", email, updatedFields);
  next();
}
