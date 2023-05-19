import mongoose from "mongoose";

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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(queryFilter = {}) {
    try {
      return await this.collection.findOne(queryFilter);
    } catch (error) {
      console.log(error);
    }
  }

  async getPaginate(queryFilter, options) {
    try {
      return await this.collection.paginate(queryFilter, options);
    } catch (error) {
      console.log(error);
    }
  }

  async update(queryFilter, newData) {
    try {
      return await this.collection.updateOne(queryFilter, newData, {
        multi: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(queryFilter) {
    try {
      return await this.collection.deleteMany(queryFilter);
    } catch (error) {
      console.log(error);
    }
  }
}
