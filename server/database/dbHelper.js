
// const mongoose = require('mongoose');


/**
 * addData 
 * @param model 需要操作的模型
 * @param conditions 需要操作的条件
 * @param callback 回调方法
 */
function addData(model, conditions) {
  return new Promise((resolve, reject) => {
    (new model(conditions)).save(err => {
      if (err) {
        console.log({ flag: err });
        reject(err)
      } else {
        resolve(`${JSON.stringify(conditions)} save data success`)
      }
    })
  })
}

/**
 * updateData
 * @param model 需要操作的模型
 * @param conditions 需要操作的条件
 */
function updateData(model, conditions, value) {
  console.log('---------------UPDATEDATA-----------');
  console.log('conditions', conditions);
  console.log('value', value);
  console.log('------------------------------------');
  return new Promise((resolve, reject) => {
    model.update(conditions, { $push: { list: value}}, {safe: true, upsert: true}, (err, data) => {
      if (err) {
        console.log('------------------------------------');
        console.log(err);
        reject(err)
        console.log('------------------------------------');
      } else {
        console.log('------------------------------------');
        console.log(data);
        console.log('------------------------------------');
        resolve(data);
      }
    });
  })
}

/**
 * findData 查找数据
 * 
 * @param {any} params 
 */
function findData(model, fileds = []) {
  return new Promise((resolve, reject) => {
    model.find().select(fileds.join(' ')).exec((err, data) => {
      if (err) {
        console.log('--------------ERROR-----------------');
        console.log(err);
        console.log('------------------------------------');
        reject(err);
      }
      resolve(data);
    })
  })
}


/**
 * findData 查找数据
 * 
 * @param {any} params 
 */
function findDataByCondition(model, conditions) {
  return new Promise((resolve, reject) => {
    console.log('------------------------------------');
    console.log('conditions');
    console.log(conditions);
    console.log('------------------------------------');
    model.findOne(conditions).exec((err, data) => {
      if (err) {
        console.log('--------------ERROR-----------------');
        console.log(err);
        console.log('------------------------------------');
        reject(err);
      }
      resolve(data);
    })
  })
}


module.exports.addData = addData;
module.exports.findData = findData;
module.exports.findDataByCondition = findDataByCondition;
module.exports.updateData = updateData;
