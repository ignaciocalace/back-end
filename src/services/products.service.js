import { productsRepository } from "../repository/products.repository.js";

class ProductsService {
  async addProduct(dataNewProduct) {
    return await productsRepository.addProduct(dataNewProduct);
  }

  async showProduct(filterKey, filterVal, max, sortKey, sortVal) {
    return await productsRepository.showProduct(
      filterKey,
      filterVal,
      max,
      sortKey,
      sortVal
    );
  }
  async showPaginate(queryFilter = {}, page = 1, limit = 10, sort) {
    return await productsRepository.showPaginate(
      queryFilter,
      page,
      limit,
      sort
    );
  }

  async deleteProduct(filterKey, filterVal) {
    return await productsRepository.deleteProduct(filterKey, filterVal);
  }
  async updateProduct(filterKey, filterVal, newProduct) {
    return productsRepository.updateProduct(filterKey, filterVal, newProduct);
  }
}

export const productsService = new ProductsService();
