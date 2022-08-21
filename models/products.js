const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const pathToJson = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (cb) => {
  return fs.readFile(pathToJson, (err, fileContent) => {
    if (err) {
      cb([]);
      return;
    }

    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.id = null;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if (this?.id) {
        const foundProdIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        products[foundProdIndex] = this;
        fs.writeFile(pathToJson, JSON.stringify(products), console.log);
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(pathToJson, JSON.stringify(products), console.log);
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const removedProduct = products.find((prod) => prod.id === id);

      const filteredProducts = products.filter((prod) => prod.id !== id);

      fs.writeFile(pathToJson, JSON.stringify(filteredProducts), (err) => {
        if (err) return;
        Cart.deleteProduct(id, removedProduct.price);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) =>
      cb(products.find((product) => product.id == id))
    );
  }
};
