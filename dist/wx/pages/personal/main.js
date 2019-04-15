require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([8],{

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(146);



// add this to handle exception
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err);
  }
};

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_393f818e_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(149);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(147)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_393f818e_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\personal\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-393f818e", Component.options)
  } else {
    hotAPI.reload("data-v-393f818e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 147:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_personal_toast_vue__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_countdown_vue__ = __webpack_require__(26);


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
  name: "",
  components: {
    MyToast: __WEBPACK_IMPORTED_MODULE_2__components_personal_toast_vue__["a" /* default */],
    countdown_: __WEBPACK_IMPORTED_MODULE_3__components_countdown_vue__["a" /* default */]
  },
  data: function data() {
    return {
      isToastShow: false,
      userInfo: {},
      payload: {
        RankOpenId: ""
      },
      img_baseUrl: "https://1.mengniuarla.com"
    };
  },

  props: [""],
  onLoad: function onLoad(params) {
    this.payload = JSON.parse(params.payload);
    this.get_user_info();
  },

  methods: {
    go_page: function go_page(url) {
      wx.navigateTo({
        url: url
      });
    },
    preview_img: function preview_img() {
      wx.previewImage({
        current: this.img_baseUrl + this.userInfo.MemberHeadImgUrl, // 当前显示图片的http链接
        urls: [this.img_baseUrl + this.userInfo.MemberHeadImgUrl] // 需要预览的图片http链接列表
      });
    },
    get_user_info: function get_user_info() {
      var _this = this;

      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
        var _ref, data;

        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.$http({
                  url: _this.$api.api.get_memberInfo,
                  method: "post",
                  data: _this.payload
                });

              case 2:
                _ref = _context.sent;
                data = _ref.data;

                if (data.state === 1) {
                  console.log(data.data);
                  _this.userInfo = data.data;
                }
                console.log(data);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    vote: function vote(id) {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
        var count_down_end;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                count_down_end = wx.getStorageSync("count_down_end");

                if (count_down_end) {
                  _this2.$fun.confirm_modal("提示", "活动已结束", false);
                } else {
                  _this2.$fun.loading("投票中..");
                  _this2.$http({
                    method: "post",
                    url: _this2.$api.api.set_ticket,
                    data: { RankOpenId: id }
                  }).then(function (res) {
                    _this2.$fun.hide_loading();
                    if (res.data.state === 1) {
                      _this2.isToastShow = true;
                    }
                  });
                }

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },
    hideToast: function hideToast() {
      this.isToastShow = false;
      this.get_user_info();
    }
  }
});

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "personal-container w_h100"
  }, [_c('img', {
    staticClass: "bg-personal",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p5/bg-leaves2.png'
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "personal-upper"
  }, [_c('div', {
    staticClass: "user-box"
  }, [(_vm.userInfo.WechatHeadImgUrl) ? _c('img', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.userInfo.WechatHeadImgUrl
    }
  }) : _c('div', {
    staticClass: "avatar-bg"
  }, [_vm._v("头像")]), _vm._v(" "), _c('p', {
    staticClass: "name"
  }, [_vm._v("[" + _vm._s(_vm.userInfo.FansNickname) + "]")])], 1), _vm._v(" "), _c('div', {
    staticClass: "details-box"
  }, [_c('div', {
    staticClass: "info-box"
  }, [_c('div', {
    staticClass: "info-item"
  }, [_c('div', [_vm._v(_vm._s(_vm.userInfo.ID))]), _vm._v(" "), _c('div', [_vm._v("编号")])]), _vm._v(" "), _c('div', {
    staticClass: "info-item"
  }, [_c('div', [_vm._v(_vm._s(_vm.userInfo.TicketCount))]), _vm._v(" "), _c('div', [_vm._v("萌力值")])]), _vm._v(" "), _c('div', {
    staticClass: "info-item"
  }, [_c('div', [_vm._v(_vm._s(_vm.userInfo.TopRank))]), _vm._v(" "), _c('div', [_vm._v("排行")])])]), _vm._v(" "), _c('div', {
    staticClass: "btn-box"
  }, [_c('a', {
    staticClass: "btn",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": function($event) {
        _vm.go_page('/pages/rank/main')
      }
    }
  }, [_vm._v("排行榜")])])])]), _vm._v(" "), _c('div', {
    staticClass: "personal-lower"
  }, [_c('img', {
    staticClass: "poster d_block",
    attrs: {
      "src": _vm.img_baseUrl + _vm.userInfo.MemberHeadImgUrl,
      "mode": "aspectFit",
      "eventid": '1'
    },
    on: {
      "click": _vm.preview_img
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "btn-box",
    attrs: {
      "eventid": '2'
    },
    on: {
      "click": function($event) {
        _vm.vote(_vm.userInfo.RankOpenId)
      }
    }
  }, [_c('img', {
    staticClass: "btn-like",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p5/icon-heart.png',
      "alt": "icon-heart",
      "mode": "aspectFit"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "btn-text"
  }, [_vm._v("投一票")])])]), _vm._v(" "), (_vm.isToastShow) ? _c('my-toast', {
    attrs: {
      "eventid": '3',
      "mpcomid": '0'
    },
    on: {
      "hideToast": _vm.hideToast
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-393f818e", esExports)
  }
}

/***/ })

},[145]);