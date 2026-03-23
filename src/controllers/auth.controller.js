const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check user tồn tại
    const existing = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // tạo user
    const result = await pool.query(
      "INSERT INTO users(email, password_hash) VALUES($1, $2) RETURNING id, email",
      [email, hashed]
    );

    const user = result.rows[0];

    // tạo profile rỗng
    await pool.query(
      "INSERT INTO user_profiles(user_id) VALUES($1)",
      [user.id]
    );

    res.json({
      message: "Đăng ký thành công",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }

    const user = result.rows[0];

    // check password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Sai mật khẩu" });
    }

    // tạo token
    const token = jwt.sign(
      { userId: user.id, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Đăng nhập thành công",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, email FROM users WHERE id = $1",
      [req.user.userId]
    );

    res.json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};