const Product = require('../models/products');

const Cart = require('../models/cart');

module.exports.getProducts = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'shop'));

  Product.findAll()
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
  Product.findAll()
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
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: products,
      });
    })
    .catch(console.log);

  // Product.fetchAll((products) => {
  //   Cart.getCart((cart) => {
  //     Product.fetchAll((products) => {
  //       const cartProducts = cart.products.map((prodInCart) => {
  //         const productData = products.find(
  //           (prod) => prod.id === prodInCart.id
  //         );
  //         return { productData: productData, qty: prodInCart.qty };
  //       });
  //       res.render('shop/cart', {
  //         pageTitle: 'Your Cart',
  //         path: '/cart',
  //         products: cartProducts,
  //       });
  //     });
  //   });
  // });
};

module.exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  let fetchedCart;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const [product] = products;

      if (product) return product;

      return Product.findByPk(productId);
    })
    .then((product) => {
      const oldQuantity = product.cartItem?.quantity ?? 0;
      const newQuantity = 1 + oldQuantity;
      return fetchedCart
        .addProduct(product, {
          through: { quantity: newQuantity },
        })
        .catch(console.log);
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(console.log);
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
  Product.findByPk(id)
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product?.title,
        path: '/products',
      });
    })
    .catch(console.log);

  // Product.find({ where: { id: id } })
  //   .then((product) => {
  //     res.render('shop/product-detail', {
  //       product: product,
  //       pageTitle: product?.title,
  //       path: '/products',
  //     });
  //   })
  //   .catch(console.log);
};

module.exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;

  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then(([product]) => {
      return product.cartItem.destroy();
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(console.log);
};
