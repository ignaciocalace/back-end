import { hashPass } from "../src/utils/crypt.js";

export const testUserToRegister = {
  first_name: "Pepe",
  last_name: "Fuentes",
  email: "pepeFuentes@gmail.com",
  age: 45,
  password: "ILoveProgramming",
  role: "premium",
};

export const testUserToInsert = {
  ...testUserToRegister,
  password: hashPass("ILoveProgramming"),
  cart: "xxxx",
};
export const testUserExpected = {
  name: "Pepe Fuentes",
  email: "pepeFuentes@gmail.com",
  age: 45,
  cart: "xxxx",
  role: "premium",
};
export const testUserExpectedDb = {
  first_name: "Pepe",
  last_name: "Fuentes",
  email: "pepeFuentes@gmail.com",
  age: 45,
  role: "premium",
};
export const userCredentials = {
  email: "pepeFuentes@gmail.com",
  password: "ILoveProgramming",
};
export const testProductMin = {
  title: "Product testing",
  description: "This is a test Product",
  code: 547865,
  price: 9999,
  status: true,
  stock: 10,
  category: "Test Category",
  thumbnails: "",
};

export const expectedTestProductMin = {
  ...testProductMin,
  thumbnails: "",
  owner: testUserToRegister.email,
};

export const testProductMax = {
  ...testProductMin,
  status: true,
  thumbnails: "Testing Thumbnails",
  owner: testUserToRegister.email,
};

export const testRandomProduct = { ...testProductMax, owner: "admin" };
