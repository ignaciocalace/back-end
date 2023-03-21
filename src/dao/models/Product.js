export class Product {
  isEmpty(toCheck) {
    if (toCheck != "" && toCheck != undefined) {
      return true;
    } else {
      throw new Error(`One or more info is empty`);
    }
  }

  // validateTitle(value) {}
  // validateDescription(value) {}
  // validateCode(value) {}
  // validate(value) {}
  // validate(value) {}
  // validate(value) {}
  // validate(value) {}
  // validate(value) {}

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
    // if (
    //   this.isEmpty(title) &&
    //   this.isEmpty(description) &&
    //   this.isEmpty(code) &&
    //   this.isEmpty(price) &&
    //   !isNaN(price) &&
    //   this.isEmpty(stock) &&
    //   !isNaN(stock) &&
    //   this.isEmpty(category)
    // ) {}

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
