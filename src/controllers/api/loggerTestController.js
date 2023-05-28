import { winstonLogger } from "../../middlewares/logger.js";

export async function loggerTest(req, res, next) {
  winstonLogger.debug("Test Debug");
  winstonLogger.http("Test http");
  winstonLogger.info("Test info");
  winstonLogger.warning("Test warning");
  winstonLogger.error("Test error");
  winstonLogger.fatal("Test fatal");
  next();
}
