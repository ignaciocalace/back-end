import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import routerCarts from "./routers/routerCarts.js";
import { MONGODB_CNX_STR } from "./config/mongodb.js";
import routerProducts from "./routers/routerProducts.js";
import { FileManager } from "./dao/FileSystem/FileManager.js";
import { routerRealTime } from "./routers/routerRealTime.js";
import { ProductsSocket } from "./sockets/products.socket.js";
import { MessagesSocket } from "./sockets/messages.socket.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/realtimeproducts", routerRealTime);

app.get("/", async (req, res) => {
  res.render("home", {});
});
app.get("/chat", (req, res) => {
  res.render("chat", { title: "Chat" });
});

const port = 8080;

await mongoose.connect(MONGODB_CNX_STR);
const db = mongoose.connection;

const httpServer = app.listen(port, () => {
  console.log(`Conected to port ${port}`);
});

const io = new Server(httpServer);
const ManagerProduct = new FileManager("./src/data/dataProduct.json");

io.on("connection", (socket) => {
  console.log("New socket conected");
  ProductsSocket(io, socket);
  MessagesSocket(io, socket);
});
