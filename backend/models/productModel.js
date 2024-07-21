const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token_name: { type: String, required: true, unique: true },
  track: [
    {
      track_point: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      date: { type: Date, default: Date.now }
    }
  ],
  last_track_point: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  trustlines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  created_at: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
