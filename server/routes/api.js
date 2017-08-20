var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');
var secret = require('../config/secret');

// DB
const mongoose = require('mongoose');
const { DBconnect } = require('../database/DBConnect');
const User = require('../database/User')
const ChatList = require('../database/ChatList')

// redis
const redis = require('redis');
redisStore = redis.createClient();

var WXBizDataCrypt = require('../config/WXBizDataCrypt');

DBconnect();

// 功能:生成第三方session，并根据code获取session_key并存在内存中
router.get('/authorization', function (req, res, next) {
  // 获取session_key expires_in openid 并 返回解密后的数据

  request.get({
    uri: 'https://api.weixin.qq.com/sns/jscode2session',
    json: true,
    qs: {
      grant_type: 'authorization_code',
      appid: config.appId,
      secret: config.appSecret,
      js_code: req.query.code
    }
  }, (err, response, data) => {
    if (response.statusCode === 200) {
      //TODO: 生成一个唯一字符串sessionid作为键，将openid和session_key作为值，存入redis，超时时间设置为2小时
      let secretValue = {
        openid: data.openid,
        session_key: data.session_key
      }
      redisStore.set(secret.SECRET, JSON.stringify(secretValue), 'EX', data.expires_in);
    } else {
      // console.log("[error]", err)
      res.json(err)
    }
  })
  res.send({
    wxtoken: secret.SECRET
  })
})

// 根据传过来的第三方session在内存获取session_key去微信获取加密信息
router.get('/encryptData', function (req, res, next) {

  // 先判断redis里的 session_key expires_in openid 是否匹配或者未过期
  let session_key = null;
  let token = req.query.token;
  redisStore.get(token, function (err, value) {

    session_key = JSON.parse(value).session_key;
    var pc = new WXBizDataCrypt(config.appId, session_key);
    // decrypt_data为解密后的信息
    var decrypt_data = pc.decryptData(req.query.encryptedData, req.query.iv);
    let params = {
      name: decrypt_data.nickName,
      avatarUrl: decrypt_data.avatarUrl
    }
    User.addData(params)
      .then(() => {
        res.json({ errCode: 0, msg: 'saved' });
      })
      .catch((err) => {
        res.json({ errCode: err.code, msg: err.error });
      })
    res.send({
      msg: '解密成功'
    })
  })

})



router.post('/msg', (req, res, next) => {
  let { users, sender, msg } = req.body;
  users = users.split(',');

  UserMsg.addData({ users, sender, msg })
    .then(() => {
      res.json({ errCode: 0, msg: 'saved' });
    })
    .catch((err) => {
      res.json({ errCode: err.code, msg: err.error });
    })
});

router.post('/adduser', (req, res, next) => {
  let { name, avatarUrl } = req.body;

  User.addData({ name, avatarUrl })
    .then(() => {
      res.json({ errCode: 0, msg: 'saved' });
    })
    .catch((err) => {
      res.json({ errCode: err.code, msg: err.error });
    })
});

// 获取好友列表
router.get('/userlist', (req, res, next) => {
  User.findData(['_id', 'name', 'avatarUrl'])
    .then((data) => {
      console.log('-----------Succesfully--------------');
      console.log(data);
      console.log('------------------------------------');
      res.json(data)
    })
    .catch((err) => {
      console.log('----------------ERROR---------------');
      console.log(err);
      console.log('------------------------------------');
      res.json(err)
    })
})

// 查找某位好友
router.get('/chatList', (req, res, next) => {
  var { name } = req.query;
  ChatList.findDataByCondition({ friend: name })
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log('----------------ERROR---------------');
      console.log(err);
      console.log('------------------------------------');
      res.json(err)
    })
})


//  新好友，添加
router.post('/addNewChatList', (req, res, next) => {
  let { friend, sender, msg } = req.body;
  var list = {
    sender,
    msg
  }

  ChatList.addData({ friend, list })
    .then(() => {
      res.json({ errCode: 0, msg: 'saved' });
    })
    .catch((err) => {
      res.json({ errCode: err.code, msg: err.error });
    })
})


// 旧好友 更新
router.post('/sendMsg', (req, res, next) => {
  var { friend, sender, msg } = req.body;
  var conditions = { friend }
  var value = { sender, msg }

  ChatList.updateData(conditions, value)
    .then(() => {
      res.json({ errCode: 0, msg: 'updated' });
    })
    .catch((err) => {
      res.json({ errCode: err.code, msg: err.error });
    })
})



module.exports = router;
