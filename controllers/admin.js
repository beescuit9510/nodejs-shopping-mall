const Product = require('../models/products');

module.exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

module.exports.postAddProduct = (req, res, next) => {
  const product = Product.buildProduct(req.body, req.user);

  product
    .save()
    .then((result) => {
      console.log('Created Product!');
      console.log(result);
      res.redirect('/admin/products');
    })
    .catch(console.log);
};

module.exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect('/');
    return;
  }

  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect('/');
      }

      res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
      });
    })
    .catch(console.log);
};

module.exports.postEditProduct = (req, res, next) => {
  const product = Product.buildProduct(req.body);

  product
    .save()
    .then(() => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/');
    })
    .catch(console.log);
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch(console.log);
};

module.exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;

  Product.deleteById(productId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(console.log);
};
