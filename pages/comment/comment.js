// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftList:[],
    rightList:[],
    currentId:0,
    currentPage:0,
    more:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showLoading({
      title: 'loading',
    });
    var that = this;
    wx.request({
      url: 'https://api.budejie.com/api/api_open.php?a=category&c=subscribe',
      success:function(res)
      {
        that.setData({
          leftList: res.data.list,
          currentId: res.data.list[0].id,
          currentPage: 1
        })
        that.getRightList();
      }
    })
    
    wx.hideLoading();
    
  },

  getRightList:function()
  {
    wx.showLoading({
      title: 'loading',
    })
    var that = this;
    wx.request({
      url: 'http://api.budejie.com/api/api_open.php?a=list&c=subscribe&category_id='+this.data.currentId,
      success:function(res)
      {
        that.setData({
          rightList: res.data.list
        })
      }
    })

    wx.hideLoading();
  },

  changeNav:function(e)
  {
    this.setData({
      currentId: e.target.dataset.id,
      currentPage:0
    });
    this.getRightList();
  },

  showmore:function()
  {
    wx.showLoading({
      title: 'loading',
    })
    var that = this;
    this.setData({
      currentPage: this.data.currentPage+1
    });
    wx.request({
      url: 'https://api.budejie.com/api/api_open.php?a=list&c=subscribe&category_id=' + this.data.currentId + '&page=' + this.data.currentPage,
      success: function (res) {
        if(res.data.list.length)
        {
          that.setData({
            rightList: that.data.rightList.concat(res.data.list)
          })
        } 
        else
        {
          that.setData({
            more: true
          });
          setTimeout(function(){
            that.setData({
              more:false
            })
          },2000);
        }

      }
    })
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})