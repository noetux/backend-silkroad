const { db } = require('../services/firebase/firebase');

/**
 * /product/ 
 */
exports.getProducts = (req, res, next) => {
  db.ref('products').once('value', snapshot => {
    let products = snapshot.val();
    console.log(products);
    products = Object.keys(products).map(key => ({ id: key, ...products[key]}));
    res.status(200).json({ products });
  });
};

/**
 * /product/:id
 */
exports.getProduct = (req, res, next) => {
  const id = req.params.id;
  db.ref('products').child(id).once('value', snapshot => {
    let product = snapshot.val();
    if (product) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({
        msg: 'Product not found',
      });
    }
  });
}

/**
 * /product/
 */
exports.createProduct = (req, res, next) => {
  const newProduct = {
    title: req.body.title,
    price: req.body.price
  };
  db.ref('products').push(newProduct).then((ref) => {
    res.status(201).json({
      message: 'Producct Added correctly',
      product: { id: ref.key, ...newProduct }
    });
  });
};