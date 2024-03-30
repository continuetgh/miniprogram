// pages/localcheck/localcheck.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: '', // 用于存储图片路径
    photoUrl:'',
    detectionResults:'',

  },
  /**
   * 生命周期函数--监听页面加载
   */
  selectPicture:function(e){
    wx.chooseMedia({
      count:1, // 设置 count 为 1，表示只能选择一张图片
      mediaType:['image'], // 仅选择图片
      sourceType:"album",
      maxDuration:30,
      success:(res)=>{
        const tempFilePath = res.tempFiles[0].tempFilePath;
        this.setData({
          photoUrl: tempFilePath // 将选中的图片路径设置到 photoUrl 中
        });
      }
    });
  },
  
  fangda:function(e){
    console.log(this.data.photoUrl); // 打印图片路径，确认是否正确
    wx.previewImage({
      current: this.data.photoUrl, // 使用 photoUrl
      urls: [this.data.photoUrl], // 将图片路径放入数组中，这里只有一张图片
      success:(res)=>{
      },
    });
  },
  chooseImage: function () {
    const that = this;
    wx.chooseImage({
      success: function (res) {
        const tempFilePaths = res.tempFilePaths[0];
        that.setData({
          tempFilePaths: tempFilePaths // 将图片路径存储到 data 中
        });
        const ctx = wx.createCanvasContext('myCanvas');
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
      success: (res) => {
        console.log(res.data); // 上传成功后返回的数据，即检测结果
        const detectionResults = JSON.parse(res.data);
      
        let title = '结果：';
        if (detectionResults && detectionResults.length > 0) {
          const objectStatuses = detectionResults.map(result => result.status);
          title += objectStatuses.join(', ');
        } else {
          title += '未检测到任何物体';
        }
      
        wx.showToast({
          title: title,
          icon: detectionResults && detectionResults.length > 0 ? 'success' : 'none',
          duration: 10000
        });
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
  // sendToCheck: function () {
  //   const imagePath = this.data.tempFilePaths;
  //   if (!imagePath) {
  //     wx.showToast({
  //       title: '未找到图片',
  //       icon: 'none',
  //       duration: 2000
  //     });
  //     return;
  //   }
  //   wx.canvasToTempFilePath({
  //     canvasId: 'myCanvas',
  //     success: function (res) {
  //       const tempFilePath = res.tempFilePath; // 获取导出的图片临时路径
  //       wx.uploadFile({
  //         url: 'http://127.0.0.1:5000/detect-parking',
  //         filePath: tempFilePath,
  //         name: 'file',
  //         formData: {
  //           'user': 'test'
  //         },
  //         success: function (res) {
  //           console.log(res.data); // 上传成功后返回的数据，即检测结果
  //           var detectionResult = JSON.parse(res.data);
  //           if (detectionResult.objects && detectionResult.objects.length > 0) {
  //             wx.showToast({
  //               title: '检测结果：' + detectionResult.objects.join(', '),
  //               icon: 'success',
  //               duration: 3000
  //             });
  //           } else {
  //             wx.showToast({
  //               title: '未检测到任何物体',
  //               icon: 'none',
  //               duration: 3000
  //             });
  //           }
  //         },
  //         fail: function (err) {
  //           console.error('上传失败', err);
  //           wx.showToast({
  //             title: '上传失败，请重试',
  //             icon: 'none',
  //             duration: 3000
  //           });
  //         }
  //       });
  //     },
  //     fail: function (err) {
  //       console.error('导出图片失败', err);
  //       wx.showToast({
  //         title: '导出图片失败，请重试',
  //         icon: 'none',
  //         duration: 3000
  //       });
  //     },
  //     complete: function() {
  //       // 完成导出操作后的回调
  //     }
  //   });
  // },
  onLoad(options) {

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