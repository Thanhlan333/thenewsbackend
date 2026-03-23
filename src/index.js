require("dotenv").config();
const express = require("express");
const cors = require("cors");

const testRoutes = require("./routes/test.route");
const authRoutes = require("./routes/auth.route");
const productRoutes = require("./routes/product.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});