mongoose = require("mongoose");
/**
 * create instance of Schema
 **/
var mongoSchema = mongoose.Schema;
/**
 * create schema
 **/
var chatSchema = new mongoSchema(
  {
    senderId: {
      type: String,
      required: [true, "Sender Id is required"]
    },
    recieverId: {
      type: String,
      required: [true, "Reciever Id is required"]
    },
    message: {
      type: String,
      required: [true, " Message is required "]
    }
  },
  {
    timestamps: true
  }
);
function chatModel() {}
var chat = mongoose.model("chatInfo", chatSchema);

/**
 * store messages into the database
 */
chatModel.prototype.addMessage = (chatData, callback) => {
  console.log("chatData model-->", chatData);
  const newMsg = new chat({
    senderId: chatData.senderId,
    recieverId: chatData.recieverId,
    message: chatData.message
  });
  newMsg.save((err, result) => {
    if (err) {
      console.log("Error while saving the message");
      return callback(err);
    } else {
      console.log("message saved successfully");
      return callback(null, result);
    }
  });
};
chatModel.prototype.getAllUserChats = callback => {
  chat.find({}, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};
module.exports = new chatModel();
