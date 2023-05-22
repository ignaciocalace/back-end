import { errors } from "../errors/errors.js";

export function errorHandler(error, req, res, next) {
  switch (error) {
    case errors.NOT_FOUND:
      res
        .status(404)
        .json({ status: "error", description: "Resource not found" });
      break;
    case errors.INVALID_ARG:
      res
        .status(400)
        .json({ status: "error", description: "Invalid argument" });
      break;
    case errors.NOT_LOGGED_IN:
      res.redirect(302, "/login");
      break;

    case errors.UNAUTHORIZED:
      res
        .status(403)
        .json({ status: "error", description: "Unauthorized access" });
      break;
    case errors.DATABASE_ERROR:
      res.status(500).json({ status: "error", description: "Database error" });
      break;
    case errors.INVALID_TOKEN:
      res.status(401).json({ status: "error", description: "Invalid token" });
      break;
    default:
      res
        .status(500)
        .json({ status: "error", description: "Internal server error" });
  }
}
