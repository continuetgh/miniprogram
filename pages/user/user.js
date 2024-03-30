import { request } from '../../request/index'

const app = getApp()

Page({
  data: {
   user: {}
  },
  onShow: function(e) {
    const user = wx.getStorageSync('user')
    console.log(user)
    if (user.data.id) {
      request({
        url: '/user/' + user.data.id ,
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
  logout(){
    wx.navigateTo({
      url: '../login/login',
    })
  }

})
