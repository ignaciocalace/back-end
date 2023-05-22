import mongoose from "mongoose";
import { errors } from "../../errors/errors.js";
import { errorHandler } from "../../middlewares/errorsHandler.js";

export class ManagerMongoose {
  constructor(nameCollection, schema) {
    this.collection = mongoose.model(
      nameCollection,
      new mongoose.Schema(schema, { versionKey: false })
    );
  }

  async save(register) {
    try {
      return await this.collection.create(register);
    } catch (err) {
      new errorHandler(errors.DATABASE_ERROR, req, req.res);
    }
  }

  async get(queryFilter, max = 10, sortKey = "_id", sortVal = -1) {
    try {
      let querySort = {};
      querySort[sortKey] = sortVal;
      return await this.collection
        .find(queryFilter)
        .limit(max)
        .sort(querySort)
        .lean();
    } catch (err) {
      new errorHandler(errors.DATABASE_ERROR, req, req.res);
    }
  }

  async getOne(queryFilter = {}) {
    try {
      return await this.collection.findOne(queryFilter);
    } catch (err) {
      new errorHandler(errors.DATABASE_ERROR, req, req.res);
    }
  }

  async getPaginate(queryFilter, options) {
    try {
      return await this.collection.paginate(queryFilter, options);
    } catch (err) {
      new errorHandler(errors.DATABASE_ERROR, req, req.res);
    }
  }

  async update(queryFilter, newData) {
    try {
      return await this.collection.updateOne(queryFilter, newData, {
        multi: true,
      });
    } catch (err) {
      new errorHandler(errors.DATABASE_ERROR, req, req.res);
    }
  }

  async delete(queryFilter) {
    try {
      return await this.collection.deleteMany(queryFilter);
    } catch (err) {
      new errorHandler(errors.DATABASE_ERROR, req, req.res);
    }
  }
}
