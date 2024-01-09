const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const pool = require("./models/db");
const productsRoutes = require("./routes/Products");

const PORT = process.env.SERVER_PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the URL of your React app
  })
);

app.use("/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}`);
});
