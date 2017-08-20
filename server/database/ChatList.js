
const { chatListModel } = require('../database/schema');
const { addData, findDataByCondition, updateData } = require('../database/dbHelper');


var chatList = {
  addData: (conditions) => {
    return addData(chatListModel, conditions);
  },
  findDataByCondition: (conditions) => {
    return findDataByCondition(chatListModel, conditions);
  },
  updateData: (conditions, value) => {
    return updateData(chatListModel, conditions, value);
  },
}

module.exports = chatList;
