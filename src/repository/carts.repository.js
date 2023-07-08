import { cartManager } from "../dao/DB/cartManager.js";

class CartsRepository {
  constructor(cartsDao) {
    this.cartsDao = cartsDao;
  }
  async createCart(newCart) {
    const productAdded = await this.cartsDao.save(newCart);
    return productAdded;
  }
  async getFirstCart(queryFilter) {
    return await this.cartsDao.getOne(queryFilter);
  }

  async showCart(filterVal, max, sortKey, sortVal) {
    let queryFilter = {};
    queryFilter["_id"] = filterVal;
    const products = await this.cartsDao.get(
      queryFilter,
      max,
      sortKey,
      sortVal
    );
    return products[0];
  }

  async showProductsOnCart(cartId, productId = {}) {
    let queryFilter = {};
    queryFilter["_id"] = cartId;
    queryFilter["products._id"] = productId;
    productId != {}
      ? ((queryFilter = { $and: [queryFilter] }), { "products._id": 1 })
      : "";
    return await this.cartsDao.get(queryFilter);
  }

  async deleteCartProducts(cartId, toDelete) {
    let queryFilter = {};
    let toPull = {};
    queryFilter["_id"] = cartId;
    toPull["_id"] = toDelete;
    toPull = { $pull: { "products._id": toDelete } };
    const deleteProduct = await this.cartsDao.update({}, toPull);
    return deleteProduct;
  }

  async addToCart(cartId, productId, newQuantity = 1) {
    const newProduct = {
      $push: { products: { _id: productId, quantity: newQuantity } },
    };
    let queryFilter = {};
    queryFilter["_id"] = cartId;
    const updateProduct = await this.cartsDao.update(queryFilter, newProduct);
    return updateProduct;
  }

  async updateProductCart(cartId, productId, newQuantity) {
    const newProduct = {
      "products.$.quantity": newQuantity,
    };
    let queryFilter = {};
    queryFilter["_id"] = cartId;
    queryFilter["products._id"] = productId;
    queryFilter = { $and: [queryFilter] };
    const updateProduct = await this.cartsDao.update(queryFilter, newProduct);
    return updateProduct;
  }

  async updateCart(cartId, toUpdate) {
    const newProduct = {
      products: toUpdate,
    };
    let queryFilter = {};
    queryFilter["_id"] = cartId;
    const updateProduct = await this.cartsDao.update(queryFilter, newProduct);
    return updateProduct;
  }
}
export const cartsRepository = new CartsRepository(cartManager);
