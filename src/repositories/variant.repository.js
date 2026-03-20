const db = require("../db");

// Tạo variant
exports.createVariant = async (productId, size, color, price, stock, sku) => {
  const result = await db.query(
    `INSERT INTO product_variants 
     (product_id, size, color, price, stock, sku)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [productId, size, color, price, stock, sku]
  );

  return result.rows[0];
};