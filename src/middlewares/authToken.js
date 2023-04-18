import passport from "passport";

export const ensureNotAuthenticated = (req, res, next) => {
  passport.authenticate("verifyTokenAuth", function (err, user) {
    if (user) {
      return res.redirect("/profile");
    }
    next();
  })(req, res, next);
};

export const isAuthenticated = (req, res, next) => {
  passport.authenticate("verifyTokenAuth", function (err, user) {
    if (!user) {
      return res.redirect("/login");
    }
    req.user = user;
    next(null, user);
  })(req, res, next);
};
