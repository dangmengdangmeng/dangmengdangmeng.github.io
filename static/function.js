var fun_ = {
  confirm_modal: function(tit, cont, is_show, fun) {
    wx.showModal({
      title: tit,
      content: cont,
      showCancel: is_show,
      confirmColor: "#1AAD19",
      success: res => {
        if (fun) {
          fun(res);
        }
      }
    });
  },
  alert_modal: function (content, title, fun) {
    wx.showModal({
      title: title ? title : '提示',
      content,
      showCancel: false,
      success: res => {
        if (fun) { fun(res) }
      }
    })
  },
  toast:function(tit,icon){
    wx.showToast({
      title: tit?tit:'成功',
      icon: icon?icon:'success',
      duration: 1000
    })
  },
  loading: function(tit,mask) {
    wx.showToast({
      title: tit?tit:'加载中...',
      icon: 'loading',
      duration: 10000,
      mask:mask?mask:false,
    })
  },
  hide_loading: function() {
    wx.hideToast();
  }
};
module.exports = {
  fun_
};
