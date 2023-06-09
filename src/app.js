// import express from "express";
// import mongoose from "mongoose";
// import { Server } from "socket.io";
// import session from "express-session";
// import cookieParser from "cookie-parser";
// import handlebars from "express-handlebars";
// import { webRouter } from "./routers/web/web.router.js";
// import { apiRouter } from "./routers/api/api.router.js";
// import { ProductsSocket } from "./sockets/products.socket.js";
// import { MessagesSocket } from "./sockets/messages.socket.js";
// import { passportInitialize } from "./middlewares/passport.js";
// import { COOKIESIGN, MONGODB_CNX_STR, PASSJWT } from "./config/passwords.js";
// import { logger, winstonLogger } from "./middlewares/logger.js";
// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";

// const app = express();

// await mongoose.connect(MONGODB_CNX_STR);

// const port = 8080;
// const httpServer = app.listen(port, () => {
//   winstonLogger.info(`Conected to port ${port}`);
// });

// app.use(passportInitialize);
// app.use(logger);
// app.use(
//   session({
//     secret: PASSJWT,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(express.static("public"));
// app.use(express.json());

// app.use(cookieParser(COOKIESIGN));
// app.engine("handlebars", handlebars.engine());
// app.set("views", "./views");
// app.set("view engine", "handlebars");
// app.use(express.urlencoded({ extended: true }));

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Back-end API Documentation",
//       description:
//         "A simple CRUD API application made with Express and documented with Swagger",
//     },
//   },
//   apis: ["./docs/**/*.yaml"],
// };
// const specs = swaggerJSDoc(options);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// app.use("/", webRouter);
// app.use("/api", apiRouter);

// const io = new Server(httpServer);

// io.on("connection", (socket) => {
//   console.log("New socket conected");
//   ProductsSocket(io, socket);
//   MessagesSocket(io, socket);
// });

import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Server } from "socket.io";

import { webRouter } from "./routers/web/web.router.js";
import { apiRouter } from "./routers/api/api.router.js";
import { ProductsSocket } from "./sockets/products.socket.js";
import { MessagesSocket } from "./sockets/messages.socket.js";
import { passportInitialize } from "./middlewares/passport.js";
import { COOKIESIGN, MONGODB_CNX_STR, PASSJWT } from "./config/passwords.js";
import { logger, winstonLogger } from "./middlewares/logger.js";

const app = express();

async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_CNX_STR);
    winstonLogger.info("Connected to MongoDB");
  } catch (error) {
    winstonLogger.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

connectToMongoDB();

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

const server = app.listen(8080, () => {
  winstonLogger.info("Server is running on port 8080");
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("New socket connected");
  ProductsSocket(io, socket);
  MessagesSocket(io, socket);
});
