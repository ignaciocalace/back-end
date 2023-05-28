import { winstonLogger } from "../middlewares/logger.js";
import { generateProduct } from "../mocks/mockProducts.js";

const productMock = generateProduct();
winstonLogger.info(productMock);
