import { request } from '../../request/index'

const app = getApp()

Page({
  data: {
   user: {},
  },
  logout(){
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/login/login',
      });
    }, 1000);
    
  },
  onShow: function(e) {
    const user = wx.getStorageSync('user')
    if (user.id) {
      request({
        url: '/user/' + user.id ,
        method: 'GET'
      }).then(res => {
        this.setData({
          user: res
        })
      })
    } else {
      wx.switchTab({
        url: '../login/login',
      })
    }
  },
  getHeight:function(e){
    var winWid = wx.getSystemInfoSync().windowWidth - 2*100;//获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;
    var sH = winWid * imgh / imgw + "px"
    this.setData({
      swiperH: sH
    })
  },
  //swiper滑动事件
  swiperChange:function(e){
    this.setData({
      nowIdx: e.detail.current
    })
  }
})
