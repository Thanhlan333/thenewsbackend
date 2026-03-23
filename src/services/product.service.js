const productRepo = require("../repositories/product.repository");

exports.createProduct = async (data) => {
  const { name, description } = data;

  if (!name) {
    throw new Error("Name is required");
  }

  return await productRepo.createProduct(name, description);
};

exports.getAllProducts = async (page = 1) => {
  const limit = 10;
  const offset = (page - 1) * limit;

  return await productRepo.getAllProducts(limit, offset);
};

exports.getProductById = async (id) => {
  return await productRepo.getProductById(id);
};