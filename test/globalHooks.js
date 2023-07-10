import mongoose from "mongoose";
import { app } from "../src/app/app.js";

const CNX_STR = "mongodb://localhost/testEcommerce";
const PORT = 8080;

let server;

export const mochaHooks = {
  async beforeAll() {
    await mongoose.connect(CNX_STR);
    await new Promise((res, rej) => {
      server = app.listen(PORT, () => {
        res(true);
      });
    });
  },

  async afterAll() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close();
  },
};
