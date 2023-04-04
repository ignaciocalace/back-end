import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import routerUsers from "./routers/routerUsers.js";
import routerCarts from "./routers/routerCarts.js";
import { routerChat } from "./routers/routerChat.js";
import { MONGODB_CNX_STR } from "./config/mongodb.js";
import routerProducts from "./routers/routerProducts.js";
import { routerRealTime } from "./routers/routerRealTime.js";
import { ProductsSocket } from "./sockets/products.socket.js";
import { MessagesSocket } from "./sockets/messages.socket.js";
import routersViewUsers from "./routers/routerViewsUsers.js";

const app = express();

await mongoose.connect(MONGODB_CNX_STR);

const port = 8080;
const httpServer = app.listen(port, () => {
  console.log(`Conected to port ${port}`);
});

app.use(
  session({
    store: new MongoStore({ mongoUrl: MONGODB_CNX_STR, ttl: 3600 }),
    secret: "theCatisUnderTheTable",
    resave: false,
    saveUninitialized: true,
  })
);

// app.use(cookieParser);

app.use(express.static("public"));
app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));

app.use("/", routersViewUsers);
app.use("/api", routerUsers);
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/realtimeproducts", routerRealTime);
app.use("/chat", routerChat);

app.get("/", async (req, res) => {
  res.render("home", {});
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("New socket conected");
  ProductsSocket(io, socket);
  MessagesSocket(io, socket);
});
