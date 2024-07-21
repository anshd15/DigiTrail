const Product = require('../models/productModel');

const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find()
      .populate('owner')
      .populate('investors.investor');
    product.sort((a, b) => b.created_at - a.created_at);
    res.status(200).json({
      result: product,
      message: 'All properties fetched successfully'
    });
  } catch (error) {
    console.error('Error getting all properties:', error);
    res.status(500).json({ error: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
    const product = await Product.findById(id)
      .populate('owner')
      .populate('investors.investor');
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

const searchProduct = async (req, res) => {
  try {
    const { q } = req.query;
    const product = await Product.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { 'location.address': { $regex: q, $options: 'i' } },
        { token_name: { $regex: q, $options: 'i' } }
      ]
    });
    return res.status(200).json({
      result: product,
      message: 'Search results fetched successfully'
    });
  } catch (error) {
    console.error('Error searching product:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllProduct, getSingleProduct, searchProduct };
