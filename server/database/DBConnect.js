const mongoose = require('mongoose');

function DBconnect(callback) {
  mongoose.connect('mongodb://127.0.0.1:27017/wxmsg', { useMongoClient: true })
    .then(() => {
      console.log('-----------Succesfully--------------');
      console.log('mongodb connects succesfully! 😆');
      console.log('------------------------------------');
      callback && callback();
    })
    .catch(error => {
      console.log('----------------Error---------------');
      console.log('mongodb connects fail!😈');
      console.log(error);
      console.log('------------------------------------');

    });

}

module.exports.DBconnect = DBconnect;
