  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const date = new Date();

const MessageSchema = Schema({
  sender:{
    type: String,
    required: true,
    },
  reciever: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("message", MessageSchema);