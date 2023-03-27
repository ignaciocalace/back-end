import { Product } from "../dao/models/Product.js";
import { productsService } from "../services/products.service.js";
import fetch from "node-fetch";

async function send(url, opt) {
  await fetch(url, opt)
    .then((res) => {
      console.log(res.status);
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

export function ProductsSocket(io, socket) {
  socket.on("newProduct", async (product) => {
    const newProduct = new Product(product);
    await productsService.addProduct(newProduct);
    io.sockets.emit("refreshProducts", await productsService.showProduct());
  });
  socket.on("updateProducts", async () => {
    io.sockets.emit("refreshProducts", await productsService.showProduct());
  });
}
