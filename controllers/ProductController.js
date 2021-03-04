const { db } = require('../services/firebase/firebase');
const serverConfig = require('../configs/server-config');

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

  if (!id) {
    return res.status(402).json({ message: 'Error, provide an id' });
  }

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
  const title = req.body.title;
  const price = parseFloat(req.body.price);
  const image = req.file;

  if (!image || !title || title === '' || (price || -1) <= 0) {
    return res.status(402).json({ message: 'Error on product creation' });
  }

  const imageUrl = image.path.replace('public/', '');
  const newProduct = {
    title,
    price,
    imageUrl
  }

  db.ref('products').push(newProduct).then(ref => {
    newProduct.imageUrl = `${serverConfig.scheme}://${serverConfig.server}:${serverConfig.port}/${newProduct.imageUrl}`
    res.status(201).json({
      message: 'Product created',
      product: { id: ref.key, ...newProduct }
    });
  });
};