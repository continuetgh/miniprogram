// pages/camera/camera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // takePhoto: function () {
  //   const ctx = wx.createCameraContext(); // 创建相机上下文对象
  //   ctx.takePhoto({
  //     quality: 'high',
  //     success: (res) => {
  //       // 将拍摄的照片保存到本地
  //       wx.setStorageSync('tempImagePath', res.tempImagePath);
  //       // 跳转到显示照片的页面
  //       wx.navigateTo({
  //         url: '/pages/display/display',
  //       });
  //     }
  //   });
  // },
  takePhoto() {
    const ctx = wx.createCameraContext();
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        // 拍照成功后的处理逻辑
        const tempImagePath = res.tempImagePath;
        // 保存照片到本地
        wx.saveImageToPhotosAlbum({
          filePath: tempImagePath,
          success: (result) => {
            // 在保存成功后跳转到另一个页面，并携带照片路径参数
            wx.navigateTo({
              url: '/pages/camera/display?photoUrl=' + tempImagePath,
            });
          },
        });
      },
      fail: (error) => {
        console.log(error);
      }
    });
  },
  tolocal:function(){
    wx.navigateTo({
      url: '/pages/localcheck/localcheck',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  onUnload() {
    // 在页面卸载时关闭摄像头
    cameraContext.stop();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})