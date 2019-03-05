const chatModel = require("../model/chat.model");

exports.addMessage = (req, callback) => {
  chatModel.addMessage(req, (err, result) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, result);
    }
  });
};
exports.getAllUserChats = (req, callback) => {
  chatModel.getAllUserChats(req, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};
