const pool = require("../db");

exports.testConnection = async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      message: "Kết nối DB thành công",
      time: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Kết nối DB thất bại",
      error: error.message,
    });
  }
};