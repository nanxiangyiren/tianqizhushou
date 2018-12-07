// pages/me/me.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
      musicList:
      [
        {
            url:'http://dl.stream.qqmusic.qq.com/C400003lwEQC0M0N73.m4a?guid=4406759152&vkey=3C38A4DA902BAD3BB9EC41F1092510EE730333BEEA3B813633AC1B610ADB71B4A0C3ED2A757506CD8FD0978E5DE33CB5D3DF1EBBE18A0DF9&uin=5438&fromtag=66',
            name:"1"
        },
          {
            url: 'http://219.135.57.146/amobile.music.tc.qq.com/C400000CyaCn2GDgrf.m4a?guid=4406759152&vkey=D08D22CAFC3CE964CC4273A3659CBE126231CEDA8DCEAF65789AE77A9F5853760EE7A08467DE6A68E3834F3521D64D1D996FB7ED5F40D3D0&uin=5438&fromtag=66',
            name: "2"
          },
          {
            url: 'http://219.135.57.146/amobile.music.tc.qq.com/C400000QbF6Z0PRYlV.m4a?guid=4406759152&vkey=922A5B3DA83A9CE7D63D40934FBBEA19453E0B927D828912758C5809BFF93D93AE73E0F105BD3AE2E9C3F3852286897AE889F4D5C7309AB3&uin=5438&fromtag=66',
            name: "3"
          }          
      ],
      index:0,
      play:false,
      bt:15
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
      url: 'https://api.budejie.com/api/api_open.php?a=square&c=topic',
      success:function(res)
      {
        var l = res.data.square_list.length;
        that.setData({
          dataList: res.data.square_list.splice(0,16),
          moreList: res.data.square_list
        })
      }
     
    });


    wx.playBackgroundAudio({
      dataUrl:this.data.musicList[this.data.index].url,
      title: this.data.musicList[this.data.index].name,
      success:function()
      {
        that.setData({
          play:true,
        })
      }
    });

    wx.onBackgroundAudioPlay(function(){
      that.setData({
        play:true
      })
    });
    wx.onBackgroundAudioPause(function(){
      that.setData({
        play: false
      })      
    });
    wx.hideLoading();
  },

  showmore:function()
  {
    console.log(1);
    this.setData({
      dataList: this.data.dataList.concat(this.data.moreList),
      moreList:[]
    })
  },

  changeMusic:function()
  {
    var that = this;
    var oldindex = this.data.index;
    var newindex = Math.floor(Math.random()*this.data.musicList.length);
    console.log(newindex)
    if(oldindex==newindex)
    {
      this.changeMusic();
    }
    else
    {
      this.setData({
        index : newindex
      });
      wx.playBackgroundAudio({
        dataUrl: this.data.musicList[this.data.index].url,
        title: this.data.musicList[this.data.index].name,
        success: function () {
          that.setData({
            play: true,
          })
          wx.playBackgroundAudio();
        }
      }); 
      return;     
    }
  },

  changeMusicState:function()
  {
    this.setData({
      play:!this.data.play
    })
    if(this.data.play)
    {
      wx.playBackgroundAudio()
    }
    else
    {
      wx.pauseBackgroundAudio()
    }

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