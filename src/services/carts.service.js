import { cartsRepository } from "../repository/carts.repository.js";

class CartsService {
  async createCart(newCart) {
    return await cartsRepository.createCart(newCart);
  }
  async getFirstCart(queryFilter) {
    return await cartsRepository.getFirstCart(queryFilter);
  }

  async showCart(filterVal, max, sortKey, sortVal) {
    return await cartsRepository.showCart(filterVal, max, sortKey, sortVal);
  }

  async showProductsOnCart(cartId, productId = {}) {
    return await cartsRepository.showProductsOnCart(cartId, productId);
  }

  async deleteCartProducts(cartId, toDelete) {
    return await cartsRepository.deleteCartProducts(cartId, toDelete);
  }

  async addToCart(cartId, productId, newQuantity = 1) {
    return await cartsRepository.addToCart(cartId, productId, newQuantity);
  }

  async updateProductCart(cartId, productId, newQuantity) {
    return await cartsRepository.updateProductCart(
      cartId,
      productId,
      newQuantity
    );
  }

  async updateCart(cartId, toUpdate) {
    return await cartsRepository.updateCart(cartId, toUpdate);
  }
}

export const cartsService = new CartsService();
