const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

const { registerValidator, loginValidator } = require("../validators/auth.validator");
const { validate } = require("../middlewares/validate.middleware");

// prisvate (test)
const { verifyToken } = require("../middlewares/auth.middleware");

// public
router.post("/register", registerValidator, validate, authController.register);
router.post("/login", loginValidator, validate, authController.login);

// private
router.get("/me", verifyToken, authController.getMe);

module.exports = router;