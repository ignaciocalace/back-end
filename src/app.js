import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import session from "express-session";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import { webRouter } from "./routers/web/web.router.js";
import { apiRouter } from "./routers/api/api.router.js";
import { ProductsSocket } from "./sockets/products.socket.js";
import { MessagesSocket } from "./sockets/messages.socket.js";
import { passportInitialize } from "./middlewares/passport.js";
import { COOKIESIGN, MONGODB_CNX_STR, PASSJWT } from "./config/passwords.js";

const app = express();

await mongoose.connect(MONGODB_CNX_STR);

const port = 8080;
const httpServer = app.listen(port, () => {
  console.log(`Conected to port ${port}`);
});

app.use(passportInitialize);

app.use(
  session({
    secret: PASSJWT,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static("public"));
app.use(express.json());

app.use(cookieParser(COOKIESIGN));
app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));

app.use("/", webRouter);
app.use("/api", apiRouter);

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("New socket conected");
  ProductsSocket(io, socket);
  MessagesSocket(io, socket);
});
