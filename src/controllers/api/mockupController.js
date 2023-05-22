import { errors } from "../../errors/errors.js";
import { generateProduct } from "../../mocks/mockProducts.js";

export default function generateProductMock(req, res) {
  try {
    const products = [];
    for (let i = 0; i < 100; i++) {
      const productMock = generateProduct();
      products.push(productMock);
    }
    return res.status(200).json(products);
  } catch (err) {
    new errorHandler(errors.NOT_FOUND, req, req.res);
  }
}
