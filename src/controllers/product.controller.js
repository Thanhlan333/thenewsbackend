const productService = require("../services/product.service");

exports.createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.json(product);
  } catch (err) {
    
    res.status(400).json({ message: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const products = await productService.getAllProducts(page);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};