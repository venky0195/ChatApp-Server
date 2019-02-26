// Import API routers
const router = require("../Server/api/routes/router");
// Import express
const express = require("express");
// Import Body parser
var bodyParser = require("body-parser");
// create express app
const app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//To perform validations
var expressValidator = require('express-validator')
app.use(expressValidator());

// Configuring the database
const databaseConfig = require("../Server/configuration/database.configuration");
require('dotenv').config();
// Import Mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(databaseConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

require("http").createServer(app);
app.use("/", router);

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Chat App"
  });
});

// listen for requests
app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
module.exports = app;
