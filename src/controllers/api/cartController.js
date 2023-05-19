import { Cart } from "../../dao/models/Cart.js";
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
    res.status(400).json(err);
  }
}
export async function handleGetCart(req, res) {
  try {
    const cid = req.params.cid;
    let showCart = await cartsService.showCart(cid);
    showCart = showCart[0];
    res.status(200);
    let isProducts = showCart != undefined;
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
    res.status(404).json("This cart id do not exist");
  }
}

export async function handleGetPurchase(req, res) {
  try {
    const cid = req.params.cid;
    const showCart = await cartsService.showCart(cid);
    const toTicket = showCart[0].products.filter(
      (e) => e.quantity <= e._id.stock
    );
    const toCart = showCart[0].products.filter((e) => e.quantity > e._id.stock);
    const updatedCart = toCart.length !== 0 ? toCart : [];
    await cartsService.updateCart(cid, updatedCart);
    if (toTicket.length !== 0) {
      const newOrder = await ticketsService.newTicket(req.user.email, toTicket);
      res.status(201).json(newOrder);
    } else {
      res.status(404).json("No items on the cart or out of stock");
    }
  } catch (err) {
    res.status(404).json("This cart id does not exist");
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
      productToAdd.length > 0 &&
      cartToAdd.length > 0 &&
      productOnCart.length > 0 &&
      quantity != ""
    ) {
      newProduct = await cartsService.updateProductCart(cid, pid, quantity);
      res.status(201).json("Updated");
    } else if (
      productToAdd.length > 0 &&
      cartToAdd.length > 0 &&
      quantity != ""
    ) {
      newProduct = await cartsService.addToCart(cid, pid, quantity);
      res.status(200).json("Product added to cart");
    } else if (productToAdd.length === 0) {
      res.status(400).json("This id product do not exist.");
    } else if (cartToAdd.length === 0) {
      res.status(400).json("This id cart do not exist.");
    } else if (quantity === "") {
      res.status(400).json("You need to add a quantity");
    } else {
      res.status(400).json("You entered an invalid id.");
    }
  } catch (err) {
    res.status(400).json(err);
  }
}
export async function handlePutCart(req, res) {
  try {
    const cid = req.params.cid;
    const toUpdate = req.body;
    if (toUpdate != {}) {
      let cart = await cartsService.updateCart(cid, toUpdate);
      if (cart.modifiedCount != 0) {
        res.status(200).json("Cart updated");
      } else res.status(400).json("This cart id do not exist");
    } else {
      res.status(400).json("You need a object to update");
    }
  } catch (err) {
    res.status(404).json(err);
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
      res.status(404).json("The cart with this product do not exist");
    }
  } catch (err) {
    res.status(404).json("The cart with this product do not exist");
  }
}
export async function handleDeleteCart(req, res) {
  try {
    const cid = req.params.cid;
    await cartsService.updateCart(cid, []);
    res.status(200).json("Products Deleted");
  } catch (err) {
    res.status(404).json("This cart id do not exist");
  }
}
