const pool = require("../db");
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

// Lấy 20 product
exports.getAllProducts = async (limit, offset) => {
  const result = await pool.query(
    "SELECT * FROM products LIMIT $1 OFFSET $2",
    [limit, offset]
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