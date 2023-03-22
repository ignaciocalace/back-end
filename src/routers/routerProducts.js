import { Router } from "express";
import { Product } from "../dao/models/Product.js";
import { productsService } from "../services/products.service.js";

const routerProducts = Router();

routerProducts.get("/", async (req, res) => {
  let limit = parseInt(req.query.limit);
  isNaN(limit) ? (limit = undefined) : {};
  let products = await productsService.showProduct(undefined, undefined, limit);
  if (products.length >= limit) {
    res.status(200).json(products);
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
  res.render("products", {
    isProducts,
    productsToShow,
  });
});

routerProducts.get("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    let showProductId = await productsService.showProduct("_id", pid);
    showProductId
      ? res.status(200).json(showProductId)
      : res.status(404).json("This product id do not exist");
  } catch (err) {
    res.status(400).json(err);
  }
});

routerProducts.post("/", async (req, res) => {
  try {
    const dataProduct = req.body;
    const newProduct = new Product(dataProduct);
    const elements = await productsService.showProduct("code", newProduct.code);
    if (elements.length === 0) {
      await productsService.addProduct(newProduct);
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
    const pid = req.params.pid;
    const updatedProduct = await productsService.updatedProduct(
      "_id",
      pid,
      dataProduct
    );
    updatedProduct.matchedCount = 1
      ? res.status(201).json("Product updated successfully")
      : res.status(200).json("Id product do not exist");
  } catch (err) {
    res.status(400).json(err);
  }
});

routerProducts.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const deleteElement = await productsService.deleteProduct("_id", pid);
    deleteElement.deletedCount === 1
      ? res.status(200).json("Product deleted successfully")
      : res.status(404).json("Id product do not exist");
  } catch (err) {
    res.status(400).json(err);
  }
});

export default routerProducts;
