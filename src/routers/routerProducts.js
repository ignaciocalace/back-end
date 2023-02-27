import { Router } from "express";
import { FileManager } from "../managers/FileManager.js";
import { Product } from "../classes/Product.js";

const routerProducts = Router();
const ManagerProduct = new FileManager("./src/data/dataProduct.json");

routerProducts.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);
  let products = await ManagerProduct.getByKey();

  if (products.length >= limit) {
    products = products.slice(0, limit);
    res.status(200);
  }
  let isProducts = products.length > 0;

  let productsToShow = products.map((e) => ({
    title: e.title,
    description: e.description,
    code: e.code,
    price: e.price,
    status: e.status,
    category: e.category,
    stock: e.stock,
    thumbnails: e.thumbnails,
  }));

  res.render("home", {
    isProducts,
    productsToShow,
  });
});

routerProducts.get("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  if (!isNaN(pid)) {
    let showProductId = await ManagerProduct.getByKey("id", pid);
    showProductId
      ? res.status(200).json(showProductId)
      : res.status(404).json("This product id do not exist");
  } else {
    res.status(404).json("This product id do not exist");
  }
});

routerProducts.post("/", async (req, res) => {
  try {
    const dataProduct = req.body;
    const newProduct = new Product(dataProduct);
    let elements = await ManagerProduct.getByKey();
    if (elements.find((e) => e.code === newProduct.code) === undefined) {
      await ManagerProduct.createElement(newProduct);
      res.status(201).json("Product added successfully");
    } else {
      res.status(200).json("Code product alredy added");
      throw new Error("Code product alredy added");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

routerProducts.put("/:pid", async (req, res) => {
  try {
    const dataProduct = req.body;
    const pid = parseInt(req.params.pid);
    const updatedProduct = await ManagerProduct.updateElement(
      "id",
      pid,
      dataProduct
    );
    updatedProduct
      ? res.status(201).json("Product updated successfully")
      : res.status(200).json("Id product do not exist");
  } catch (err) {
    res.status(400).json(err);
  }
});

routerProducts.delete("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const deleteElement = await ManagerProduct.deleteElement(pid);
    deleteElement
      ? res.status(200).json("Product deleted successfully")
      : res.status(204).json("Id product do not exist");
  } catch (err) {
    res.status(400).json(err);
  }
});

export default routerProducts;
