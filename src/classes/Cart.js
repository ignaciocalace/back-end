export class Cart {
  id;
  products;
  constructor(products = []) {
    this.id = Date.now();
    this.products = products;
  }
}
