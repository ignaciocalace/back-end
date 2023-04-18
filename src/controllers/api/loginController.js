import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function loginController(req, res, next) {
  const payload = {
    id: req.user._id,
    name: req.user.first_name + " " + req.user.last_name,
    email: req.user.email,
    age: req.user.age,
    role: req.user.role,
  };
  const options = { expiresIn: "1d" };
  const token = jwt.sign(payload, process.env.PASSJWT, options);
  res.cookie("user", token, { signed: true, httpOnly: true });
  res.redirect("/");
}
