import { Cart } from "../../dao/models/Cart.js";
import { errors } from "../../errors/errors.js";
import { errorHandler } from "../../middlewares/errorsHandler.js";
import { cartsService } from "../../services/carts.service.js";
import { productsService } from "../../services/products.service.js";
import { ticketsService } from "../../services/tickets.service.js";

export async function handlePostCart(req, res) {
  try {
    const createCart = new Cart();
    const newCart = await cartsService.createCart(createCart);
    res
      .status(201)
      .json(`Cart created successfully with id: ${newCart._id.valueOf()}`);
  } catch (err) {
    new errorHandler(errors.NOT_FOUND, req, res);
  }
}

export async function handleGetCart(req, res) {
  try {
    const cid = req.params.cid;
    let showCart = await cartsService.showCart(cid);
    res.status(200);
    let isProducts = showCart.products.length != 0;
    let cartToShow = showCart.products.map((e) => ({
      title: e._id.title,
      description: e._id.description,
      code: e._id.code,
      price: e._id.price,
      status: e._id.status,
      category: e._id.category,
      stock: e._id.stock,
      thumbnails: e._id.thumbnails,
      quantity: e.quantity,
    }));
    res.render("cart", {
      isProducts,
      cartToShow,
      cid,
    });
  } catch (err) {
    new errorHandler(errors.NOT_FOUND, req, res);
  }
}

export async function handleGetPurchase(req, res) {
  try {
    const cid = req.params.cid;
    const showCart = await cartsService.showCart(cid);
    const toTicket = showCart.products.filter((e) => e.quantity <= e._id.stock);
    const toCart = showCart.products.filter((e) => e.quantity > e._id.stock);
    const updatedCart = toCart.length !== 0 ? toCart : [];
    await cartsService.updateCart(cid, updatedCart);
    if (toTicket.length !== 0) {
      const newOrder = await ticketsService.newTicket(req.user.email, toTicket);
      res.status(201);
      res.render("purchase", {
        newOrder: [newOrder._doc],
      });
    } else {
      new errorHandler(errors.NOT_FOUND, req, res);
    }
  } catch (err) {
    new errorHandler(errors.DATABASE_ERROR, req, res);
  }
}

export async function handlePutProdCart(req, res) {
  try {
    const pid = req.params.pid;
    const cid = req.params.cid;
    const quantity = req.body.quantity;
    const productToAdd = await productsService.showProduct("_id", pid);
    const cartToAdd = await cartsService.showCart(cid);
    const productOnCart = await cartsService.showProductsOnCart(cid, pid);
    let newProduct;

    if (
      productToAdd &&
      cartToAdd &&
      productOnCart.length > 0 &&
      quantity != "" &&
      productToAdd.owner != req["user"]["email"]
    ) {
      newProduct = await cartsService.updateProductCart(cid, pid, quantity);
      res
        .status(200)
        .json({ message: "Product updated successfully", product: newProduct });
    } else if (
      productToAdd &&
      cartToAdd &&
      quantity != "" &&
      productToAdd.owner != req["user"]["email"]
    ) {
      newProduct = await cartsService.addToCart(cid, pid, quantity);
      res
        .status(201)
        .json({ message: "Product added to cart", product: newProduct });
    } else if (productToAdd.owner === req["user"]["email"]) {
      new errorHandler(errors.UNAUTHORIZED, req, res);
    } else if (productToAdd) {
      new errorHandler(errors.NOT_FOUND, req, res);
    } else if (cartToAdd) {
      new errorHandler(errors.NOT_FOUND, req, res);
    } else if (quantity === "") {
      new errorHandler(errors.INVALID_ARG, req, res);
    } else {
      new errorHandler(errors.INVALID_ARG, req, res);
    }
  } catch (err) {
    new errorHandler(errors.DATABASE_ERROR, req, res);
  }
}
export async function handlePutCart(req, res) {
  try {
    const cid = req.params.cid;
    const toUpdate = req.body;
    if (toUpdate != {}) {
      let cart = await cartsService.updateCart(cid, toUpdate);
      if (cart.modifiedCount != 0) {
        res.status(200).json("Cart updated successfully");
      } else new errorHandler(errors.NOT_FOUND, req, res);
    } else {
      new errorHandler(errors.INVALID_ARG, req, res);
    }
  } catch (err) {
    new errorHandler(errors.NOT_FOUND, req, res);
  }
}
export async function handleDeleteProdCart(req, res) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    let allProductsCart = await cartsService.showProductsOnCart(cid, pid);
    allProductsCart = allProductsCart[0].products;
    allProductsCart = allProductsCart.filter((elem) => {
      return `${elem._id._id}` !== pid;
    });
    let toUpdate = [];
    for (let i = 0; i < allProductsCart.length; i++) {
      toUpdate.push(allProductsCart[i]._id);
    }
    let cart = await cartsService.updateCart(cid, toUpdate);
    if (cart.modifiedCount != 0) {
      res
        .status(200)
        .json(`Product with id: ${pid} was deleted from cart with id: ${cid}`);
    } else {
      new errorHandler(errors.NOT_FOUND, req, res);
    }
  } catch (err) {
    new errorHandler(errors.DATABASE_ERROR, req, res);
  }
}
export async function handleDeleteCart(req, res) {
  try {
    const cid = req.params.cid;
    await cartsService.updateCart(cid, []);
    res.status(200).json("Products Deleted");
  } catch (err) {
    new errorHandler(errors.NOT_FOUND, req, res);
  }
}
