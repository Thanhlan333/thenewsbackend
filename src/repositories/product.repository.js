const db = require("../db");

// Tạo product
exports.createProduct = async (name, description) => {
  const result = await db.query(
    `INSERT INTO products (name, description)
     VALUES ($1, $2)
     RETURNING *`,
    [name, description]
  );
  return result.rows[0];
};

// Lấy tất cả product
exports.getAllProducts = async () => {
  const result = await db.query(
    `SELECT * FROM products ORDER BY created_at DESC`
  );
  return result.rows;
};

// Lấy product theo id + variants
exports.getProductById = async (id) => {
  const product = await db.query(
    `SELECT * FROM products WHERE id = $1`,
    [id]
  );

  const variants = await db.query(
    `SELECT * FROM product_variants WHERE product_id = $1`,
    [id]
  );

  return {
    ...product.rows[0],
    variants: variants.rows,
  };
};