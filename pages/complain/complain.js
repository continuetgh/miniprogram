
Page({
  data: {
    locationInput:  "", // 违停位置
    carnumberInput: '', // 车牌号
    descriptionInput:"",//违停情况描述
    imageUrl1: "", // 图片1链接
    imageUrl2: "", // 图片2链接
    imageUrl3: "", // 图片3链接
    imageUrl4: "", // 图片4链接
    fileList: [] // 上传的文件列表
  },
 // 从输入界面获取数据
 setlocation: function (e) {
  this.setData({ locationInput: e.detail.value })
},
setcarnumber: function (e) {
  this.setData({ carnumberInput: e.detail.value })
},
setdescription: function (e) {
  this.setData({ descriptionInput: e.detail.value })
},
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '违停投诉',
    });
  },

  // Uploader 组件的 beforeRead 事件处理函数
  beforeRead(event) {
    const { file, callback } = event.detail;
    callback(file.type === 'image');
  },

  // Uploader 组件的 afterRead 事件处理函数
  afterRead(event) {
    const { file } = event.detail;
    const that = this;
    wx.uploadFile({
      url: 'http://localhost:9090/file/upload', // 上传的接口地址，请替换为实际的上传地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新对应的 imageUrl 和 fileList
        const { fileList } = that.data;
        const imageUrl = res.data; // 假设后台返回的是图片链接
        fileList.push({ ...file, url: imageUrl });
        that.setData({ fileList });
        // 根据 fileList 中图片的顺序，将图片链接分别赋值给 imageUrl1、imageUrl2、imageUrl3、imageUrl4
        fileList.forEach((item, index) => {
          that.setData({
            [`imageUrl${index + 1}`]: item.url
          });
        });
      },
      fail(err) {
        console.error('图片上传失败', err);
        wx.showToast({
          title: '图片上传失败',
          icon: 'none',
          duration:2000
        });
      }
    });
  },
  send:function(e){
    console.log('我被点击了')
    //对提交的数据进行验证
    // 获取表单数据
    var v1 = this.data.locationInput;
    var v2 = this.data.carnumberInput;
    var v3 = this.data.descriptionInput;
    var v4 = this.data.imageUrl1;
    var v5 = this.data.imageUrl2;
    var v6 = this.data.imageUrl3;
    var v7 = this.data.imageUrl4;
    //验证后，把数据提交到数据库
    if(v1 === '' || v2 === '' || v3 === '' ){
      wx.showToast({
        title: '请填写完整',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.request({
      url: 'http://localhost:9090/complain/insert',
      method: 'POST',
      data: {
        location: v1,
        carnumber: v2,
        description: v3,
        image1:v4,
        image2:v5,
        image3:v6,
        image4:v7,
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
      nameInput: '',
      identityInput: '',
      typeInput: '',
      carnumberInput: '',
      fileList: []
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
  tocheck:function(){
    wx.navigateTo({
      url: '/pages/camera/camera',
    })
  },
   // 表单提交事件处理函数
  //  formSubmit: function (e) {
  //   const formData = e.detail.value;
  //   // 检查表单数据是否为空或未定义
  //   if (!formData) {
  //     console.error('Form data is empty or undefined');
  //     return;
  //   }
  //   // 向服务器提交表单数据
  //   wx.request({
  //     url: 'http://localhost:9090/complain', // 替换为实际的提交地址
  //     method: 'POST',
  //     data: formData,
  //     success: function (res) {
  //       console.log('表单提交成功', res);
  //       wx.showToast({
  //         title: '表单提交成功',
  //         icon: 'success',
  //         duration:2000,
  //       });
  //     },
  //     fail: function (err) {
  //       console.error('表单提交失败', err);
  //       wx.showToast({
  //         title: '表单提交失败',
  //         icon: 'none',
  //         duration:2000,
  //       });
  //     }
  //   });
  // },
});
