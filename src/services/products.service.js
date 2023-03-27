import { productManager } from "../dao/DB/productManager.js";

class ProductsService {
  async addProduct(dataNewProduct) {
    const elements = await productsService.showProduct(
      "code",
      dataNewProduct.code
    );
    if (elements.length === 0) {
      return await productManager.save(dataNewProduct);
    } else {
      return false;
    }
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
  async showPaginate(queryFilter = {}, page = 1, limit = 10, sort) {
    let options = { limit: limit, page: page, sort: { price: sort } };
    return await productManager.getPaginate(queryFilter, options);
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
