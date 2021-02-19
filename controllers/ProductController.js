let products = [
  { id: 0, title: 'product 00', price: 10},
  { id: 1, title: 'product 01', price: 20},
  { id: 2, title: 'product 02', price: 30},
  { id: 3, title: 'product 03', price: 40},
];

exports.getProducts = (req, res, next) => {
  res.status(200).json({
    products
  });
};

exports.getProduct = (req, res, next) => {
  const id = +req.params.id;
  const product = products.filter(p => p.id === id)[0] || {};
  res.status(200).json({
    product
  });
}