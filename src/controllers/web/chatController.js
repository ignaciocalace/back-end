import { errors } from "../../errors/errors.js";
import { errorHandler } from "../../middlewares/errorsHandler.js";

export async function renderChat(req, res) {
  try {
    res.render("chat", { title: "Chat" });
  } catch (error) {
    new errorHandler(errors.INVALID_ARG, req, req.res);
  }
}
