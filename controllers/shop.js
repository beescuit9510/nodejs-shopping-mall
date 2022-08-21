const Product = require('../models/products');

const Cart = require('../models/cart');

module.exports.getProducts = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'shop'));

  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      pageTitle: 'All Products',
      prods: products,
      path: '/products',
    });
  });
};

module.exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      pageTitle: 'Shop',
      prods: products,
      path: '/',
    });
  });
};

module.exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart',
  });
};

module.exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(product.id, product.price);
  });

  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

module.exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};

module.exports.getProduct = (req, res, next) => {
  Product.findById(req.params.id, (product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product?.title,
      path: '/products',
    });
  });
};
