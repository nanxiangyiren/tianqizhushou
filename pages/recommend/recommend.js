var id = '';
var lastcid='';
var total = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    ishot:false,
    currentPage:1,
    hotList:[],
    dataList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (o) {
     var that = this;
      id = o.id;
      wx.showLoading({
        title:'loading....'
      });
      wx.request({
        url: 'http://api.budejie.com/api/api_open.php?a=dataList&c=comment&data_id='+o.id+'hot=1',
        success:function(res)
        {
          var l = res.data.data.length;
          total= res.data.total;
          lastcid = res.data.data[l-1].id;
          if (res.data.hot)
          {
            that.setData({
              hotList: res.data.hot,
              ishot:true
            })            
          }
          that.setData({
            dataList: res.data.data
          })
        }
      })

      wx.hideLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.dataList.length>=total)
    {
      return;
    }
    var that = this;
    this.setData({
      currentPage:this.data.currentPage+1
    })
    console.log(this.data.currentPage)
      wx.request({
        url: 'https://api.budejie.com/api/api_open.php?a=dataList&c=comment&data_id=' + id + '&hot=1&&page=' + this.data.currentPage +'&lastcid='+lastcid,
        success:function(res)
        {
          console.log(res.data);
          if (res.data.hot.length)
          {
            that.setData({
              hotList: that.data.hotList.concat(res.data.hot),
              ishot: true
            }) 
          }
          if (res.data.data.length)
          {
            that.setData({ 
              dataList: that.data.dataList.concat(res.data.data),
            })             
          }
        }
      })
  },


})