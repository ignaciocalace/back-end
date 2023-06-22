import assert from "assert";
import supertest from "supertest";
import mongoose from "mongoose";
import * as mocks from "../mocks.js";
import { extractTokenFromSignedCookie } from "../utils.js";
import { PASSJWT } from "../../src/config/passwords.js";
import jwt from "jsonwebtoken";

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
  });

  afterEach(async () => {
    await cleanCollections();
  });

  after(async () => {
    await cleanCollections();
  });

  describe("POST", () => {
    describe("Testing sessions", () => {
      it("Login", async () => {
        await mongoose.connection
          .collection("users")
          .insertOne(mocks.testUserToInsert);
        const { headers } = await httpClient
          .post("/api/login")
          .send(mocks.userCredentials);
        const cookie = headers["set-cookie"][0];
        const token = extractTokenFromSignedCookie(cookie);
        const { exp, iat, id, ...data } = jwt.verify(token, PASSJWT);
        assert.deepStrictEqual(data, mocks.testUserExpected);
      });
      it("Register", async () => {
        await httpClient.post("/api/register").send(mocks.testUserToRegister);
        const { _id, password, cart, ...user } = await mongoose.connection
          .collection("users")
          .findOne({ email: mocks.testUserToRegister.email });
        assert.deepStrictEqual(user, mocks.testUserExpectedDb);
      });
    });
  });
  describe("GET", () => {
    describe("Getting user info", () => {
      it("Get userDTO", async () => {
        await mongoose.connection
          .collection("users")
          .insertOne(mocks.testUserToInsert);
        await httpClient.post("/api/login").send(mocks.userCredentials);
        const { statusCode, ok, body } = await httpClient.get(
          "/api/sessions/current"
        );
        const { exp, iat, id, ...data } = body;
        assert.ok(ok, "Failed request");
        assert.strictEqual(statusCode, 200);
        assert.deepStrictEqual(data, mocks.testUserExpected);
      });
    });
  });
});
