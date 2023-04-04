import { Product } from "../dao/models/Product.js";
import { productsService } from "../services/products.service.js";

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
