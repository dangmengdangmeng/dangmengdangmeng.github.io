require("./common/manifest.js")
require("./common/vendor.js")
global.webpackJsonpMpvue([6],{

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__static_css_weui_css__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__static_css_weui_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__static_css_weui_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__static_reset_css__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__static_reset_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__static_reset_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__static_global_css__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__static_global_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__static_global_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_flyio_dist_npm_wx__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_flyio_dist_npm_wx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_flyio_dist_npm_wx__);







var api_config = __webpack_require__(88);
var function_ = __webpack_require__(89);
var fly = new __WEBPACK_IMPORTED_MODULE_6_flyio_dist_npm_wx___default.a();

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.prototype.$api = api_config;
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.prototype.$fun = function_.fun_;
// 将fly封装为全局变量，方便调用
fly.config = {
  method: "get", // 请求方法， GET 、POST ...
  headers: {}, // 请求头
  baseURL: api_config.host, // 请求基地址
  parseJson: true,
  timeout: "10000" // 超时时间
};
fly.interceptors.request.use(function (request) {
  request.headers = app.getCookieHeader();
  request.body = app.getPostData(request.body);
  return request;
});
fly.interceptors.response.use(function (res) {
  app.saveCookie(res.headers);
  if (res.data.state == 1) {
    return res;
  } else if (res.data.state == 0) {
    return app.$fun.alert_modal(res.data.msg);
  }
}, function (err) {
  app.$fun.alert_modal("错误信息：" + err.message + " " + "状态码：" + err.status);
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(err);
});
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.prototype.$http = function (options) {
  return fly.request(options.url, options.data, {
    method: options.method ? options.method : "get"
  });
};

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_2__App__["a" /* default */].mpType = "app";

var app = new __WEBPACK_IMPORTED_MODULE_1_vue___default.a(__WEBPACK_IMPORTED_MODULE_2__App__["a" /* default */]);
app.$mount();
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.prototype.$app = app;

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(83);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(82)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5a7ff3f4", Component.options)
  } else {
    hotAPI.reload("data-v-5a7ff3f4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 82:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  onLaunch: function onLaunch() {
    // var isDebug = true; //调试状态使用本地服务器，非调试状态使用远程服务器
    // if (!isDebug) {
    //   //远程域名
    //   wx.setStorageSync("domainName", "https://sdk.weixin.senparc.com");
    //   wx.setStorageSync("wssDomainName", "wss://sdk.weixin.senparc.com");
    // } else {
    //   //本地测试域名
    //   wx.setStorageSync("domainName", "http://localhost:86");
    //   wx.setStorageSync("wssDomainName", "ws://localhost:86");
    // }
    // 打开调试
    // wx.setEnableDebug({
    //   enableDebug: true
    // });
    //加载初始值
    this.setBrandOpenId("58d029d0e2b244d59e01eaf42e1fc9e7");
    this.setMiniAccountOpenId("225a333b35c96e744552faa68baad899");
  },

  methods: {
    // getUserInfo () {
    //   wx.getUserInfo({
    //     success: (userInfoRes) => {
    //       wx.setStorageSync('userInfo', userInfoRes.userInfo)
    //       this.checkUserInfo(userInfoRes)
    //       console.log(userInfoRes)
    //       this.decodeUserInfo(userInfoRes)
    //     }
    //   })
    // },
    // async checkUserInfo (userInfoRes) {
    // let {data} = await this.$http({
    //   method: 'post',
    //   url: 'https://sdk.weixin.senparc.com/WxOpen/CheckWxOpenSignature',
    //   data: {
    //     sessionId: wx.getStorageSync('sessionId'),
    //     rawData: userInfoRes.rawData,
    //     signature: userInfoRes.signature
    //   }
    // })
    // },
    // async decodeUserInfo (userInfoRes) {
    // let {data} = await this.$http({
    //   method: 'post',
    //   url: 'https://sdk.weixin.senparc.com/WxOpen/DecodeEncryptedData',
    //   data: {
    //     'tpye': 'userInfo',
    //     sessionId: wx.getStorageSync('sessionId'),
    //     encryptedData:userInfoRes.encryptedData,
    //     iv:userInfoRes.iv
    //   }
    // })
    // }

    saveCookie: function saveCookie(header) {
      if (header) {
        // console.log(header["set-cookie"])
        var setCookie = header["set-cookie"] ? header["set-cookie"] : header["Set-Cookie"];
        for (var i in setCookie) {
          if (setCookie[i].indexOf("Session") != -1) {
            wx.setStorageSync("SetCookie", setCookie[i]);
          }
        }
      }
    },
    getCookieHeader: function getCookieHeader(header) {
      if (!header) {
        header = {
          "content-type": "application/x-www-form-urlencoded"
        };
      }
      var setCookie = wx.getStorageSync("SetCookie");
      if (setCookie) {
        header["Cookie"] = setCookie;
      }
      return header;
    },
    getSessionId: function getSessionId() {
      var sessionId = wx.getStorageSync("SessionId");
      if (sessionId) {
        return sessionId;
      }
      return null;
    },
    setSessionId: function setSessionId(sessionId) {
      if (sessionId) {
        wx.setStorageSync("SessionId", sessionId);
      } else {
        wx.setStorageSync("SessionId", null);
      }
      return sessionId;
    },
    getBrandOpenId: function getBrandOpenId() {
      var brandOpenId = wx.getStorageSync("BrandOpenId");
      if (brandOpenId) {
        return brandOpenId;
      }
      return null;
    },
    setBrandOpenId: function setBrandOpenId(brandOpenId) {
      if (brandOpenId) {
        wx.setStorageSync("BrandOpenId", brandOpenId);
      } else {
        wx.setStorageSync("BrandOpenId", null);
      }
      return brandOpenId;
    },

    getMiniAccountOpenId: function getMiniAccountOpenId() {
      var miniAccountOpenId = wx.getStorageSync("MiniAccountOpenId");
      if (miniAccountOpenId) {
        return miniAccountOpenId;
      }
      return null;
    },
    setMiniAccountOpenId: function setMiniAccountOpenId(miniAccountOpenId) {
      if (miniAccountOpenId) {
        wx.setStorageSync("MiniAccountOpenId", miniAccountOpenId);
      } else {
        wx.setStorageSync("MiniAccountOpenId", null);
      }
      return miniAccountOpenId;
    },

    getMiniFansOpenId: function getMiniFansOpenId() {
      var miniFansOpenId = wx.getStorageSync("MiniFansOpenId");
      if (miniFansOpenId) {
        return miniFansOpenId;
      }
      return null;
    },
    setMiniFansOpenId: function setMiniFansOpenId(miniFansOpenId) {
      if (miniFansOpenId) {
        wx.setStorageSync("MiniFansOpenId", miniFansOpenId);
      } else {
        wx.setStorageSync("MiniFansOpenId", null);
      }
      return miniFansOpenId;
    },

    getPostData: function getPostData(postData) {
      if (!postData) {
        postData = {};
      }

      postData.brandOpenId = this.getBrandOpenId();
      postData.accountOpenId = this.getMiniAccountOpenId();
      postData.MiniFansOpenId = this.getMiniFansOpenId();
      postData.SessionId = this.getSessionId();
      return postData;
    },

    getUserInfo: function getUserInfo(cb) {
      var that = this;
      // var app = getApp();
      if (this.globalData.userInfo) {
        typeof cb == "function" && cb(this.globalData.userInfo);
        return;
      }
      //获取userInfo并校验
      wx.getUserInfo({
        success: function success(userInfoRes) {
          console.log("get userinfo", userInfoRes);
          var userinfo = userInfoRes.userInfo;
          that.globalData.userInfo = userinfo;
          typeof cb == "function" && cb(that.globalData.userInfo);

          this.onLogin(userinfo);
        }
      });

      //调用登录接口
    },

    onLogin: function onLogin(userInfo, cb) {
      var that = this;
      that.$fun.loading("登录中...");
      wx.login({
        success: function success(res) {
          console.log(res);
          var header = that.getCookieHeader();
          var postData = that.getPostData();
          postData.code = res.code;
          postData.userInfo = userInfo;
          that.$http({
            url: that.$api.api.login,
            method: "POST",
            header: header,
            data: postData
          }).then(function (result) {
            if (result.data.state == 1) {
              that.saveCookie(result.headers);
              console.log(result);
              that.setSessionId(result.data.data.SessionId);
              that.setMiniFansOpenId(result.data.data.MiniFansOpenId);
              typeof cb == "function" && cb(result.data);
            }
          });
        }
      });
    },

    checkWxOpenSignature: function checkWxOpenSignature(userInfoRes) {
      var app = getApp();
      var header = app.getCookieHeader();
      var url = wx.getStorageSync("domainName") + "/WxOpen/CheckWxOpenSignature";

      var data = this.getPostData();
      data.rawData = userInfoRes.rawData;
      data.signature = userInfoRes.signature;

      //校验
      wx.request({
        url: url,
        method: "POST",
        header: header,
        data: data,
        success: function success(json) {
          console.log(json.data);
        }
      });
    },

    decodeEncryptedData: function decodeEncryptedData() {
      var app = getApp();
      var url = wx.getStorageSync("domainName") + "/WxOpen/DecodeEncryptedData";
      var header = this.getCookieHeader();
      //解密数据（建议放到校验success回调函数中，此处仅为演示）
      wx.request({
        url: url,
        method: "POST",
        header: header,
        data: {
          type: "userInfo",
          sessionId: wx.getStorageSync("sessionId"),
          encryptedData: userInfoRes.encryptedData,
          iv: userInfoRes.iv
        },
        success: function success(json) {
          console.log(json.data);
        }
      });
    },
    globalData: {
      userInfo: null
    }
  }
});

