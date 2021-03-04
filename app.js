const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const productRoutes = require('./routes/product');

const serverConfig = require('./configs/server-config');
const filesConfig = require('./configs/files-config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(multer({ storage: filesConfig.fileStorage, fileFilter: filesConfig.fileFilter }).single('image'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTION, GET, POST, DELETE, PATCH, PUT');
  res.setHeader('Access-Control-Allow-Header', '*');
  next();
});

app.use('/product', productRoutes);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));