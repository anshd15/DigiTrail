const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db.js');
const authRouter = require('./routes/authRoute.js');
const userRouter = require('./routes/userRoute.js');
const authenticateUser = require('./middlewares/authenticateUser.js');
const bodyParser = require("body-parser");
const productRouter = require('./routes/productRoute.js');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// CORS Middleware
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// Function to connect to mongodb database
connectDB();

// This middleware helps parse that JSON data and make it available in the req.body object of your route handlers.
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Server is Up ✅' });
});

// Auth Routes
app.use('/api/auth', authRouter);

// User Routes - Protected
app.use('/api/user', authenticateUser, userRouter);

// Property Routes - Protected
app.use('/api/property', authenticateUser, productRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
