import passport from "passport";

const authenticate = (req, res, next, role) => {
  passport.authenticate("verifyTokenAuth", (err, user) => {
    if (!user) {
      return res.status(401).redirect("/login");
    }
    if (role && user.role !== role) {
      return res.status(401).redirect("/profile");
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const ensureNotAuthenticated = (req, res, next) => {
  passport.authenticate("verifyTokenAuth", (err, user) => {
    if (user) {
      return res.redirect("/profile");
    }
    next();
  })(req, res, next);
};

export const isAuthenticated = (req, res, next) => {
  authenticate(req, res, next);
};

export const isAdmin = (req, res, next) => {
  authenticate(req, res, next, "admin");
};

export const isUser = (req, res, next) => {
  authenticate(req, res, next, "user");
};
