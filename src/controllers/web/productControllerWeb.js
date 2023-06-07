import { errors } from "../../errors/errors.js";
import { errorHandler } from "../../middlewares/errorsHandler.js";

export async function renderCreateProduct(req, res) {
  try {
    res.render("createProduct");
  } catch (error) {
    new errorHandler(errors.INVALID_ARG, req, req.res);
  }
}
