import { Router } from "express";
import { Cart } from "../classes/Cart.js";
import { FileManager } from "../managers/FileManager.js";

const routerCarts = Router();
const ManagerCart = new FileManager("./src/data/dataCart.json");
const ManagerProduct = new FileManager("./src/data/dataProduct.json");

routerCarts.post("/", async (req, res) => {
  try {
    const newCart = new Cart();
    await ManagerCart.createElement(newCart);
    res.status(201).json(`Cart created successfully with id: ${newCart.id}`);
  } catch (err) {
    res.status(400).json(err);
  }
});

routerCarts.get("/:cid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  if (!isNaN(cid)) {
    let showCartId = await ManagerCart.getByKey("id", cid);
    showCartId.length != 0
      ? res.status(200).json(showCartId)
      : res.status(404).json("This cart id do not exist");
  } else {
    res.status(404).json("This cart id do not exist");
  }
});

routerCarts.post("/:cid/products/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const cartId = parseInt(req.params.cid);
    if (!isNaN(cartId) && !isNaN(productId)) {
      let productToAdd = await ManagerProduct.getById(productId);
      let cartToAdd = await ManagerCart.getById(cartId);
      if (productToAdd && cartToAdd) {
        let productAdded = ManagerCart.addElement(cartId, productId);
        productAdded
          ? res.status(200).json("Product added to cart")
          : res.status(201).json("Updated");
      } else if (!productToAdd) {
        res.status(400).json("This id product do not exist.");
      } else if (!cartToAdd) {
        res.status(400).json("This id cart do not exist.");
      }
    } else {
      res.status(400).json("You entered an invalid id");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

export default routerCarts;
