const { getDb } = require('../util/databse');
const { ObjectId } = require('mongodb');

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  static buildUser(user) {
    const { username, email, cart, _id } = user;
    return new User(username, email, cart, _id);
  }
  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {
    const cartItems = this?.cart?.items ?? [];
    const cartProductIndex = cartItems.findIndex((cartProd) => {
      return cartProd.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...cartItems];

    if (cartProductIndex >= 0) {
      newQuantity += cartItems[cartProductIndex].quantity;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };

    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((prod) => prod.productId);
    return db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((prod) => {
          return {
            ...prod,
            quantity: this.cart.items.find((item) => {
              return item.productId.toString() === prod._id.toString();
            }).quantity,
          };
        });
      });

    // return this.cart;
  }

  deleteItemFromCart(productId) {
    const updatedCart = this?.cart?.items.filter(
      (prod) => prod.productId.toString() !== productId.toString()
    );

    const db = getDb();

    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCart } } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch(console.log);
  }
}

module.exports = User;
