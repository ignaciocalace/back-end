import { errors } from "../errors/errors.js";
import { winstonLogger } from "./logger.js";

export function errorHandler(error, req = null, res = null, next = null) {
  if (!res) {
    winstonLogger.error(error);
    return;
  }
  switch (error) {
    case errors.NOT_FOUND:
      winstonLogger.error("Resource not found");
      res.status(404).json({
        status: "error",
        description: "Resource not found",
      });
      break;
    case errors.INVALID_ARG:
      winstonLogger.warning("Invalid argument");
      res.status(400).json({
        status: "error",
        description: "Invalid argument",
      });
      break;
    case errors.NOT_LOGGED_IN:
      winstonLogger.warning("Not Logged In");
      res.redirect(302, "/login");
      break;
    case errors.UNAUTHORIZED:
      winstonLogger.warning("Unauthorized access");
      res.status(403).json({
        status: "error",
        description: "Unauthorized access",
      });
      break;
    case errors.DATABASE_ERROR:
      winstonLogger.fatal("Database error");
      res.status(500).json({
        status: "error",
        description: "Database error",
      });
      break;
    case errors.INVALID_TOKEN:
      winstonLogger.warning("Invalid token");
      res.status(401).json({
        status: "error",
        description: "Invalid token",
      });
      break;
    default:
      winstonLogger.fatal("Internal server error");
      res.status(500).json({
        status: "error",
        description: "Internal server error",
      });
      break;
  }
}
