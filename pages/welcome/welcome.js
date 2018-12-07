Page({

  /**
   * 页面的初始数据
   */
  data: {
    "name": 'a'
  },


  begin:function()
  {
    wx.switchTab({
      url: '../index/index'
    })
  }

})