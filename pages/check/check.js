// pages/check/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'res.img',
    base64imgurl:null,
    name_num:'',
    names:[],
    name_and_nums:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
wx.navigateTo({
       url: '违规检测',
    })
  },
  chooseimg:function(){
    var that = this
    //选择图片
    wx.chooseImage({
      count:1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success(res){
        //tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({avatarUrl:tempFilePaths[0]})
        console.log(tempFilePaths[0])
        wx.setStorage({key:'img_path',data:tempFilePaths[0]})
      }
    })
  },
  submitimg: function(){
    var img_path
    var that
    wx.getImageInfo({
          src: img_path,
          success(res){
          imgtype = res.type
          console.log(imgtype)
      }
    })
    wx.uploadFile({
          filePath: img_path,
          name: 'image',
          url: '服务器地址',
          // 上传成功！
          success(res){
            console.log(res)
            var img_data =  JSON.parse(res.data).data.image
            var base64str_img = 'data:image/' + imgtype + ';base64,' + img_data
            that.setData({avatarUrl: base64str_img})
          },
          // 上传失败
          fail(){
          console.log('--failed--')
          }
        })
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