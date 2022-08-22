const Product = require('../models/products');

const Cart = require('../models/cart');

module.exports.getProducts = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'shop'));

  Product.fetchAll()
    .then(([rows]) => {
      res.render('shop/product-list', {
        pageTitle: 'All Products',
        prods: rows,
        path: '/products',
      });
    })
    .catch(console.log);
};

module.exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows]) => {
      res.render('shop/index', {
        pageTitle: 'Shop',
        prods: rows,
        path: '/',
      });
    })
    .catch(console.log);
};

module.exports.getCart = (req, res, next) => {
  Product.fetchAll((products) => {
    Cart.getCart((cart) => {
      Product.fetchAll((products) => {
        const cartProducts = cart.products.map((prodInCart) => {
          const productData = products.find(
            (prod) => prod.id === prodInCart.id
          );
          return { productData: productData, qty: prodInCart.qty };
        });

        res.render('shop/cart', {
          pageTitle: 'Your Cart',
          path: '/cart',
          products: cartProducts,
        });
      });
    });
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
  const { id } = req.params;
  Product.findById(id)
    .then(([product]) => {
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product?.title,
        path: '/products',
      });
    })
    .catch(console.log);
};

module.exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect('/cart');
  });
};
