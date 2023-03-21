import { cartManager } from "../dao/DB/cartManager.js";

class CartsService {
  async createCart(newCart) {
    const productAdded = await cartManager.save(newCart);
    return productAdded;
  }

  async addToCart(cartId, productId, newQuantity = 1) {
    const newProduct = {
      $push: { products: { _id: productId, quantity: newQuantity } },
    };
    let queryFilter = {};
    queryFilter["_id"] = cartId;
    const updateProduct = await cartManager.update(queryFilter, newProduct);
    return updateProduct;
  }

  async showCart(filterVal, max, sortKey, sortVal) {
    let queryFilter = {};
    queryFilter["_id"] = filterVal;
    const products = await cartManager.get(queryFilter, max, sortKey, sortVal);
    return products;
  }

  async showProductsOnCart(cartId, productId = {}) {
    let queryFilter = {};
    queryFilter["_id"] = cartId;
    queryFilter["products._id"] = productId;
    productId != {}
      ? ((queryFilter = { $and: [queryFilter] }), { "products._id": 1 })
      : "";
    return await cartManager.get(queryFilter);
  }

  async deleteCart(filterKey, filterVal) {
    const deleteProduct = await cartManager.delete(filterKey, filterVal);
    return deleteProduct;
  }

  async addToCart(cartId, productId, newQuantity = 1) {
    const newProduct = {
      $push: { products: { _id: productId, quantity: newQuantity } },
    };
    let queryFilter = {};
    queryFilter["_id"] = cartId;
    const updateProduct = await cartManager.update(queryFilter, newProduct);
    return updateProduct;
  }

  async updateCart(cartId, productId) {
    const newProduct = {
      $inc: { "products.$.quantity": 1 },
    };
    let queryFilter = {};
    queryFilter["_id"] = cartId;
    queryFilter["products._id"] = productId;
    queryFilter = { $and: [queryFilter] };
    const updateProduct = await cartManager.update(queryFilter, newProduct);
    return updateProduct;
  }
}

export const cartsService = new CartsService();
