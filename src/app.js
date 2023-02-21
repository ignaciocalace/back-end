import express from "express";
import routerCarts from "./routers/routerCart.js";
import routerProducts from "./routers/routerProducts.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

const port = 8080;
app.listen(port, () => {
  console.log("Conected");
});
