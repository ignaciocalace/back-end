import mongoose from "mongoose";

import { MONGODB_CNX_STR } from "../../config/mongodb.js";
import { Cart } from "../../dao/models/Cart.js";
import { Product } from "../../dao/models/Product.js";
import { cartsService } from "../../services/carts.service.js";
import { productsService } from "../../services/products.service.js";

await mongoose.connect(MONGODB_CNX_STR);
const createCart = new Cart();
const newCart = await cartsService.createCart(createCart);
const productId = "64149ee67c3920cd2a6d2415";
const cartId = "6414d46633f84bd1cbf5bcb0";
// let productToAdd = await productsService.show("_id", productId);
// let addToCart = await cartsService.addToCart(cartId, productId);
// console.log(addToCart);
// const newProduct = new Product({
//   title: "Car1",
//   description: "V8",
//   code: 177779,
//   price: 8980000,
//   status: false,
//   category: "cars",
//   stock: 3,
//   thumbnails: "carv8.jpg",
// });
// const productRegistred = await productsService.add(newProduct);
// console.log(productRegistred);

// const pid = "64149e36c30b05fceba3f4b0";
// let showProductId = await productsService.show("_id", pid);
// const dataProduct = {
//   title: "Mustang",
//   description: "L4",
//   code: 55555,
//   price: 18000,
//   status: true,
//   category: "Comun",
//   stock: 1,
//   thumbnails: "carL4.jpg",
// };
// const updatedProduct = await productsService.update("_id", pid, dataProduct);
// console.log(showProductId);

// let showAll = await productsService.show();

console.log(showProductId);
mongoose.connection.close();
