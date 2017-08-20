
var app = getApp();
Page({
  data: {
    userInfo: {},
    friendInfo: null,
    msgList: [],

    inputValue: null
  },
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    console.log('------------------------------------');
    console.log(app.globalData.userInfo);
    console.log('------------------------------------');
    console.log('------------------------------------');
    console.log(this.data.myInfo);
    console.log('------------------------------------');
    // 生命周期函数--监听页面加载
    this.setData({
      friendInfo: {
        name: options.name,
        // name:'Devin',
        avatar: options.avatar
      }
    });
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    this.getMsgList();
  },

  inputMsg: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  clearInput: function () {
    this.setData({
      inputValue: ''
    })
  },
  send: function () {
    var that = this;
    if (that.data.msgList) {
      that.sendMsg(that.clearInput);
    } else {
      that.addNewChatList(that.clearInput);
    }
  },
  // 请求后端接口
  getMsgList: function (callback) {
    let that = this;
    wx.request({
      url: `http://localhost:8082/api/chatList?name=${that.data.friendInfo.name}`,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          that.setData({
            msgList: res.data.list
          })
        }
        callback && callback();
      }
    })
  },
  sendMsg: function (callback) {
    let that = this;
    wx.request({
      url: `http://localhost:8082/api/sendMsg`,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        friend: that.data.friendInfo.name,
        sender: that.data.userInfo.nickName,
        msg: that.data.inputValue
      },
      success: function (res) {
        if (res.data) {
          that.setData({
            msgList: res.data.list
          })
        }
        that.getMsgList();

        callback && callback();
      }
    })
  },
  addNewChatList: function (callback) {
    let that = this;
    wx.request({
      url: `http://localhost:8082/api/addNewChatList`,
      data: {
        friend: that.data.friendInfo.name,
        sender: that.data.userInfo.nickName,
        msg: that.data.inputValue
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log('------------------------------------');
        console.log(res.data);
        console.log('------------------------------------');
        if (res.data) {
          that.setData({
            msgList: res.data.list
          })
        }

        that.getMsgList();
        callback && callback();
      }
    })
  },
  // onShow:function(){
  //   // 生命周期函数--监听页面显示
  //   String4
  // },
  // onHide:function(){
  //   // 生命周期函数--监听页面隐藏
  //   String5
  // },
  // onUnload:function(){
  //   // 生命周期函数--监听页面卸载
  //   String6
  // },
  // onPullDownRefresh: function() {
  //   // 页面相关事件处理函数--监听用户下拉动作
  //   String7
  // },
  // onReachBottom: function() {
  //   // 页面上拉触底事件的处理函数
  //   String8
  // },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})
