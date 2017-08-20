
const { UserModel } = require('../database/schema');
const { addData, findData } = require('../database/dbHelper');

var User = {
  addData: (conditions) => {
    return addData(UserModel, conditions);
  },
  findData: (fields) => {
    return findData(UserModel, fields);
  }
}

module.exports = User;
