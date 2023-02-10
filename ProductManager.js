import fs from "fs";
import { Product } from "./Product.js";

export class ProductManager {
  constructor(path) {
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  isEmpty(toCheck) {
    if (toCheck != "") {
      return true;
    } else {
      throw new Error(`One or more info is empty`);
    }
  }

  async addProduct({ title, description, price, thumbnail, code, stock }) {
    if (
      this.isEmpty(title) &&
      this.isEmpty(description) &&
      this.isEmpty(price) &&
      !isNaN(price) &&
      this.isEmpty(thumbnail) &&
      this.isEmpty(code) &&
      this.isEmpty(stock) &&
      !isNaN(stock)
    ) {
      let elements = await fs.promises.readFile(this.path, "utf-8");
      elements = JSON.parse(elements);

      if (elements.find((e) => e.code === code) === undefined) {
        elements.push(
          new Product(
            +elements.length,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
          )
        );
        await fs.promises.writeFile(this.path, JSON.stringify(elements));
      } else {
        console.log("Code repeated");
      }
    } else {
      console.log("One or more elementes are empty");
    }
  }

  async updateProduct(id, toUpdate) {
    let allProducts = await fs.promises.readFile(this.path, "utf-8");
    allProducts = JSON.parse(allProducts);
    let newProduct = allProducts.find((e) => e.id === id);
    for (const key in toUpdate) {
      newProduct[key] = toUpdate[key];
    }
    allProducts = allProducts.filter((e) => e.id !== id);
    newProduct = [...allProducts, newProduct];
    await fs.promises.writeFile(this.path, JSON.stringify(newProduct));
  }

  async deleteProduct(id) {
    let allProducts = await fs.promises.readFile(this.path, "utf-8");
    allProducts = JSON.parse(allProducts);
    let deletedProduct = allProducts.filter((e) => e.id !== id);
    await fs.promises.writeFile(this.path, JSON.stringify(deletedProduct));
  }

  async getProducts() {
    const readData = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(readData);
  }

  async getProductById(id) {
    let elements = await fs.promises.readFile(this.path, "utf-8");
    elements = JSON.parse(elements);
    let isId = elements.find((e) => e.id === id);
    if (isId) {
      console.log("Your product is:", isId);
      return isId;
    } else {
      throw new Error("Id not Found");
    }
  }
}
