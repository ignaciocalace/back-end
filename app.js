import express from "express";
import { ProductManager } from "./ProductManager.js";

const productManager = new ProductManager("./data.json");

const app = express();

app.get("/products", async (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = await productManager.getProducts();
  if (isNaN(limit)) {
    res.status(200).json(products);
  } else if (products.length >= limit) {
    res.status(200).json(products.slice(0, limit));
  } else {
    res.status(404).json("exceed the limit");
  }
});

app.get("/products/:pid", async (req, res) => {
  const products = await productManager.getProducts();
  const id = parseInt(req.params.pid);
  let showProductId = products.filter((e) => e.id === id);
  showProductId.length === 0
    ? res.status(404).json("This product id do not exist")
    : res.status(200).json(showProductId);
});

const port = 8080;
app.listen(port, () => {
  console.log("Conected");
});
