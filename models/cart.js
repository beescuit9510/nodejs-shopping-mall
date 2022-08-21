const fs = require('fs');
const path = require('path');

const pathToCart = path.join(
  path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json')
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(pathToCart, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const foundProdIndex = cart.products.findIndex((prod) => prod.id === id);
      const foundProd = cart.products[foundProdIndex];

      let updatedProd;
      if (foundProd) {
        updatedProd = { ...foundProd, qty: foundProd.qty + 1 };
        cart.products[foundProdIndex] = updatedProd;
      } else {
        updatedProd = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProd];
      }

      cart.totalPrice += +productPrice;
      fs.writeFile(pathToCart, JSON.stringify(cart), console.log);
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(pathToCart, (err, fileContent) => {
      if (err) return;

      const cart = JSON.parse(fileContent);
      const product = cart.products.find((prod) => prod.id === id);

      const filteredProducts = cart.products.filter((prod) => prod.id !== id);
      cart.products = filteredProducts;

      cart.totalPrice -= price * product.qty;

      fs.writeFile(pathToCart, JSON.stringify(cart), console.log);
    });
  }

  static getCart(cb) {
    fs.readFile(pathToCart, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
