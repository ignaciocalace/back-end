export class Product {
  id;
  title;
  description;
  code;
  price;
  status;
  stock;
  category;
  thumbnails;

  isEmpty(toCheck) {
    if (toCheck != "") {
      return true;
    } else {
      throw new Error(`One or more info is empty`);
    }
  }

  constructor({
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails,
  }) {
    if (
      this.isEmpty(title) &&
      this.isEmpty(description) &&
      this.isEmpty(code) &&
      this.isEmpty(price) &&
      !isNaN(price) &&
      this.isEmpty(stock) &&
      !isNaN(stock) &&
      this.isEmpty(category)
    ) {
      this.id = Date.now();
      this.title = title;
      this.description = description;
      this.code = code;
      this.price = price;
      this.status = status;
      this.stock = stock;
      this.category = category;
      this.thumbnails = thumbnails;
    }
  }
}
