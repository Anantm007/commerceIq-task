const express = require("express");
const app = express();

// Middleware utilities
const fs = require("fs");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

// Getting data in json format
app.use(bodyParser.json());

// Dev Middleware for keeping a record of logs
app.use(
  morgan("common", {
    stream: fs.createWriteStream("./history.log", { flags: "a" }),
  })
);
app.use(morgan("dev"));

// CORS
app.use(cors());

// Entry point Route
app.get("/api", async (req, res) => {
  return res.status(200).json({
    success: true,
    message:
      "API running! Please check out the documentation for more details.",
    code: "https://github.com/Anantm007/commerceIq-task",
    README:
      "https://github.com/Anantm007/commerceIq-task/blob/master/README.md",
    Sample_Requests_Collection:
      "https://documenter.getpostman.com/view/7916291/TzJvcbbK",
  });
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
