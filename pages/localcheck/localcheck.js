// pages/localcheck/localcheck.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: '' // 用于存储图片路径
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // selectPicture:function(e){
  //   wx.chooseMedia({
  //     count:9,
  //     mediaType:['image','video'],
  //     sourceType:"album",
  //     maxDuration:30,
  //   success:(res)=>{
  //     let i=0;
  //     var list=new Array
  //     for (i;i<res.tempFiles.length;i++){
  //       list.push(res.tempFiles[i].tempFilePath)
  //     }
  //     this.setData({
  //       lista:list
  //     })
  //   }
  //   })
  // },
  // fangda:function(e){
  //   console.log(e.currentTarget.dataset.url)
  //   wx.previewImage({
  //     current:e.currentTarget.dataset.url,
  //     urls: e.currentTarget.dataset.urls,
  //     success:(res)=>{
  //     },
  //   })
  // },
  chooseImage: function () {
    const that = this;
    wx.chooseImage()()({
      count:1,
      mediaType:['image', 'video'],
      sourceType:['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths[0];
        that.setData({
          tempFilePaths: tempFilePaths // 将图片路径存储到 data 中
        });
        const ctx = canvas.getContext('2d')
        ctx.drawImage(tempFilePaths, 50, 50, 300, 300,function(){
          that.sendToCheck();
        }); // 绘制图片到 Canvas 上
        setTimeout(() => {ctx.draw(false,setTimeout(()=>{
          wx.canvasToTempFilePath({
            canvasId:this.cid,
            success: (res) => {
              console.log('filepath',res.tempFilePath);
              ctx.draw();
            }
          },this)
        },300)
        )},200)
      }
    });
  },
  sendToCheck: function () {
    const imagePath = this.data.tempFilePaths;
    if (!imagePath) {
      wx.showToast({
        title: '未找到图片',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {
        const tempFilePath = res.tempFilePath; // 获取导出的图片临时路径
        wx.uploadFile({
          url: 'http://127.0.0.1:5000/detect-parking',
          filePath: tempFilePath,
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            console.log(res.data); // 上传成功后返回的数据，即检测结果
            var detectionResult = JSON.parse(res.data);
            if (detectionResult.objects && detectionResult.objects.length > 0) {
              wx.showToast({
                title: '检测结果：' + detectionResult.objects.join(', '),
                icon: 'success',
                duration: 3000
              });
            } else {
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
      fail: function (err) {
        console.error('导出图片失败', err);
        wx.showToast({
          title: '导出图片失败，请重试',
          icon: 'none',
          duration: 3000
        });
      },
      complete: function() {
        // 完成导出操作后的回调
      }
    });
  },
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady() {
  //   const query = wx.createSelectorQuery()
  //   query.select('#myCanvas')
  //     .fields({ node: true, size: true })
  //     .exec((res) => {
  //       const canvas = res[0].node
  //       const ctx = canvas.getContext('2d')

  //       const dpr = wx.getSystemInfoSync().pixelRatio
  //       canvas.width = res[0].width * dpr
  //       canvas.height = res[0].height * dpr
  //       ctx.scale(dpr, dpr)

  //       ctx.fillRect(0, 0, 100, 100)
  //     })
  // },

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