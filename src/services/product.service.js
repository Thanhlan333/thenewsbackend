const productRepo = require("../repositories/product.repository");

exports.createProduct = async (data) => {
  const { name, description } = data;

  if (!name) {
    throw new Error("Name is required");
  }

  return await productRepo.createProduct(name, description);
};

exports.getAllProducts = async () => {
  return await productRepo.getAllProducts();
};

exports.getProductById = async (id) => {
  return await productRepo.getProductById(id);
};