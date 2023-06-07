function isEmpty(toCheck, nameVar) {
  if (toCheck != "" && toCheck != undefined) {
    return true;
  } else {
    throw new Error(`${nameVar} is empty or undefined`);
  }
}

function isTypeOf(value, typeValue) {
  if (typeof value !== typeValue)
    throw new Error(`The value is not a ${typeValue}`);
}
function isInt(value, nameVar) {
  if (!Number.isInteger(value)) throw new Error(`${nameVar} must be integer`);
}

function biggerThan(number, value, nameVar) {
  if (value < number)
    throw new Error(`${nameVar} must be bigger than ${number}`);
}

function validateTitle(value) {
  const nameVar = "title";
  isEmpty(value, nameVar);
  isTypeOf(value, "string");
  return value;
}
function validateDescription(value) {
  const nameVar = "description";
  isEmpty(value, nameVar);
  isTypeOf(value, "string");
  return value;
}
function validateCode(value) {
  const nameVar = "code";
  value = Number(value);
  isEmpty(value, nameVar);
  isTypeOf(value, "number");
  isInt(value, nameVar);
  biggerThan(0, value, nameVar);
  return value;
}
function validatePrice(value) {
  const nameVar = "price";
  value = Number(value);
  isEmpty(value, nameVar);
  isTypeOf(value, "number");
  isInt(value, nameVar);
  biggerThan(0, value, nameVar);
  return value;
}
function validateStock(value) {
  const nameVar = "stock";
  value = Number(value);
  isEmpty(value, nameVar);
  isTypeOf(value, "number");
  isInt(value, nameVar);
  biggerThan(-1, value, nameVar);
  return value;
}
function validateCategory(value) {
  const nameVar = "category";
  isEmpty(value, nameVar);
  isTypeOf(value, "string");
  return value;
}
function validateThumbnails(value) {
  isTypeOf(value, "string");
  return value;
}
function validateOwner(value) {
  isTypeOf(value, "string");
  return value;
}

export class Product {
  constructor({
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails,
    owner = "admin",
  }) {
    this.title = validateTitle(title);
    this.description = validateDescription(description);
    this.code = validateCode(code);
    this.price = validatePrice(price);
    this.status = status;
    this.stock = validateStock(stock);
    this.category = validateCategory(category);
    this.thumbnails = validateThumbnails(thumbnails);
    this.owner = validateOwner(owner);
  }
}
