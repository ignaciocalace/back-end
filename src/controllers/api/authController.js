import passport from "passport";

export const authenticateLogin = passport.authenticate("login", {
  session: false,
});
export const authenticateRegister = passport.authenticate("register", {
  session: false,
});
export const authenticateWithGithub = passport.authenticate("github", {
  scope: ["user:email"],
});
export const authenticateWithGithub_CB = passport.authenticate("github", {
  failWithError: true,
});
