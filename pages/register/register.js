Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameInput: '', // 初始化一个空字符串来存储输入的名字  
    identityInput: '', // 身份证号
    typeInput: '', // 车辆类型
    carnumberInput: '' // 车牌号
  },
 // 从输入界面获取数据
 setname: function (e) {
  this.setData({ nameInput: e.detail.value })
},
setidentity: function (e) {
  // 获取用户输入的身份证号
  const identityInput = e.detail.value;
  
  // 定义身份证号的正则表达式，匹配18位数字
  const reg = /^\d{18}$/;

  // 验证输入是否满足正则表达式
  if (reg.test(identityInput)) {
    // 如果验证通过，更新数据
    this.setData({ identityInput: identityInput });
  } else {
    // 如果验证不通过，提示用户重新输入
    wx.showToast({
      title: '请输入正确的18位身份证号',
      icon: 'none',
      duration: 2000
    });
  }
},

settype: function (e) {
  this.setData({ typeInput: e.detail.value })
},
setcarnumber: function (e) {
  this.setData({ carnumberInput: e.detail.value })
},
  send:function(e){
    console.log('我被点击了')
    //对提交的数据进行验证
    // 获取表单数据
    var v1 = this.data.nameInput;
    var v2 = this.data.identityInput;
    var v3 = this.data.typeInput;
    var v4 = this.data.carnumberInput;
    //验证后，把数据提交到数据库
    if(v1 === '' || v2 === '' || v3 === '' || v4 === ''){
      wx.showToast({
        title: '请填写完整',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.request({
      url: 'http://localhost:9090/register',
      method: 'POST',
      data: {
        name: v1,
        identity: v2,
        type: v3,
        carnumber: v4
      },
      success: function (res) {
        console.log('表单提交成功', res);
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function (err) {
        console.error('表单提交失败', err);
        wx.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  // 重置表单数据
  reset: function (e) {
    this.setData({
      nameInput: ' ',
      identityInput: ' ',
      typeInput: ' ',
      carnumberInput: ' '
    });
    // 清空输入框的值
  var that = this;
  wx.createSelectorQuery().in(this).selectAll('.weui-input').fields({
    dataset: true,
    node: true,
    size: true,
    rect: true
  }).exec(function (res) {
    res[0].forEach(function (node) {
      that.setData({ [node.dataset.name]: '' }); // 将输入框的值清空
    });
  });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: '车辆登记',
    })
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