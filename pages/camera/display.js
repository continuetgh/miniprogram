// pages/camera/display.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: '', // 照片路径
    photoUrl:'',
  },
  fangda:function(e){
    console.log(e.currentTarget.dataset.url)
    wx.previewImage({
      current:e.currentTarget.dataset.url,
      urls: e.currentTarget.dataset.urls,
      success:(res)=>{
      },
    })
  },

  selectPicture:function(e){
    wx.chooseMedia({
      count:9,
      mediaType:['image','video'],
      sourceType:"album",
      maxDuration:30,
    success:(res)=>{
      let i=0;
      var list=new Array
      for (i;i<res.tempFiles.length;i++){
        list.push(res.tempFiles[i].tempFilePath)
      }
      this.setData({
        lista:list
      })
    }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取拍摄的照片路径
    const photoUrl = options.photoUrl;
    this.setData({
      photoUrl: photoUrl
    });
  },
  //将照片传入python后台服务器指定的文件路径中去
  uploadPhoto: function () {
    wx.chooseImage({
      success (res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://127.0.0.1:5050/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success (res){
            const data = res.data
            wx.showToast({
              title: '上传成功',
              icon:'success',
              duration:3000,
            })
            //do something
          }
        })
      }
    })
  },

  sendToCheck: function () {
    // 获取当前页面显示的图片路径
    const imagePath = this.data.photoUrl;
    if (!imagePath) {
      wx.showToast({
        title: '未找到图片',
        icon: 'none',
        duration: 2000
      });
      return;
    }
  
    wx.uploadFile({
      url: 'http://127.0.0.1:5000/detect-parking',
      method: 'post',
      filePath: imagePath,
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        console.log(res.data); // 上传成功后返回的数据，即检测结果
        var detectionResult = JSON.parse(res.data);
        if (detectionResult.objects && detectionResult.objects.length > 0) {
          // 如果 detectionResult.objects 存在且不为空数组，则调用 join 方法
          wx.showToast({
            title: '检测结果：' + detectionResult.objects.join(', '),
            icon: 'success',
            duration: 3000
          });
        } else {
          // 如果 detectionResult.objects 不存在或为空数组，则提示检测结果为空
          wx.showToast({
            title: '未检测到任何物体',
            icon: 'none',
            duration: 3000
          });
        }
      },
      fail: function (err) {
        console.error('上传失败', err);
        wx.showToast({
          title: '上传失败，请重试',
          icon: 'none',
          duration: 3000
        });
      }
    });
  },  
  saveToLocal: function () {
    // 实现保存照片到本地的逻辑
    // 通过 wx.saveImageToPhotosAlbum 实现
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: '违规检测',
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 从本地缓存中获取照片数据
    var photoData = wx.getStorageSync('photoData');
    if (photoData) {
      // 如果获取到照片数据，则显示照片
      this.setData({
        photoSrc: photoData
      });
    }
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