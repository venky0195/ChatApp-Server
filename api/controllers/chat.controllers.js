const chatServices = require("../services/chat.services");

module.exports.addMessage = (req, callback) => {
  chatServices.addMessage(req, (err, data) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, data);
    }
  });
};
module.exports.getAllUserChats = (req, res) => {
  var responseResult = {};
  chatServices.getAllUserChats((err, result) => {
    if (err) {
      responseResult.success = false;
      responseResult.error = err;
      res.status(500).send(responseResult);
    } else {
      responseResult.success = true;
      responseResult.result = result;
      res.status(200).send(responseResult);
    }
  });
};
