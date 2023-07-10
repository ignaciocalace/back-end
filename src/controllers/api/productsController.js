import { errors } from "../../errors/errors.js";
import { Product } from "../../dao/models/Product.js";
import { errorHandler } from "../../middlewares/errorsHandler.js";
import { emailService } from "../../services/mailing.service.js";
import { productsService } from "../../services/products.service.js";

export async function handleGetAllProducts(req, res) {
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
    }
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
    }));
    const userData = req["user"];
    const isAdmin = req["user"]["role"] === "admin";
    res.render("products", {
      isProducts,
      productsToShow,
      productsPaginate,
      isValid,
      userData,
      isAdmin,
    });
  } catch (err) {
    new errorHandler(errors.default, req, req.res);
  }
}
export async function handleGetProduct(req, res) {
  try {
    const pid = req.params.pid;
    let showProductId = await productsService.showProduct("_id", pid);
    showProductId
      ? res.status(200).json(showProductId)
      : new errorHandler(errors.NOT_FOUND, req, req.res);
  } catch (err) {
    new errorHandler(errors.INVALID_ARG, req, req.res);
  }
}
export async function handlePostProduct(req, res) {
  try {
    if (req["user"]["role"] === "premium" || req["user"]["role"] === "admin") {
      req.body["owner"] =
        req["user"]["role"] === "premium" ? req["user"]["email"] : "admin";
      const dataProduct = req.body;
      const newProduct = new Product(dataProduct);
      const newProductAdded = await productsService.addProduct(newProduct);
      if (newProductAdded) {
        res.status(201).json({
          message: "Product added successfully",
          product: newProductAdded,
        });
      } else {
        res.status(200).json("Product already added");
      }
    } else {
      new errorHandler(errors.UNAUTHORIZED, req, req.res);
    }
  } catch (err) {
    new errorHandler(errors.INVALID_ARG, req, req.res);
  }
}
export async function handlePutProduct(req, res) {
  try {
    const dataProduct = req.body;
    const pid = req.params.pid;
    const updatedProduct = await productsService.updatedProduct(
      "_id",
      pid,
      dataProduct
    );
    updatedProduct.matchedCount === 1
      ? res.status(201).json("Product updated successfully")
      : new errorHandler(errors.NOT_FOUND, req, req.res);
  } catch (err) {
    new errorHandler(errors.INVALID_ARG, req, req.res);
  }
}
export async function handleDeleteProduct(req, res) {
  try {
    const pid = req.params.pid;
    const userRole = req.user.role;
    const userEmail = req.user.email;

    let productToDelete = await productsService.showProduct("_id", pid);

    if (
      userRole === "admin" ||
      (userRole === "premium" && productToDelete.owner === userEmail)
    ) {
      const deleteResult = await productsService.deleteProduct("_id", pid);
      if (deleteResult.deletedCount === 1) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(productToDelete.owner)) {
          await emailService.send(
            productToDelete.owner,
            "Product Deleted",
            "<h2>Your product has been deleted.</h2>"
          );
        }
        return res.status(200).json("Product deleted successfully");
      }
    }
    throw new errorHandler(errors.NOT_FOUND);
  } catch (err) {
    new errorHandler(errors.DATABASE_ERROR, req, res);
  }
}
