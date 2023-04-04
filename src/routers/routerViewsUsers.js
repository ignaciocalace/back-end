import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  req.session.user != undefined
    ? res.redirect("/profile")
    : res.redirect("/login");
});

router.get("/register", (req, res) => {
  req.session.user === undefined
    ? res.render("register")
    : res.redirect("/profile");
});

router.get("/login", (req, res) => {
  req.session.user != undefined
    ? res.redirect("/api/products")
    : res.render("login");
});

router.get("/profile", (req, res) => {
  res.render("profile", { user: req.session["user"] });
});

// router.post("/login", (req, res) => {
//   res.redirect("/");
// });

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res
        .status(500)
        .send({ status: "error", error: "Couldn't logout" });
    res.redirect("/");
  });
});

export default router;
