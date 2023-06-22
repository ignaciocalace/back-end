import assert from "assert";
import supertest from "supertest";
import mongoose from "mongoose";
import * as mocks from "../mocks.js";

const PORT = 8080;
const serverBaseUrl = `http://localhost:${PORT}`;
const httpClient = supertest.agent(serverBaseUrl);

describe("Router Products", () => {
  const cleanCollections = async () => {
    await Promise.all([
      mongoose.connection.collection("products").deleteMany({}),
      mongoose.connection.collection("users").deleteMany({}),
      mongoose.connection.collection("carts").deleteMany({}),
    ]);
  };

  before(async () => {
    await cleanCollections();
    await httpClient.post("/api/register").send(mocks.testUserToRegister);
  });

  afterEach(async () => {
    await cleanCollections();
  });

  after(async () => {
    await cleanCollections();
  });

  describe("POST", () => {
    describe("Sending product data", () => {
      it("Create a product with minimal required data", async () => {
        const { statusCode, ok, body } = await httpClient
          .post("/api/products")
          .send(mocks.testProductMin);
        delete body.product._id;
        assert.ok(ok, "Failed request");
        assert.strictEqual(statusCode, 201);
        assert.deepStrictEqual(body.product, mocks.expectedTestProductMin);
      });
      it("Create a product with all data", async () => {
        const { statusCode, ok, body } = await httpClient
          .post("/api/products")
          .send(mocks.testProductMax);
        delete body.product._id;
        assert.ok(ok, "Failed request");
        assert.strictEqual(statusCode, 201);
        assert.deepStrictEqual(body.product, mocks.testProductMax);
      });
    });

    describe("Sending repeated product", () => {
      it("Adding repeated product", async () => {
        await httpClient.post("/api/products").send(mocks.testProductMax);
        const { statusCode, ok } = await httpClient
          .post("/api/products")
          .send(mocks.testProductMax);

        assert.ok(ok, "Failed request");
        assert.strictEqual(statusCode, 200);
      });
    });
  });
});
