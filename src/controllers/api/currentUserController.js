import passport from "passport";

export async function handleGetCurrentUser(req, res, next) {
  try {
    passport.authenticate("verifyTokenAuth", function (err, userDTO) {
      if (userDTO) {
        return res.status(200).json(userDTO);
      }
      return res.status(400).json("Login first to see the info");
    })(req, res, next);
  } catch (err) {
    res.status(400).json(err);
  }
}
