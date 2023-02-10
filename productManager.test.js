import { ProductManager } from "./ProductManager.js";

async function main() {
  const productManager = new ProductManager("./data.json");
  await productManager.addProduct({
    title: "Car",
    description: "V8",
    price: 50000,
    thumbnail: "carv8.jpg",
    code: 45798,
    stock: 3,
  });
  await productManager.addProduct({
    title: "Car2",
    description: "V6",
    price: 40000,
    thumbnail: "carv6.jpg",
    code: 45791,
    stock: 5,
  });
  await productManager.addProduct({
    title: "Car3",
    description: "L4",
    price: 32000,
    thumbnail: "carL4.jpg",
    code: 45795,
    stock: 5,
  });
  await productManager.addProduct({
    title: "Car4",
    description: "L4",
    price: 22000,
    thumbnail: "carx4.jpg",
    code: 45995,
    stock: 5,
  });

  await productManager.addProduct({
    title: "Car5",
    description: "L4",
    price: 22000,
    thumbnail: "carx4.jpg",
    code: 47855,
    stock: 5,
  });
  await productManager.addProduct({
    title: "Car6",
    description: "L4",
    price: 22000,
    thumbnail: "carx4.jpg",
    code: 4554,
    stock: 5,
  });
  await productManager.addProduct({
    title: "Car7",
    description: "L4",
    price: 22000,
    thumbnail: "carx4.jpg",
    code: 45335,
    stock: 5,
  });
  await productManager.addProduct({
    title: "Car4",
    description: "L8",
    price: 22000,
    thumbnail: "carx4.jpg",
    code: 4525,
    stock: 5,
  });
  await productManager.addProduct({
    title: "Car4",
    description: "L9",
    price: 22000,
    thumbnail: "carx4.jpg",
    code: 451115,
    stock: 5,
  });
  await productManager.addProduct({
    title: "Car10",
    description: "L4",
    price: 22000,
    thumbnail: "carx4.jpg",
    code: 4555555,
    stock: 5,
  });

  //   await productManager.updateProduct(0, {
  //     title: "Cambio",
  //     description: "Cambiado",
  //     price: 100000,
  //     thumbnail: "carv8.jpg",
  //     code: 457988,
  //     stock: 3,
  //   });

  //   console.log(await productManager.getProductById(1));
  //   await productManager.deleteProduct(1);
  //   await productManager.getProducts();
}

main();
