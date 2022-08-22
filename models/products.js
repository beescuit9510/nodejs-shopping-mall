const mongodb = require('mongodb');
const { getDb } = require('../util/databse');

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  static buildProduct(body) {
    const { title, price, description, imageUrl, prodId, productId } = body;
    const id = prodId ?? productId;
    let _id = null;

    if (id) _id = new mongodb.ObjectId(id);

    return new Product(title, price, description, imageUrl, _id);
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      dbOp = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp.then(console.log).catch(console.log);
  }

  static fetchAll() {
    const db = getDb();

    return db
      .collection('products')
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch(console.log);
  }

  static findById(id) {
    const db = getDb();

    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch(console.log);
  }

  static deleteById(id) {
    const db = getDb();

    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((result) => {
        console.log('Deleted');
        return result;
      })
      .catch(console.log);
  }
}

module.exports = Product;
