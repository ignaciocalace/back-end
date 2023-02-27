import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import routerCarts from "./routers/routerCart.js";
import routerProducts from "./routers/routerProducts.js";
import { FileManager } from "./managers/FileManager.js";
import { routerRealTime } from "./routers/routerRealTime.js";
import { Product } from "./classes/Product.js";

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

const port = 8080;
const httpServer = app.listen(port, () => {
  console.log("Conected");
});

const io = new Server(httpServer);
const ManagerProduct = new FileManager("./src/data/dataProduct.json");

io.on("connection", (socket) => {
  console.log("New socket conected");

  socket.on("newProduct", async (product) => {
    const newProduct = new Product(product);
    await ManagerProduct.createElement(newProduct);
    io.sockets.emit("refreshProducts", await ManagerProduct.getByKey());
  });

  socket.on("updateProducts", async () => {
    io.sockets.emit("refreshProducts", await ManagerProduct.getByKey());
  });
});
