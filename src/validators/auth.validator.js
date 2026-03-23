const { body } = require("express-validator");

exports.registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Email không hợp lệ"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password phải ít nhất 6 ký tự"),
];

exports.loginValidator = [
  body("email").isEmail().withMessage("Email không hợp lệ"),
  body("password").notEmpty().withMessage("Password không được trống"),
];