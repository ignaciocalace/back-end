import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { apiRouter } from "./routers/api/api.router.js";
import { webRouter } from "./routers/web/web.router.js";
import { passportInitialize } from "./middlewares/passport.js";
import { COOKIESIGN, PASSJWT } from "./config/passwords.js";
import { logger } from "./middlewares/logger.js";

export const app = express();

app.set("view engine", "handlebars");
app.engine("handlebars", handlebars.engine());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIESIGN));
app.use(
  session({
    secret: PASSJWT,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passportInitialize);
app.use(logger);
app.use(express.static("public"));
app.use("/api-docs", swaggerUi.serve);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Back-end API Documentation",
      description:
        "A simple CRUD API application made with Express and documented with Swagger",
    },
  },
  apis: ["./docs/**/*.yaml"],
};

const specs = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", webRouter);
app.use("/api", apiRouter);
