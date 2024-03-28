// pages/park/park.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [], // 保存从后端获取的数据的数组
    marker: "marker",
    latitude: "30.873796",
    longitude: "121.899336",
    // polygons:[],
    polygons: [{
      points: [{//这里的数组是你规定的多边形区域，
      //同上所述 你要在map上找到你所要的坐标 进行划分值
        longitude: 118.082771,
        latitude: 24.494959
      },
      {
        longitude: 118.061142,
        latitude: 24.486836
      }, {
        longitude: 118.082771,
        latitude: 24.494959
      }],
      fillColor: "#F2D7BC99",//这里面设置透明度 后面加数字代表透明度
      strokeColor: "#FFF",
      strokeWidth: 2,
      zIndex: 1
    }],
    points: [],// 存放点击的坐标
    markerArray: [
    ],
    option1: [
      { text: '楼宇', value: 0 },
      { text: '行政楼', value: 1 },
      { text: '工训楼', value: 2 },
      { text: '海洋楼', value: 3 },
      { text: '信息楼', value: 4 },
    ],
    option2: [
      { text: '停车位', value: 'a' },
      { text: '1号停车位', value: 'b' },
      { text: '2号停车位', value: 'c' },
      { text: '3号停车位', value: 'd' },
      { text: '4号停车位', value: 'e' },
    ],
    value1: 0,
    value2: 'a',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 在页面加载时调用后端接口，获取数据
    this.fetchData();
  },
  fetchData: function () {
    const that = this;
    // 调用后端接口获取数据
    wx.request({
      url: 'http://localhost:9090/park', // 替换为实际的后端接口地址
      method:'GET',
      header: { 'Content-Type': 'application/json'},  
      success: function (res) {
        // 接口调用成功，将返回的数据保存在数组中
        that.setData({
          itemList:res.data
        });
      },
      fail(err) {
        console.error('获取数据失败', err);
      }
    });
  },
  bindtap: function (e) {
    var markerArray = this.data.markerArray
    var points = this.data.points
    var point = e.detail
    points.push(point)
    markerArray.push({
      id:Number(new Date()),
      longitude: point.longitude,
      latitude: point.latitude,
      width:30,
      height:30,
      iconPath: '../static/image/marker.jpeg',
    })
    if (markerArray.length < 5) {
      this.setData({
        points: points,
        polygons: [{
          points: this.data.points,
          fillColor: "#F2D7BC99",//这里面设置透明度 后面加数字代表透明度
          strokeColor: "#FFF",
          strokeWidth: 2,
          zIndex: 1
        }],
        markerArray:markerArray
      })
      console.log(this.data);
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '车位查询',
    });
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