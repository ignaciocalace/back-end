import { productManager } from "../dao/DB/productManager.js";

class ProductsService {
  async addProduct(dataNewProduct) {
    const productAdded = await productManager.save(dataNewProduct);
    return productAdded;
  }
  async showProduct(filterKey, filterVal, max, sortKey, sortVal) {
    let queryFilter = {};
    queryFilter[filterKey] = filterVal;
    const products = await productManager.get(
      queryFilter,
      max,
      sortKey,
      sortVal
    );
    return products;
  }
  async deleteProduct(filterKey, filterVal) {
    let queryFilter = {};
    queryFilter[filterKey] = filterVal;
    return await productManager.delete(queryFilter);
  }
  async updateProduct(filterKey, filterVal, newProduct) {
    let queryFilter = {};
    queryFilter[filterKey] = filterVal;
    const updateProduct = await productManager.update(queryFilter, newProduct);
    return updateProduct;
  }
}

export const productsService = new ProductsService();
