// Import API routers
const router = require("../Server/api/routes/router");
// Import express
const express = require("express");
// Import Body parser
var bodyParser = require("body-parser");

const chatControllers = require("./api/controllers/chat.controllers");

// create express app
const app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//To perform validations
var expressValidator = require("express-validator");
app.use(expressValidator());

// Configuring the database
const databaseConfig = require("../Server/configuration/database.configuration");
require("dotenv").config();
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
    console.log("Could not connect to the database.", err);
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
const server = app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

const io = require("socket.io").listen(server);
console.log("socket is working");
io.sockets.on("connection", function(socket) {
  connections = [];
  connections.push(socket);
  console.log("user connected");
  socket.on("new_msg", function(req) {
    chatControllers.addMessage(req, (err, result) => {
      if (err) {
        console.log("error on server while receiving data");
      }
      io.emit(req.recieverId, result);
      io.emit(req.senderId, result);
    });
  });
});
/**
 * socket Disconnect
 **/
io.on("disconnect", function(data) {
  connections.splice(connections.indexOf(socket), 1);
  console.log("user disconnected");
});
module.exports = app;
