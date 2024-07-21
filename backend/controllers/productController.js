const Product = require('../models/productModel');

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
    const product = await Product.findById(id)
      .populate('seller')
      .populate('track.track_point')
      .populate('last_track_point')
      .populate('trustlines')
      .exec();

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({
      result: product,
      message: 'Product fetched successfully'
    });
  } catch (error) {
    console.error('Error getting product:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the product' });
  }
};

module.exports = { getSingleProduct};
