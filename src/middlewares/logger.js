import winston from "winston";
import { NODE_ENV } from "../config/passwords.js";

const levels = {
  debug: 5,
  http: 4,
  info: 3,
  warning: 2,
  error: 1,
  fatal: 0,
};

let transports = [];

if (NODE_ENV === "production") {
  transports = [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      level: "error",
      filename: "errors.log",
    }),
  ];
} else {
  transports = [
    new winston.transports.Console({
      level: "debug",
    }),
  ];
}
export const winstonLogger = winston.createLogger({
  levels,
  transports,
});

export const logger = (req, res, next) => {
  winstonLogger.info(
    `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  req.logger = winstonLogger;
  next();
};
