const express = require('express');
const {
  getAllProduct,
  getSingleProduct,
  searchProduct
} = require('../controllers/productController');

const productRouter = express.Router();

productRouter
  .get('/get-all', getAllProduct)
  .get('/search', searchProduct)
  .get('/get/:id', getSingleProduct);

module.exports = productRouter;
