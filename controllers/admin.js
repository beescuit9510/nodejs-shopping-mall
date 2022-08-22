const Product = require('../models/products');

module.exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

module.exports.postAddProduct = (req, res, next) => {
  req.user
    .createProduct({ ...req.body })
    .then(() => {
      console.log('Created Product');
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

  req.user
    .getProducts({ where: { id: prodId } })
    .then(([product]) => {
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
  const { productId, title, price, imageUrl, description } = req.body;

  Product.findByPk(productId)
    .then((product) => {
      Object.assign(product, { ...req.body });
      return product.save();
    })
    .then(() => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/');
    })
    .catch(console.log);
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
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

  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(console.log);

  // Product.destory({ where: { id: productId } })
  //   .then(() => {
  //     console.log('DESTROYED PRODUCT');
  //     res.redirect('/admin/products');
  //   })
  //   .catch(console.log);
};
