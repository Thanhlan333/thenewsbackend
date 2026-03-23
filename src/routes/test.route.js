const express = require("express");
const router = express.Router();

const testController = require("../controllers/test.controller");

router.get("/test-db", testController.testConnection);

module.exports = router;