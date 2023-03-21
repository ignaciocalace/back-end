import mongoose from "mongoose";

export class ManagerMongoose {
  constructor(nameCollection, schema) {
    this.collection = mongoose.model(
      nameCollection,
      new mongoose.Schema(schema, { versionKey: false })
    );
  }

  async save(register) {
    return this.collection.create(register);
  }
  async get(queryFilter, max = 10, sortKey = "_id", sortVal = -1) {
    let querySort = {};
    querySort[sortKey] = sortVal;
    return await this.collection
      .find(queryFilter)
      .limit({ max })
      .sort(querySort)
      .lean();
  }

  async update(queryFilter, newData) {
    return await this.collection.updateOne(queryFilter, newData);
  }

  async delete(queryFilter) {
    return await this.collection.deleteMany(queryFilter);
  }
}
