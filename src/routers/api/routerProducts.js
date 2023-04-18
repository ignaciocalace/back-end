import { Router } from "express";
import { Product } from "../../dao/models/Product.js";
import { cartsService } from "../../services/carts.service.js";
import { productsService } from "../../services/products.service.js";
import { isAuthenticated } from "../../middlewares/authToken.js";
const routerProducts = Router();

routerProducts.get("/", isAuthenticated, async (req, res) => {
  try {
    let query = req.query.query;
    let limit = req.query.limit;
    let page = req.query.page;
    let sort = req.query.sort;
    sort === "undefined" ? (sort = undefined) : "";
    query === "undefined" ? (query = undefined) : "";
    limit === "undefined" ? (limit = 10) : "";

    let sortFiltered;
    if (sortFiltered === "desc") {
      sortFiltered = -1;
    } else if (sortFiltered === "asc") {
      sortFiltered = 1;
    }

    let productsPaginate = await productsService.showPaginate(
      query,
      page,
      limit,
      sortFiltered
    );
    productsPaginate.prevLink = productsPaginate.hasPrevPage
      ? `http://localhost:8080/api/products?page=${productsPaginate.prevPage}&limit=${limit}&query=${query}&sort=${sort}`
      : "";
    productsPaginate.nextLink = productsPaginate.hasNextPage
      ? `http://localhost:8080/api/products?page=${productsPaginate.nextPage}&limit=${limit}&query=${query}&sort=${sort}`
      : "";
    let isValid = !(page <= 0 || page > productsPaginate.totalPages);
    if (productsPaginate.docs.length > 0) {
      res.status(200);
    } else {
      res.status(404);
    }
    let idCart = await cartsService.getFirstCart();
    idCart = idCart._id;
    const isProducts = productsPaginate.docs.length > 0;
    let productsToShow = productsPaginate.docs.map((e) => ({
      _id: e._id,
      title: e.title,
      description: e.description,
      code: e.code,
      price: e.price,
      status: e.status,
      category: e.category,
      stock: e.stock,
      thumbnails: e.thumbnails,
      idCart: idCart,
    }));
    const userData = req["user"];
    res.render("products", {
      isProducts,
      productsToShow,
      productsPaginate,
      isValid,
      userData,
    });
  } catch (err) {
    res.status(400).json(err);
  }
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
    await productsService.addProduct(newProduct);
    if (productsService) {
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
