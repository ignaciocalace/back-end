import { Router } from "express";
import { Cart } from "../dao/models/Cart.js";
import { cartsService } from "../services/carts.service.js";
import { productsService } from "../services/products.service.js";

const routerCarts = Router();

routerCarts.post("/", async (req, res) => {
  try {
    const createCart = new Cart();
    const newCart = await cartsService.createCart(createCart);
    res
      .status(201)
      .json(`Cart created successfully with id: ${newCart._id.valueOf()}`);
  } catch (err) {
    res.status(400).json(err);
  }
});

routerCarts.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    let showCartId = await cartsService.showCart(cid);
    // showCartId.length > 0
    //   ? (showCartId = showCartId.populate("products._id"))
    //   : {};
    res.status(200).json(showCartId);
  } catch (err) {
    res.status(404).json("This cart id do not exist");
  }
});

routerCarts.put("/:cid/products/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const cid = req.params.cid;
    const productToAdd = await productsService.showProduct("_id", pid);
    const cartToAdd = await cartsService.showCart(cid);
    const productOnCart = await cartsService.showProductsOnCart(cid, pid);
    let newProduct;
    if (
      productToAdd.length > 0 &&
      cartToAdd.length > 0 &&
      productOnCart.length > 0
    ) {
      newProduct = cartsService.updateCart(cid, pid);
      res.status(201).json("Updated");
    } else if (productToAdd.length > 0 && cartToAdd.length > 0) {
      newProduct = await cartsService.addToCart(cid, pid);
      res.status(200).json("Product added to cart");
    } else if (productToAdd.length === 0) {
      res.status(400).json("This id product do not exist.");
    } else if (cartToAdd.length === 0) {
      res.status(400).json("This id cart do not exist.");
    } else {
      res.status(400).json("You entered an invalid id.");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// routerCarts.delete("/:cid/products/:pid", async (req, res) => {});

export default routerCarts;
