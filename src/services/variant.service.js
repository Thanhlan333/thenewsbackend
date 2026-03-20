const variantRepo = require("../repositories/variant.repository");

exports.createVariant = async (data) => {
  const { productId, size, color, price, stock, sku } = data;

  if (!productId || !size || !price || !stock) {
    throw new Error("Missing required fields");
  }

  return await variantRepo.createVariant(
    productId,
    size,
    color,
    price,
    stock,
    sku
  );
};