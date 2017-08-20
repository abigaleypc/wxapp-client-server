Page({
  data:{
    friends:[]
  },
  onLoad:function(options){
  
  },
  onReady:function () {
    let that = this;
    wx.request({
      url: 'http://localhost:8082/api/userlist', 
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
          friends:res.data
        });
      }
    })
  },
  // onReady:function(){
  //   // 生命周期函数--监听页面初次渲染完成
  //   String3
  // },
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
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})
