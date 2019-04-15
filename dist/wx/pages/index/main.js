require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([5],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_login_vue__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_4591b8fb_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_login_vue__ = __webpack_require__(104);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(102)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_login_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_4591b8fb_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_login_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4591b8fb", Component.options)
  } else {
    hotAPI.reload("data-v-4591b8fb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 102:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "",
  components: {},
  data: function data() {
    return {};
  },

  props: [""],
  created: function created() {},

  methods: {
    getUserData: function getUserData(e) {
      var _this = this;

      console.log(e);
      var userInfo = e.mp.detail.userInfo;
      this.$app.globalData.userInfo = userInfo;
      //rawData 为userInfo的json string格式
      this.$app.onLogin(e.mp.detail.rawData, function (res) {
        if (res) {
          _this.$emit("cb", true);
        }
      });
    }
  }
});

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login"
  }, [_c('button', {
    staticClass: "login-btn",
    attrs: {
      "open-type": "getUserInfo",
      "eventid": '0'
    },
    on: {
      "getuserinfo": _vm.getUserData
    }
  }, [_vm._v("点击进入萌萌拍")])], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4591b8fb", esExports)
  }
}

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.login_state) ? _c('swiper', {
    staticClass: "w_h100",
    attrs: {
      "vertical": "",
      "current": _vm.cur_page,
      "eventid": '19'
    },
    on: {
      "change": _vm.swiper_change
    }
  }, [_c('swiper-item', {
    attrs: {
      "mpcomid": '0'
    }
  }, [_c('div', {
    staticClass: "index_page_box size0"
  }, [_c('img', {
    staticClass: "index_bg",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p1/index_bg.jpg'
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "active_des t_center size15",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": function($event) {
        _vm.show_active_info = true
      }
    }
  }, [_vm._v("活动简介")]), _vm._v(" "), _c('div', {
    staticClass: "active_tit w_70 t_center size15"
  }, [_vm._v("赢阿尔卑斯山有机体验游!")]), _vm._v(" "), _c('img', {
    staticClass: "butterfly animations_",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p1/butterfly.png',
      "mode": "aspectFit"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "upload_box size15"
  }, [_c('img', {
    staticClass: "upload_btn",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p1/index_upload.png',
      "mode": "widthFix"
    }
  }), _vm._v(" "), (!_vm.show_upload_tips) ? _c('img', {
    staticClass: "upload_btn1 w40 h40",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p1/upload_sm_img.png',
      "mode": "aspectFit"
    }
  }) : _vm._e(), _vm._v(" "), (_vm.show_upload_tips) ? _c('div', {
    staticClass: "upload_btn1 size19",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.now_reg
    }
  }, [_vm._v("点击马上萌拍")]) : _vm._e()]), _vm._v(" "), _c('img', {
    staticClass: "bottom_arrow",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p1/down_arrow.png',
      "mode": "aspectFit"
    }
  }), _vm._v(" "), (_vm.show_active_info) ? _c('div', {
    staticClass: "active_info pt20",
    attrs: {
      "catchtouchmove": "true"
    }
  }, [_c('img', {
    staticClass: "close_active w20 h20",
    attrs: {
      "src": "/static/images/close.png",
      "eventid": '2'
    },
    on: {
      "click": function($event) {
        _vm.show_active_info = false
      }
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "active_bg",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p1/active_bg.png'
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "active_info_tit m_center",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p1/active_info/text_tit.png',
      "mode": "widthFix"
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "active_info_text mt20",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p1/active_info/text1.png',
      "mode": "widthFix"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "active_info_text mt10"
  }, [_c('img', {
    staticClass: "active_info_time",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p1/active_info/text2.png',
      "mode": "widthFix"
    }
  })]), _vm._v(" "), _c('img', {
    staticClass: "active_info_text mt10",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p1/active_info/text3.png',
      "mode": "widthFix"
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "active_info_text mt10",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p1/active_info/text4.png',
      "mode": "widthFix"
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "active_info_text mt10",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p1/active_info/text5.png',
      "mode": "widthFix"
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.show_sign_up) ? _c('div', {
    staticClass: "sign_up pt50",
    attrs: {
      "catchtouchmove": "true"
    }
  }, [_c('img', {
    staticClass: "close_active w20 h20",
    attrs: {
      "src": "/static/images/close.png",
      "eventid": '3'
    },
    on: {
      "click": function($event) {
        _vm.show_sign_up = false
      }
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "sign_up_bg",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p3/sign_up_bg.png'
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "mb10"
  }, [_c('img', {
    staticClass: "sign_up_tit m_center",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p3/sing_up_tit.png',
      "mode": "widthFix"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "w_80 m_center",
    attrs: {
      "eventid": '10'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
      }
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_name),
      expression: "user_name"
    }],
    staticClass: "input_item bg_white ptb5 plr10 mb20",
    attrs: {
      "type": "text",
      "placeholder": "输入宝贝昵称",
      "eventid": '4'
    },
    domProps: {
      "value": (_vm.user_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.user_name = $event.target.value
      }
    }
  }), _vm._v(" "), _c('picker', {
    staticClass: "input_item bg_white ptb5 plr10 mb20",
    attrs: {
      "mode": "date",
      "eventid": '5'
    },
    on: {
      "change": _vm.date_change
    }
  }, [_c('view', {
    staticClass: "picker",
    style: ({
      color: _vm.picker_date.length > 0 ? '#97cea2' : '#777'
    })
  }, [_vm._v(_vm._s(_vm.picker_date.length > 0 ? _vm.picker_date : "选择宝贝出生日期"))])]), _vm._v(" "), _c('picker', {
    staticClass: "input_item bg_white ptb5 plr10 mb20",
    attrs: {
      "mode": "region",
      "eventid": '6'
    },
    on: {
      "change": _vm.city_change
    }
  }, [_c('view', {
    staticClass: "picker",
    style: ({
      color: _vm.picker_city.length > 0 ? '#97cea2' : '#777'
    })
  }, [_vm._v(_vm._s(_vm.picker_city.length > 0 ? _vm.picker_city[0] + "/" + _vm.picker_city[1] + "/" + _vm.picker_city[2] : "选择省份/城市/区县"))])]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tel),
      expression: "tel"
    }],
    staticClass: "input_item bg_white ptb5 plr10 mb20",
    attrs: {
      "type": "number",
      "maxlength": "11",
      "placeholder": "输入手机号码",
      "eventid": '7'
    },
    domProps: {
      "value": (_vm.tel)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tel = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "flex_space_between yzm_box"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.yzm_val),
      expression: "yzm_val"
    }],
    staticClass: "input_item bg_white ptb5 plr10 max_w",
    attrs: {
      "type": "number",
      "maxlength": "4",
      "placeholder": "输入验证码",
      "eventid": '8'
    },
    domProps: {
      "value": (_vm.yzm_val)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.yzm_val = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "yzm_btn w90 t_center",
    attrs: {
      "eventid": '9'
    },
    on: {
      "click": _vm.get_yzm
    }
  }, [_vm._v(_vm._s(_vm.yzm_text))])])], 1), _vm._v(" "), _c('img', {
    staticClass: "m_center w_80 h40 pt10",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p3/sing_up_btn.png',
      "mode": "aspectFit",
      "eventid": '11'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.next_step($event)
      }
    }
  })]) : _vm._e()])]), _vm._v(" "), _c('swiper-item', {
    attrs: {
      "mpcomid": '3'
    }
  }, [_c('div', {
    staticClass: "p2_page_box size15",
    attrs: {
      "id": "p2_page_box"
    }
  }, [_c('img', {
    staticClass: "p2_top_img w_100 h110",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p2/bg.png',
      "mode": "aspectFit"
    }
  }), _vm._v(" "), _c('countdown_', {
    ref: "countdown_",
    attrs: {
      "mpcomid": '1'
    }
  }), _vm._v(" "), _c('searchbar', {
    attrs: {
      "eventid": '12',
      "mpcomid": '2'
    },
    on: {
      "call_back": _vm.get_search_info,
      "clear_call_back": _vm.clear_search
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "top_nav flex"
  }, [_c('div', {
    staticClass: "top_nav_item",
    class: _vm.cur_top_nav == 0 ? 'cur_nav_item' : '',
    attrs: {
      "eventid": '13'
    },
    on: {
      "click": function($event) {
        _vm.switch_nav(0)
      }
    }
  }, [_vm._v("默认排序")]), _vm._v(" "), _c('div', {
    staticClass: "top_nav_item",
    class: _vm.cur_top_nav == 1 ? 'cur_nav_item' : '',
    attrs: {
      "eventid": '14'
    },
    on: {
      "click": function($event) {
        _vm.switch_nav(1)
      }
    }
  }, [_vm._v("最新参与")]), _vm._v(" "), _c('div', {
    staticClass: "top_nav_item",
    class: _vm.cur_top_nav == 2 ? 'cur_nav_item' : '',
    attrs: {
      "eventid": '15'
    },
    on: {
      "click": function($event) {
        _vm.go_page('/pages/rank/main')
      }
    }
  }, [_vm._v("人气排行")])]), _vm._v(" "), (_vm.cur_top_nav == 0 || _vm.cur_top_nav == 1) ? _c('scroll-view', {
    staticClass: "list_box w_90 m_center flex_space_between wrap",
    attrs: {
      "scroll-y": "",
      "lower-threshold": "100",
      "eventid": '18'
    },
    on: {
      "scrolltolower": _vm.get_more_list
    }
  }, _vm._l((_vm.index_list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "list_item",
      attrs: {
        "eventid": '17_' + index
      },
      on: {
        "click": function($event) {
          _vm.go_next_page(item)
        }
      }
    }, [_c('div', {
      staticClass: "list_item_tag w40 h40"
    }, [_c('img', {
      staticClass: "w_100 h_100",
      attrs: {
        "src": _vm.img_baseUrl + '/2/ysl/images/p2/tag.png',
        "mode": "aspectFit"
      }
    }), _vm._v(" "), _c('div', [_vm._v(_vm._s(item.ID) + "号")])]), _vm._v(" "), _c('div', {
      staticClass: "w_100 h130"
    }, [_c('img', {
      staticClass: "w_100 h_100",
      attrs: {
        "src": _vm.img_baseUrl + item.MemberHeadImgUrl,
        "mode": "aspectFill"
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "bg_white ptb5",
      staticStyle: {
        "color": "#62a53b"
      }
    }, [_c('div', {
      staticClass: "flex_space_between plr10 pb5",
      staticStyle: {
        "line-height": "50rpx"
      }
    }, [_c('div', [_vm._v(_vm._s(item.BabyName))]), _vm._v(" "), _c('div', [_vm._v(_vm._s(item.TicketCount) + "票")])]), _vm._v(" "), _c('div', {
      staticClass: "list_item_btn w_90 m_center flex",
      attrs: {
        "eventid": '16_' + index
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.set_ticket(item.RankOpenId, index)
        }
      }
    }, [_c('span', [_vm._v("投TA一票")]), _vm._v(" "), _c('img', {
      staticClass: "w20 h20 ml10",
      attrs: {
        "src": _vm.img_baseUrl + '/2/ysl/images/p2/heart.png',
        "mode": "aspectFit"
      }
    })])])])
  })) : _vm._e(), _vm._v(" "), _c('img', {
    staticClass: "bottom_arrow",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p1/down_arrow1.png',
      "mode": "aspectFit"
    }
  })], 1)])], 1) : _vm._e(), _vm._v(" "), (!_vm.login_state) ? _c('login', {
    attrs: {
      "eventid": '20',
      "mpcomid": '4'
    },
    on: {
      "cb": _vm.login_cb
    }
  }) : _vm._e(), _vm._v(" "), (_vm.isToastShow) ? _c('my-toast', {
    attrs: {
      "eventid": '21',
      "mpcomid": '5'
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7df12c4f", esExports)
  }
}

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(91);



// add this to handle exception
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err);
  }
};

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_7df12c4f_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(108);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(92)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7df12c4f"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_7df12c4f_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\index\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7df12c4f", Component.options)
  } else {
    hotAPI.reload("data-v-7df12c4f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 92:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_countdown_vue__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_searchbar_vue__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_login_vue__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_personal_toast_vue__ = __webpack_require__(43);

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
    countdown_: __WEBPACK_IMPORTED_MODULE_1__components_countdown_vue__["a" /* default */],
    Searchbar: __WEBPACK_IMPORTED_MODULE_2__components_searchbar_vue__["a" /* default */],
    login: __WEBPACK_IMPORTED_MODULE_3__components_login_vue__["a" /* default */],
    MyToast: __WEBPACK_IMPORTED_MODULE_4__components_personal_toast_vue__["a" /* default */]
  },
  data: function data() {
    return {
      isToastShow: false,
      cur_page: 0,
      show_active_info: false,
      show_upload_tips: false,
      show_sign_up: false,
      yzm_text: "获取验证码",
      yzm_lock: false,
      picker_city: [],
      picker_date: "",
      user_name: "",
      tel: "",
      yzmval: "",
      tel_reg: /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/,
      cur_top_nav: 0,
      default_page_size: 1, //默认展示list的页面
      index_list: [], //参赛列表
      list_page_count: 1, //list总页数
      search_text: "",
      login_state: true,
      img_baseUrl: "https://1.mengniuarla.com",
      ticket_lock: false,
      is_activity_: false
    };
  },
  onLoad: function onLoad() {
    var SessionId = wx.getStorageSync("SessionId");
    if (SessionId) {
      this.login_state = true;
      this.animate_();
    } else {
      this.login_state = false;
    }
    this.index_list = [];
    this.is_activity();
  },
  onShow: function onShow() {
    // Object.assign(this, this.$options.data());
  },
  onHide: function onHide() {
    this.$refs.countdown_.$emit("clear", true);
  },
  mounted: function mounted() {},

  methods: {
    now_reg: function now_reg() {
      if (this.is_activity_) {
        this.$fun.alert_modal("您已报名成功");
      } else {
        this.show_sign_up = true;
      }
    },
    is_activity: function is_activity() {
      var _this = this;

      this.$http({
        url: this.$api.api.is_activity,
        methods: "post"
      }).then(function (res) {
        if (res.data.result == true) {
          _this.is_activity_ = true;
          _this.cur_page = 1;
        } else {
          _this.is_activity_ = false;
        }
        console.log(res);
      });
    },
    login_cb: function login_cb(res) {
      if (res) {
        this.$fun.toast("登录成功");
        this.$fun.hide_loading();
        this.login_state = true;
        this.animate_();
      }
    },
    switch_nav: function switch_nav(idx) {
      this.$fun.loading("加载中...");
      this.cur_top_nav = idx;
      this.index_list = [];
      if (idx == 0) {
        this.get_list();
      } else if (idx == 1) {
        this.get_list("", "", 1);
      }
    },
    animate_: function animate_() {
      var _this2 = this;

      setTimeout(function () {
        _this2.show_upload_tips = true;
      }, 2000);
    },
    get_yzm: function get_yzm() {
      var _this3 = this;

      if (!this.tel_reg.test(this.tel)) {
        this.$fun.confirm_modal("提示", "请输入正确的手机号码", false);
        return;
      }

      if (!this.yzm_lock) {
        this.$fun.loading("发送中...");
        this.$http({
          method: "post",
          url: this.$api.api.get_yzm,
          data: {
            mobile: this.tel
          }
        }).then(function (res) {
          console.log(res);
          _this3.$fun.hide_loading();
          if (res.data.state == 1) {
            _this3.$fun.toast("验证码已发送");
            _this3.yzm_lock = true;
            _this3.yzm_text = 60;
            var timer = setInterval(function () {
              if (_this3.yzm_text > 1) {
                _this3.yzm_text--;
              } else {
                clearInterval(timer);
                _this3.yzm_text = "获取验证码";
                _this3.yzm_lock = false;
              }
            }, 1000);
          }
        });
      }
    },
    city_change: function city_change(e) {
      //获取选择的城市
      // console.log(e);
      this.picker_city = e.target.value;
    },
    date_change: function date_change(e) {
      //获取选择的日期
      // console.log(e);
      this.picker_date = e.target.value;
    },

    //切换首页与列表页  0为首页 每次切换 还原默认数据
    swiper_change: function swiper_change(e) {
      this.index_list = [];
      var cur_page_ = e.target.current;
      this.cur_page = cur_page_;
      if (cur_page_ == 0) {
        this.show_active_info = false;
        this.show_sign_up = false;
        this.yzm_text = "获取验证码";
        this.yzm_lock = false;
        this.picker_city = [];
        this.picker_date = "";
        this.user_name = "";
        this.tel = "";
        this.yzmval = "";
        this.$refs.countdown_.$emit("clear", true);
      } else if (cur_page_ == 1) {
        this.get_list();
        this.cur_top_nav = 0;
        this.default_page_size = 1;
        this.$refs.countdown_.$emit("clear", false);
      }
    },

    //跳转页面
    go_page: function go_page(url) {
      wx.navigateTo({
        url: url
      });
    },

    //报名
    next_step: function next_step() {
      var _this4 = this;

      var u_name = this.user_name,
          u_date = this.picker_date,
          u_city = this.picker_city,
          u_tel = this.tel,
          u_yzm = this.yzm_val;
      if (!u_name) {
        this.$fun.confirm_modal("提示", "请输入宝宝姓名", false);
      } else if (!u_date) {
        this.$fun.confirm_modal("提示", "请输入出生日期", false);
      } else if (u_city.length < 1) {
        this.$fun.confirm_modal("提示", "请输入所在城市", false);
      } else if (!this.tel_reg.test(u_tel)) {
        this.$fun.confirm_modal("提示", "请输入正确的手机号码", false);
      } else if (!u_yzm) {
        this.$fun.confirm_modal("提示", "请输入验证码", false);
      } else {
        wx.setStorage({
          key: "u_name",
          data: u_name
        });
        wx.setStorage({
          key: "u_date",
          data: u_date
        });
        wx.setStorage({
          key: "u_city",
          data: u_city
        });
        wx.setStorage({
          key: "u_tel",
          data: u_tel
        });
        // 友好加载中提示
        this.$fun.loading("验证中...");
        this.$http({
          method: "post",
          url: this.$api.api.set_yzm,
          data: {
            mobile: this.tel,
            smsCheckCode: u_yzm
          }
        }).then(function (res) {
          _this4.$fun.hide_loading();
          if (res.data.state == 1) {
            setTimeout(function () {
              _this4.go_page("/pages/upload_img/main");
            }, 1000);
          }
        });
      }
    },
    get_search_info: function get_search_info(res) {
      var _this5 = this;

      //搜索后的操作
      // console.log(res);
      this.index_list = [];
      if (res != "") {
        //输入搜索内容
        this.search_text = res;
        this.$fun.loading("搜索中..");
        setTimeout(function () {
          _this5.get_list(1, res, "");
        }, 1000);
      } else {
        //没有搜索或删除了搜索内容  去请求默认的列表
        this.get_list(1, "", "");
      }
    },
    clear_search: function clear_search(res) {
      //点击搜索框的关闭按钮  清空搜索内容并请求默认列表
      this.index_list = [];
      this.search_text = "";
      this.get_list(1, "", "");
      // console.log(res);
    },

    //点击list_item
    go_next_page: function go_next_page(userInfo) {
      var count_down_end = wx.getStorageSync("count_down_end");
      if (count_down_end) {
        this.$fun.confirm_modal("提示", "活动已结束", false);
      } else {
        var payload = { RankOpenId: userInfo.RankOpenId };
        payload = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(payload);
        this.go_page("/pages/personal/main?payload=" + payload);
      }
    },
    get_list: function get_list(page, search, orderby) {
      var _this6 = this;

      this.$http({
        url: this.$api.api.get_index_list,
        method: "post",
        data: {
          PageIndex: page ? page : 1, //默认页码
          BabyName: search ? search : "", //搜索内容
          orderby: orderby ? orderby : "" //默认排序  传1为最新排序
        }
      }).then(function (res) {
        if (search) {
          //搜索
          if (res.data.data.length <= 0) {
            _this6.$fun.alert_modal("数据为空,请重试", "提示");
            _this6.get_list(1, "", "");
          } else {
            _this6.index_list = _this6.index_list.concat(res.data.data);
            _this6.list_page_count = res.data.totalCount;
          }
        } else {
          //没有搜索 正常请求
          _this6.index_list = _this6.index_list.concat(res.data.data);

          _this6.list_page_count = res.data.totalCount;
        }
        _this6.$fun.hide_loading();
      }).catch(function (err) {
        console.log(err);
      });
    },
    get_search_list: function get_search_list(page, search) {},

    //分页加载
    get_more_list: function get_more_list() {
      if (this.list_page_count > this.default_page_size) {
        this.$fun.loading("加载信息中");
        this.default_page_size++;
        //如果当前加载的是搜索后的列表
        if (this.search_text) {
          if (this.cur_top_nav == 1) {
            this.get_list(this.default_page_size, this.search_text, 1);
          } else {
            this.get_list(this.default_page_size, this.search_text, "");
          }
        } else {
          this.get_list(this.default_page_size, "", "");
        }
      } else {
        this.$fun.toast("到底了");
      }
    },
    set_ticket: function set_ticket(id, idx) {
      var _this7 = this;

      if (!this.ticket_lock) {
        this.$fun.loading("投票中..");
        this.ticket_lock = true;
        this.$http({
          url: this.$api.api.set_ticket,
          method: "post",
          data: {
            RankOpenId: id //默认页码
          }
        }).then(function (res) {
          _this7.$fun.hide_loading();
          setTimeout(function () {
            _this7.ticket_lock = false;
          }, 1000);
          if (res.data.state == 1) {
            _this7.isToastShow = true;
            _this7.index_list[idx].TicketCount++;
            // this.$fun.toast("投票成功");
          }
          console.log(res);
        });
      }
    },
    hideToast: function hideToast() {
      this.isToastShow = false;
    }
  }
});

/***/ })

},[90]);