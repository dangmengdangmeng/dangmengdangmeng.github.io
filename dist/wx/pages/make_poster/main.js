require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([4],{

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(137);



// add this to handle exception
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err);
  }
};

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_3c64308a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(144);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(138)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3c64308a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_3c64308a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\make_poster\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c64308a", Component.options)
  } else {
    hotAPI.reload("data-v-3c64308a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 138:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_open_set__ = __webpack_require__(140);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    open_set: __WEBPACK_IMPORTED_MODULE_0__components_open_set__["a" /* default */]
  },
  data: function data() {
    return {
      poster_img: "",
      show_setting: false,
      go_lottery: false
    };
  },
  onShow: function onShow() {},
  mounted: function mounted() {
    var _this = this;

    this.poster_img = wx.getStorageSync("poster") ? wx.getStorageSync("poster") : "";

    wx.getImageInfo({
      src: wx.getStorageSync("poster"),
      success: function success(res) {
        // console.log(res.path);
        wx.compressImage({
          src: res.path,
          quality: 60,
          complete: function complete(res2) {
            // console.log(res2);
            wx.uploadFile({
              // url: "https://ysl.entfly.com/File/UploadFile2",
              url: "https://1.mengniuarla.com/File/UploadFile2",
              filePath: res2.tempFilePath,
              name: "poster_img",
              success: function success(res1) {
                var res1_data = JSON.parse(res1.data);
                console.log(res1_data);
                _this.go_lottery = true;
                _this.set_user_info({
                  name: wx.getStorageSync("u_name"),
                  date: wx.getStorageSync("u_date"),
                  tel: wx.getStorageSync("u_tel"),
                  address: wx.getStorageSync("u_city") ? wx.getStorageSync("u_city").join("-") : "",
                  img: res1_data.data.src
                });
              }
            });
          }
        });
      }
    });
  },


  methods: {
    save: function save() {
      var _this2 = this;

      wx.saveImageToPhotosAlbum({
        filePath: this.poster_img,
        success: function success(res) {
          console.log(res);
          _this2.$fun.toast("保存成功");
        },
        fail: function fail(err) {
          if (err.errMsg == "saveImageToPhotosAlbum:fail auth deny" || err.errMsg == "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg == "saveImageToPhotosAlbum:fail authorize no response") {
            _this2.show_setting = true;
          } else if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
            _this2.$fun.toast("保存失败", "none");
          }
          console.log(err);
        }
      });
    },
    go_lottery1: function go_lottery1() {
      if (this.go_lottery) {
        this.go_page("/pages/lottery/main");
      }
    },
    close_setting: function close_setting() {
      this.show_setting = false;
    },
    setting_cb: function setting_cb(state) {
      console.log(state);
      if (state) {
        this.show_setting = false;
        this.save();
      }
    },
    preview_img: function preview_img() {
      wx.previewImage({
        current: this.poster_img, // 当前显示图片的http链接
        urls: [this.poster_img] // 需要预览的图片http链接列表
      });
    },
    go_page: function go_page(url) {
      wx.navigateTo({
        url: url
      });
    },
    set_user_info: function set_user_info(obj) {
      var _this3 = this;

      this.$http({
        url: this.$api.api.set_userInfo,
        method: "post",
        data: {
          BabyName: obj.name,
          BabyBirthday: obj.date,
          Mobile: obj.tel,
          RegionAddress: obj.address,
          imgUrl: obj.img
        }
      }).then(function (res) {
        if (res.data.state == 1) {
          _this3.$fun.toast("报名成功");
        }
        console.log(res);
      });
    }
  },
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: "快来pick我家萌宝，一起赢阿尔卑斯山有机体验游！",
      imageUrl: "/static/images/share.jpg",
      path: "/pages/index/main?id=1"
    };
  }
});

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_open_set_vue__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_df52196a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_open_set_vue__ = __webpack_require__(143);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(141)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-df52196a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_open_set_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_df52196a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_open_set_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\open_set.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] open_set.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-df52196a", Component.options)
  } else {
    hotAPI.reload("data-v-df52196a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 141:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      img_baseUrl: "https://1.mengniuarla.com"
    };
  },
  onLoad: function onLoad() {},

  methods: {
    close: function close() {
      this.$emit("close_setting", true);
    },
    get_setting: function get_setting(e) {
      var _this = this;

      console.log(e);
      var setting_obj = e.mp.detail.authSetting;
      if (setting_obj["scope.writePhotosAlbum"]) {
        this.$fun.toast("授权成功");
        setTimeout(function () {
          _this.$emit("cb", true);
        }, 1000);
      } else {
        this.$emit("cb", false);
        this.$fun.toast("授权失败", "none");
      }
    }
  }
});

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "set_mask"
  }, [_c('div', {
    staticClass: "set_modal bg_white ptb20 flex size15"
  }, [_c('div', {
    staticClass: "set_tit"
  }, [_vm._v("需要您同意才能保存到相册")]), _vm._v(" "), _c('button', {
    staticClass: "set_btn mt20",
    attrs: {
      "open-type": "openSetting",
      "eventid": '0'
    },
    on: {
      "opensetting": _vm.get_setting
    }
  }, [_vm._v("去设置")])], 1), _vm._v(" "), _c('img', {
    staticClass: "btn-cancel w30 h30",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p4/btn-cancel.png',
      "eventid": '1'
    },
    on: {
      "click": _vm.close
    }
  })])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-df52196a", esExports)
  }
}

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "poster_page w_h100 pt30 pb150"
  }, [_c('img', {
    staticClass: "d_block w_90 poster_img m_center",
    attrs: {
      "src": _vm.poster_img,
      "mode": "widthFix",
      "eventid": '0'
    },
    on: {
      "click": _vm.preview_img
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "bottom_btn_box flex_space_between size15 w_80"
  }, [_c('div', {
    staticClass: "bottom_btn"
  }, [_vm._v("\n      邀好友助力\n      "), _c('button', {
    attrs: {
      "open-type": "share"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "bottom_btn",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.go_lottery1
    }
  }, [_vm._v("抽大奖")])]), _vm._v(" "), _c('div', {
    staticClass: "save_btn bottom_btn",
    attrs: {
      "eventid": '2'
    },
    on: {
      "click": _vm.save
    }
  }, [_vm._v("保存到相册")]), _vm._v(" "), (_vm.show_setting) ? _c('open_set', {
    attrs: {
      "eventid": '3',
      "mpcomid": '0'
    },
    on: {
      "cb": _vm.setting_cb,
      "close_setting": _vm.close_setting
    }
  }) : _vm._e()], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3c64308a", esExports)
  }
}

/***/ })

},[136]);