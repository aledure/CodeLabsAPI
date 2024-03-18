const express = require("express");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
