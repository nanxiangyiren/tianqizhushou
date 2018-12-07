// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'nav':[
      {
        'text':'全部',
        'type':1
      },
      {
        'text': '视频',
        'type': 41
      },
      {
        'text': '图片',
        'type': 10
      },
      {
        'text': '段子',
        'type': 29
      },
      {
        'text': '声音',
        'type': 31
      },
    ],
    dataList:[],
    currentItem:0,
    currentType:1,
    page:1,
    sx:false
  },
 
  navchange:function(e)
  {
    var index = e.target.dataset.itemnumber;
    var type = this.data.nav[index].type; 
    this.setData({
      dataList: [],
      currentItem: index,
      currentType: type
    });
    this.getData(); 
  },

  tstart:function(e)
  {
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
    this.setData({
      ox:x,
      oy:y
    })
  },

  tmove:function(e)
  {
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
    this.setData({
      nx:x,
      ny:y
    });
  },

  tend:function()
  {
    var index = this.data.currentItem;
    var x = this.data.nx - this.data.ox;
    if(x>0)
    {
      if (index > 0) {
        index--;
      }
    }
    if(x<0)
    {

      if (index < this.data.nav.length - 1) {
        index++;
      }      
    }
       var type = this.data.nav[index].type;
       
        this.setData({
        dataList: [],
        currentItem: index,
        currentType: type,
        ox:0,
        oy:0
      });
      this.getData();   
  },


  getData:function()
  {
    wx.showLoading({
      title: 'loading....'
    });
    var that = this;
    if(this.data.sx==false)
    {
      wx.request({
        url: 'http://api.budejie.com/api/api_open.php?a=list&c=data&type=' + this.data.currentType + '&page=' + this.data.page + '&maxtime=' + this.data.maxtime,
        success: function (res) {
          var maxtime = res.data.info.maxtime;
          that.setData({
            dataList: that.data.dataList.concat(res.data.list),
            maxtime: maxtime
          });
        },
      })
    }
    else
    {
        wx.request({
          url: 'http://api.budejie.com/api/api_open.php?a=list&c=data&type=' + this.data.currentType + '&page=' + this.data.page,
          success: function (res) {
            var maxtime = res.data.info.maxtime;
            that.setData({
              dataList: res.data.list,
            });
          },
        })      
    }
    wx.hideLoading();
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url:    'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=194567533&uin=1073935678&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1539766524959',
      success: function(res) {
        that.setData({
          'slider' : res.data.data.slider
        });
      },
    });
    this.getData();
  },
 
  showpinlun:function(e)
  {
    wx.reLaunch({
      url: '../recommend/recommend?id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      sx:true
    });

      this.getData();
    this.setData({
      sx: false
    })    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = this.data.page;
    page++;
    this.setData({
      page:page
    });
    this.getData();

    // 回到顶部
    // wx.pageScrollTo({
    //   scrollTop:0,
    //   duration:200
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})