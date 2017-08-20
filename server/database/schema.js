const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  _id: Number,
  name: {
    type: String,
    index: true,
    unique: true
  },
  avatarUrl: String
})
var chatListSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  friend: String,
  list: [{
    date: { type: Date, default: Date.now },
    sender: String,
    msg: String
  }],
})

module.exports.UserModel = mongoose.model('user', userSchema);
module.exports.chatListModel = mongoose.model('chatList', chatListSchema);


