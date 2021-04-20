const express = require("express");
const app = express();

// Middleware utilities
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

// Getting data in json format
app.use(bodyParser.json());

// CORS
app.use(cors());

// Dev Middleware
app.use(morgan("dev"));

// Test Route
app.get("/", async (req, res) => {
  try {
    return res.status(200).json({ success: true, message: "API running!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
});

// Start the server
const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
