const express = require('express');
const {
  getUserDetails,
  setAccountDataOnChain,
  createTokenAssetOnChain,
  makePayment,
  createProductOrder,
  sendAssetToken
} = require('../controllers/userController');
const userRouter = express.Router();

userRouter
  .post('/create-order', createProductOrder) 
  .get('/details', getUserDetails)
  .post('/set-data', setAccountDataOnChain)
  .post('/create-asset', createTokenAssetOnChain)
  .post('/make-payment', makePayment)
  .post('/send-token', sendAssetToken);

module.exports = userRouter;
