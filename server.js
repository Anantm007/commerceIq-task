const express = require("express");
const app = express();

// Middleware utilities
const fs = require("fs");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

// Getting data in json format
app.use(bodyParser.json());

// CORS
app.use(cors());

// Dev Middleware for keeping a record of logs
app.use(
  morgan("common", {
    stream: fs.createWriteStream("./history.log", { flags: "a" }),
  })
);

app.use(morgan("dev"));

// Test Route
app.get("/api", async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message:
        "API running! You can check out the documentation at ___ for all the details.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
});

// Home route, redirecting to /api
app.get("/", async (req, res) => {
  return res.redirect("/api");
});

// Mounting the routes
app.use("/api", require("./routes"));

// Start the server
const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
