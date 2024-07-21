const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  public_address: { type: String, required: true, unique: true },
  distribution_address: { type: String },
  location: {
    type: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String },
      country: { type: String, required: true }
    },
  },
  secret_key: { type: String, required: true },
  distribution_secret_key: { type: String },
  my_products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
