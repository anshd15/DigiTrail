const express = require('express');
const {
	handleUserLogin,
	handleUserSignUp,
	fundAccountWithTestDiam
} = require('../controllers/authController');
const authRouter = express.Router();

authRouter.post('/login', handleUserLogin);
authRouter.post('/signup', handleUserSignUp);
authRouter.post('/fund-account', fundAccountWithTestDiam)

module.exports = authRouter;