/***/ }),

/***/ 84:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 85:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 86:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 88:
/***/ (function(module, exports) {

var api = {
  login:'WxOpen/OnLogin',
  get_yzm: "/mYslMis/CuteShotActivity/GetMobileCheckCode",//获取验证码
  set_yzm: "/mYslMis/CuteShotActivity/Check",//发送注册信息给后端
  set_userInfo: "/mYslMis/CuteShotActivity/Submit",
  get_index_list: "/mYslMis/CuteShotActivity/GetList",
  set_ticket: "/mYslMis/CuteShotActivity/Ticket",
  page2_top_info: "/mYslMis/CuteShotActivity/Statistics",
  get_memberInfo: "/mYslMis/CuteShotActivity/GetMemberInfo",
  StartActivity: "/mYslMis/CuteShotActivity/StartActivity", //开始抽奖
  set_user_info: "/mYslMis/CuteShotActivity/ApplyWin",
  GetAwardCount: "/mYslMis/CuteShotActivity/GetAwardCount",
  ApplyRankAward: "/mYslMis/CuteShotActivity/ApplyRankAward",
  upload_img:'/File/UploadFile2',
  is_activity:'/mYslMis/CuteShotActivity/MemberJoin'
};
// const host = 'https://ysl.entfly.com'  // 开发域名
const host = 'https://1.mengniuarla.com'  // 生产域名
var is_debug = true;
var result__ = {};

module.exports = {
  host,
  api: api,
  is_debug: is_debug,
  result__: result__
};


/***/ }),

/***/ 89:
/***/ (function(module, exports) {

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
  loading: function(tit) {
    wx.showToast({
      title: tit?tit:'加载中...',
      icon: 'loading',
      duration: 10000
    })
  },
  hide_loading: function() {
    wx.hideToast();
  }
};
module.exports = {
  fun_
};


/***/ })

},[44]);