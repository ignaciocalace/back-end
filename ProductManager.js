const fs = require("fs");

async function main() {
  class ProductManager {
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
            new Products(
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

    // updateProduct({ id, toUpdate}) {
    //   const toUpdate = this.getProductById({ id });
    //   const newProduct = toUpdate;
    //   fs.appendFileSync(this.path, JSON.stringify(newProduct));
    // }

    deleteProduct({ id }) {}

    async getProducts() {
      const readData = fs.readFileSync(this.path, "utf-8");
      return console.log(JSON.parse(readData));
    }

    async getProductById(id) {
      let elements = await fs.promises.readFile(this.path, "utf-8");
      elements = JSON.parse(elements);

      let isId = elements.find((e) => e.id === id);
      if (isId) {
        return isId;
      } else {
        throw new Error("Id not Found");
      }
    }
  }

  class Products {
    id;
    title;
    description;
    price;
    thumbnail;
    code;
    stock;
    constructor(id, title, description, price, thumbnail, code, stock) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
    }
  }

  const productManager = new ProductManager("./data.json");
  productManager.addProduct({
    title: "Car",
    description: "V8",
    price: 50000,
    thumbnail: "carv8.jpg",
    code: 45798,
    stock: 3,
  });
  productManager.addProduct({
    title: "Car2",
    description: "V6",
    price: 40000,
    thumbnail: "carv6.jpg",
    code: 45791,
    stock: 5,
  });
  productManager.addProduct({
    title: "Car3",
    description: "L4",
    price: 32000,
    thumbnail: "carL4.jpg",
    code: 45795,
    stock: 5,
  });
  //   productManager.getProducts();
  //   console.log(productManager.updateProduct(0));
  //   console.log(productManager.getProductById(0));
}

main();
