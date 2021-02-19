const express = require('express');
const app = express();
const productRoutes = require('./routes/product');

const PORT = process.env.PORT || 3500;

app.use(express.json());

app.use('/product', productRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));