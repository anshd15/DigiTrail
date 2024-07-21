const DiamSdk = require('diamante-sdk-js');
const axios = require('axios');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const server = new DiamSdk.Horizon.Server('https://diamtestnet.diamcircle.io');

const createProductOrder = async (req, res) => {
  try {
    const { title, desc, images, token_name } = req.body;
    // Create a token asset using diamante API
    // const newAssetResp = await axios.post('/api/user/create-asset', {
    //   token_name,
    //   no_of_tokens
    // });

    const seller = req.userId;
    const product = new Product({
      title,
      desc,
      images,
      seller,
      token_name
    });

    const savedProduct = await product.save();

    const user = await User.findById(req.userId);
    user.my_products.push(savedProduct._id);
    await user.save();

    res.status(200).json({
      result: property,
      message: 'Product order created successfully'
    });
  } catch (error) {
    console.error('Error creating product order:', error);
    res.status(500).json({ error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: 'my_products',
      model: 'Product'
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({
      result: user,
      message: 'User details fetched successfully'
    });
  } catch (error) {
    console.error('Error getting user details:', error);
    res.status(500).json({ error: error.message });
  }
};

const setAccountDataOnChain = async (req, res) => {
  try {
    const { name, value } = req.body;
    const user = await User.findById(req.userId);
    const sourceKeys = DiamSdk.Keypair.fromSecret(user.secret_key);
    const senderPublicKey = sourceKeys.publicKey();
    const account = await server.loadAccount(senderPublicKey);
    const transaction = new DiamSdk.TransactionBuilder(account, {
      fee: await server.fetchBaseFee(),
      networkPassphrase: DiamSdk.Networks.TESTNET
    })
      .addOperation(
        DiamSdk.Operation.manageData({
          name,
          value: value || null
        })
      )
      .setTimeout(30)
      .build();
    transaction.sign(sourceKeys);
    const result = await server.submitTransaction(transaction);
    await server.submitTransaction(transaction);
    // return res.status(200).json({
    //   result,
    //   message: `Data ${name} set to ${value} successfully`
    // });
  } catch (error) {
    console.error('Error setting account data on chain:', error);
    return res.status(500).json({ error: error.message });
  }
};

const createTokenAssetOnChain = async (req, res) => {
  try {
    const { token_name } = req.body;
    const user = await User.findById(req.userId);
    const issuingKeys = DiamSdk.Keypair.fromSecret(user.secret_key);
    // Create a distributor account
    const distributorKeypair = DiamSdk.Keypair.random();
    console.log('dist:', distributorKeypair.publicKey());
    const fund = await axios.post(
      'http://localhost:4000/api/auth/fund-account',
      {
        public_address: distributorKeypair.publicKey()
      }
    );
    user.distribution_address = distributorKeypair.publicKey();
    user.distribution_secret_key = distributorKeypair.secret();
    await user.save();
    const receivingKeys = DiamSdk.Keypair.fromSecret(
      distributorKeypair.secret()
    );
    // Create an asset (token) on diamante chain
    const newAsset = new DiamSdk.Asset(token_name, issuingKeys.publicKey());

    // Create trustline between distributor and issuer account
    server
      .loadAccount(receivingKeys.publicKey())
      .then(function (receiver) {
        let transaction = new DiamSdk.TransactionBuilder(receiver, {
          fee: 100,
          networkPassphrase: DiamSdk.Networks.TESTNET
        })
          .addOperation(
            DiamSdk.Operation.changeTrust({
              asset: newAsset,
              limit: '1'
            })
          )
          .setTimeout(100)
          .build();
        transaction.sign(receivingKeys);
        return server.submitTransaction(transaction);
      })
      .then(console.log)

      // Send the money (new asset tokens) to the distributor from issuer account
      .then(function () {
        return server.loadAccount(issuingKeys.publicKey());
      })
      .then(function (issuer) {
        let transaction = new DiamSdk.TransactionBuilder(issuer, {
          fee: 100,
          networkPassphrase: DiamSdk.Networks.TESTNET
        })
          .addOperation(
            DiamSdk.Operation.payment({
              destination: receivingKeys.publicKey(),
              asset: newAsset,
              amount: 1
            })
          )
          .setTimeout(100)
          .build();
        transaction.sign(issuingKeys);
        return server.submitTransaction(transaction);
      })
      .then(console.log)
      .catch(function (error) {
        console.error(
          'Error occured while tranfering asset to distributor!',
          error
        );
      });

    return res
      .status(200)
      .json({ result: newAsset, message: 'Asset created successfully' });
  } catch (error) {
    console.error('Error creating token asset on chain:');
    return res.status(500).json({ error: error.message });
  }
};

const sendAssetToken = async (req, res) => {
  try {
    const { receiverSecretKey, senderSecretKey, token_name } = req.body;
    const receiverKeys = DiamSdk.Keypair.fromSecret(receiverSecretKey);
    const senderKeys = DiamSdk.Keypair.fromSecret(senderSecretKey);
    const account = await server.loadAccount(receiverKeys.publicKey());
    const account2 = await server.loadAccount(senderKeys.publicKey());
    const asset = new DiamSdk.Asset(token_name, senderKeys.publicKey());

    // Create trustline between receiver and sender account
    const transaction = new DiamSdk.TransactionBuilder(account, {
      fee: DiamSdk.BASE_FEE,
      networkPassphrase: 'Diamante Testnet'
    })
      .addOperation(DiamSdk.Operation.changeTrust({ asset }))
      .setTimeout(100)
      .build();

    transaction.sign(receiverKeys);
    const result = await server.submitTransaction(transaction);

    // Send the asset tokens to the receiver
    const transaction2 = new DiamSdk.TransactionBuilder(account2, {
      fee: DiamSdk.BASE_FEE,
      networkPassphrase: 'Diamante Testnet'
    })
      .addOperation(
        DiamSdk.Operation.payment({
          destination: receiverKeys.publicKey(),
          asset,
          amount: '1'
        })
      )
      .setTimeout(100)
      .build();

    transaction2.sign(senderKeys);
    const result2 = await server.submitTransaction(transaction2);
    return res
      .status(200)
      .json({ resut: result, message: 'Asset tokens sent successfully' });
  } catch (error) {
    console.error('Error sending token asset on chain:');
    return res.status(500).json({ error: error.message });
  }
};

const makePayment = async (req, res) => {
  try {
    const { receiverPublicKey, amount } = req.body;
    const user = await User.findById(req.userId);
    const senderSecret = user.secret_key;
    const senderKeypair = DiamSdk.Keypair.fromSecret(senderSecret);
    const senderPublicKey = senderKeypair.publicKey();
    const account = await server.loadAccount(senderPublicKey);
    const transaction = new DiamSdk.TransactionBuilder(account, {
      fee: await server.fetchBaseFee(),
      networkPassphrase: DiamSdk.Networks.TESTNET
    })
      .addOperation(
        DiamSdk.Operation.payment({
          destination: receiverPublicKey,
          asset: DiamSdk.Asset.native(),
          amount: amount
        })
      )
      .setTimeout(30)
      .build();
    transaction.sign(senderKeypair);
    const result = await server.submitTransaction(transaction);

    res.status(200).json({
      message: `Payment of ${amount} DIAM made to ${receiverPublicKey} successfully`
    });
  } catch (error) {
    console.error('Error in making payment:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProductOrder,
  getUserDetails,
  makePayment,
  setAccountDataOnChain,
  createTokenAssetOnChain,
  sendAssetToken
};
