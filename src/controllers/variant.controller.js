const variantService = require("../services/variant.service");

exports.createVariant = async (req, res) => {
  try {
    const variant = await variantService.createVariant(req.body);
    res.json(variant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};