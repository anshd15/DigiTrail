const express = require('express');
const { getSingleProduct } = require('../controllers/productController');

const productRouter = express.Router();

productRouter.get('/get/:id', getSingleProduct);

module.exports = productRouter;
