const express = require('express');
const app = express();
const productRoutes = require('./routes/product');

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTION, GET, POST, DELETE, PATCH, PUT');
  res.setHeader('Access-Control-Allow-Header', '*');
  next();
});

app.use('/product', productRoutes);

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));