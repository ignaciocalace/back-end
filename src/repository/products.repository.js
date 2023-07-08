import { productManager } from "../dao/DB/productManager.js";

class ProductsRepository {
  constructor(productsDao) {
    this.productsDao = productsDao;
  }
  async addProduct(dataNewProduct) {
    const elements = await this.showProduct("code", dataNewProduct.code);
    if (!elements) {
      return await this.productsDao.save(dataNewProduct);
    } else {
      return false;
    }
  }
  async showProduct(filterKey, filterVal, max, sortKey, sortVal) {
    let queryFilter = {};
    queryFilter[filterKey] = filterVal;
    const products = await this.productsDao.get(
      queryFilter,
      max,
      sortKey,
      sortVal
    );
    return products[0];
  }
  async showPaginate(queryFilter = {}, page = 1, limit = 10, sort) {
    let options = { limit: limit, page: page, sort: { price: sort } };
    return await this.productsDao.getPaginate(queryFilter, options);
  }

  async deleteProduct(filterKey, filterVal) {
    let queryFilter = {};
    queryFilter[filterKey] = filterVal;
    return await this.productsDao.delete(queryFilter);
  }
  async updateProduct(filterKey, filterVal, newProduct) {
    let queryFilter = {};
    queryFilter[filterKey] = filterVal;
    const updateProduct = await this.productsDao.update(
      queryFilter,
      newProduct
    );
    return updateProduct;
  }
}

export const productsRepository = new ProductsRepository(productManager);
