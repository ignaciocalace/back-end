import { faker } from "@faker-js/faker";
import { Product } from "../dao/models/Product.js";

export function generateProduct() {
  const product = new Product({
    title: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    code: faker.number.int({ min: 10000 }),
    price: parseFloat(faker.commerce.price()),
    stock: faker.number.int({ max: 100 }),
    category: faker.commerce.department(),
    thumbnails: faker.image.url(),
  });

  return product;
}
