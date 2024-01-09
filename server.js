const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.SERVER_PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the URL of your React app
  })
);
app.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}`);
});
