const mongodb = require('mongodb');
const { mongoConnect, getDb } = require('../util/databse');

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  static buildProduct(body) {
    const { title, price, description, imageUrl } = body;
    return new Product(title, price, description, imageUrl);
  }
  save() {
    const db = getDb();
    return db
      .collection('products')
      .insertOne(this)
      .then(console.log)
      .catch(console.log);
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
}

module.exports = Product;
