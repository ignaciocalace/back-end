import assert from "assert";
import mongoose from "mongoose";
import supertest from "supertest";
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
    await mongoose.connection
      .collection("products")
      .insertOne(mocks.testRandomProduct);
  });

  after(async () => {
    await cleanCollections();
  });

  describe("PUT", () => {
    describe("Sending products to a cart", () => {
      it("Add 1 product to cart", async () => {
        const user = await mongoose.connection.collection("users").findOne({});
        const cid = user.cart.valueOf();
        const productToAdd = await mongoose.connection
          .collection("products")
          .findOne({});
        const pid = productToAdd._id.valueOf();
        const { statusCode, ok, body } = await httpClient
          .put(`/api/carts/${cid}/products/${pid}`)
          .send({ quantity: 5 });
        assert.ok(ok, "Failed request");
        assert.strictEqual(statusCode, 201);
        assert.deepStrictEqual(body.product, {
          acknowledged: true,
          modifiedCount: 1,
          upsertedId: null,
          upsertedCount: 0,
          matchedCount: 1,
        });
      });
      it("Add repeated product to cart", async () => {
        const user = await mongoose.connection.collection("users").findOne({});
        const cid = user.cart.valueOf();
        const productToAdd = await mongoose.connection
          .collection("products")
          .findOne({});
        const pid = productToAdd._id.valueOf();
        await httpClient
          .put(`/api/carts/${cid}/products/${pid}`)
          .send({ quantity: 1 });
        const { statusCode, ok, body } = await httpClient
          .put(`/api/carts/${cid}/products/${pid}`)
          .send({ quantity: 5 });
        assert.ok(ok, "Failed request");
        assert.strictEqual(statusCode, 200);
        assert.deepStrictEqual(body.product, {
          acknowledged: true,
          modifiedCount: 1,
          upsertedId: null,
          upsertedCount: 0,
          matchedCount: 1,
        });
      });
    });
  });
  describe("GET", () => {
    describe("Getting the purchase", () => {
      it("Purchase", async () => {
        const user = await httpClient.get("/api/sessions/current");
        const cid = user.body.cart;
        const productToAdd = await mongoose.connection
          .collection("products")
          .findOne({});
        const pid = productToAdd._id.valueOf();
        await httpClient
          .put(`/api/carts/${cid}/products/${pid}`)
          .send({ quantity: 5 });

        const { statusCode, ok, body } = await httpClient.get(
          `/api/carts/${cid}/purchase`
        );
        const { code, _id, ...rest } = body;
        assert.ok(ok, "Failed request");
        assert.strictEqual(statusCode, 201);
        assert.deepStrictEqual(rest, {
          purchase_datetime: new Date().toLocaleDateString(),
          amount: 49995,
          purchaser: "pepeFuentes@gmail.com",
        });
      });
    });
  });
});
