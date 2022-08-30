const Product = require('../models/products');

module.exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/product-list', {
        pageTitle: 'All Products',
        prods: products,
        path: '/products',
      });
    })
    .catch(console.log);
};

module.exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/index', {
        pageTitle: 'Shop',
        prods: products,
        path: '/',
      });
    })
    .catch(console.log);
};

module.exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: products,
      });
    })
    .catch(console.log);
};

module.exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect('/cart');
    })
    .catch(console.log);
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then((result) => {
      res.redirect('/orders');
      return fetchedCart.setProducts(null);
    })
    .catch(console.log);
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrder()
    .then((orders) => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
      });
    })
    .catch(console.log);
};

module.exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};

module.exports.getProduct = (req, res, next) => {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product?.title,
        path: '/products',
      });
    })
    .catch(console.log);
};

module.exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;

  req.user
    .deleteItemFromCart(productId)
    .then(() => {
      res.redirect('/cart');
    })
    .catch(console.log);
};
