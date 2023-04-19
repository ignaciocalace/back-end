import { Router } from "express";
import passport from "passport";

const currentUser = Router();

currentUser.get("/", (req, res, next) => {
  try {
    passport.authenticate("verifyTokenAuth", function (err, user) {
      if (user) {
        return res.status(200).json(user);
      }
      return res.status(400).json("Login first to see the info");
    })(req, res, next);
  } catch (error) {
    console.log(error);
  }
});
export default currentUser;
