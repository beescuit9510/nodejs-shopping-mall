const db = require('../util/databse');

const Cart = require('./cart');

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.id = null;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    return db.execute(
      `INSERT INTO products (title, price, imageUrl, description) VALUES(?, ?, ?, ?)`,
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id) {
    return db.execute(`DELETE FROM products WHERE id = ${id}`);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute(`SELECT * FROM products WHERE id = ${id}`);
  }
};
