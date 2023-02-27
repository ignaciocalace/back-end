import fs from "fs";

export class FileManager {
  constructor(path) {
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  async read() {
    let elements = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(elements);
  }

  async write(toWrite) {
    return await fs.promises.writeFile(this.path, JSON.stringify(toWrite));
  }

  async createElement(element) {
    let elements = await this.read();
    elements.push(element);
    await this.write(elements);
  }

  async addElement(cid, pid) {
    let elements = await this.getByKey();
    let indexCart = elements.findIndex((e) => e.id === cid);
    let indexProduct = elements[indexCart].products.findIndex(
      (e) => e.product === pid
    );
    if (indexProduct === -1) {
      await elements[indexCart].products.push({
        product: pid,
        quantity: 1,
      });
      await this.write(elements);
      return true;
    } else {
      elements[indexCart].products[indexProduct].quantity++;
      await this.write(elements);
      return false;
    }
  }

  async getByKey(key, value = {}) {
    let elements = await this.read();
    if (!key) {
      return elements;
    } else {
      return elements.filter((e) => {
        return e[key] === value;
      });
    }
  }

  async getById( valueId) {
    let elements = await this.read();
    return elements.find((e) => e.id === valueId);
  }

  async updateElement(key, value, toUpdate = {}) {
    let elements = await this.read();
    let newElement = elements.find((e) => e[key] === value);
    if (newElement) {
      for (const newKey in toUpdate) {
        newElement[newKey] = toUpdate[newKey];
      }
      elements = elements.filter((e) => e[key] !== value);
      newElement = [...elements, newElement];
      await this.write(newElement);
      return true;
    } else return false;
  }

  async deleteElement(id) {
    let elements = await this.read();
    const isId = this.getById("id", id);
    if (isId) {
      let deletedProduct = elements.filter((e) => e.id !== id);
      await this.write(deletedProduct);
      return true;
    } else return false;
  }
}
