import { Router } from "express";
import { usersService } from "../services/users.service.js";

const routerUsers = Router();

routerUsers.post("/users", async (req, res) => {
  const user = req.body;
  const isUser = await usersService.findUser(user.email);
  if (isUser.length > 0)
    return res
      .status(422)
      .json({ status: "error", error: "User already exists" });
  await usersService.addUser(user);
  res.status(200).json({ status: "success", message: "User registred" });
});

routerUsers.post("/sessions", async (req, res) => {
  const { email, password } = req.body;
  const userDB = await usersService.findCredentials(email, password);
  const user = userDB[0];
  if (!user)
    return res
      .status(401)
      .send({ status: "error", error: "Invalid credentials" });
  req.session["user"] = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age,
    role: user.role,
  };
  return res.json({
    status: "success",
    headers: {
      "Content-Type": "application/json",
    },
    payload: req.session["user"],
    message: "First login!",
  });
});

export default routerUsers;
