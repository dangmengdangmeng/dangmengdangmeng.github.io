require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([7],{

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(172);



// add this to handle exception
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err);
  }
};

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_0029b3be_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(175);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(173)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0029b3be"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_0029b3be_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\upload_img\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0029b3be", Component.options)
  } else {
    hotAPI.reload("data-v-0029b3be", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 173:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 174:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var items = [];
var _id = -1;
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      step: 1,
      picker_list: ["点击输入宣言", "请为我爆肝投票！", "小哥哥小姐姐，就差你一票我就能出道！", "看到这么萌的小宝贝，怎么忍心不投一票？", "让犹豫走掉，选择我就好！", "一票是情，两票是爱！"],
      picker_sele: "",
      show_textarea: false,
      textarea_val: "",
      show_picker_val: false,
      upload_img: "",
      canvas_create_img: "",
      canvas_pixel: "",
      canvas_w: "",
      canvas_h: "100vh",
      canvas_bg_w: "",
      canvas_bg_h: "",
      list: [],
      index: 0,
      flag: true,
      phone_info: "",
      show_setting: false,
      back_init_text: "点击选择宣言",
      img_baseUrl: "https://1.mengniuarla.com"
    };
  },
  onLoad: function onLoad() {},
  onShow: function onShow() {
    this.show_textarea = false;
    this.show_picker_val = false;
  },
  mounted: function mounted() {
    this.phone_info = wx.getSystemInfoSync();
  },

  methods: {
    back_init: function back_init() {
      this.show_textarea = false;
      this.show_picker_val = false;
    },
    pickerChange: function pickerChange(e) {
      var val = e.target.value;
      if (val == 0) {
        this.show_textarea = true;
        this.show_picker_val = false;
      } else {
        this.picker_sele = this.picker_list[val];
        this.textarea_val = "";
        this.show_textarea = false;
        this.show_picker_val = true;
      }
    },
    get_textarea: function get_textarea(e) {
      this.picker_sele = "";
      this.textarea_val = e.target.value;
    },
    upload_file: function upload_file() {
      var _this = this;

      wx.chooseImage({
        count: 1,
        success: function success(res) {
          // console.log(res);
          _this.upload_img = res.tempFilePaths[0];
          _this.step = 2;
        }
      });
    },
    get_sticker_item_img: function get_sticker_item_img(url) {
      var data = {};
      _id++;
      data.width = 60; //宽度
      data.height = 60; //高度
      data.image = "/static/images/p3/" + url; //地址
      data.id = _id; //id
      data.top = 0; //top定位
      data.left = 0; //left定位
      //圆心坐标
      data.x = data.left + data.width / 2;
      data.y = data.top + data.height / 2;
      data.scale = 1; //scale缩放
      data.oScale = 1; //方向缩放
      data.rotate = 1; //旋转角度
      data.active = false; //选中状态
      items.push(data);
      this.list = items;
    },
    WraptouchStart: function WraptouchStart(e) {
      // console.log(e);
      for (var i = 0; i < items.length; i++) {
        items[i].active = false;
        if (e.currentTarget.dataset.id == items[i].id) {
          this.index = i;
          items[this.index].active = true;
        }
      }
      items[this.index].lx = e.touches[0].clientX;
      items[this.index].ly = e.touches[0].clientY;
      this.list = items;
      // console.log("wraptouchstart", items[this.index]);
    },
    WraptouchMove: function WraptouchMove(e) {
      var _this2 = this;

      if (this.flag) {
        this.flag = false;
        setTimeout(function () {
          _this2.flag = true;
        }, 100);
      }
      // console.log('WraptouchMove', e)
      items[this.index]._lx = e.touches[0].clientX;
      items[this.index]._ly = e.touches[0].clientY;

      items[this.index].left += items[this.index]._lx - items[this.index].lx;
      if (items[this.index].left <= 0) {
        items[this.index].left = 0;
      }
      items[this.index].top += items[this.index]._ly - items[this.index].ly;
      if (items[this.index].top <= 0) {
        items[this.index].top = 0;
      }
      items[this.index].x += items[this.index]._lx - items[this.index].lx;
      items[this.index].y += items[this.index]._ly - items[this.index].ly;

      items[this.index].lx = e.touches[0].clientX;
      items[this.index].ly = e.touches[0].clientY;
      this.list = items;
      // console.log("wraptouchmove", items);
    },
    WraptouchEnd: function WraptouchEnd() {},
    oTouchStart: function oTouchStart(e) {
      //找到点击的那个图片对象，并记录
      for (var i = 0; i < items.length; i++) {
        items[i].active = false;
      }
      items[this.index].active = true;
      //获取作为移动前角度的坐标
      items[this.index].tx = e.touches[0].clientX;
      items[this.index].ty = e.touches[0].clientY;
      //移动前的角度
      items[this.index].anglePre = this.countDeg(items[this.index].x, items[this.index].y, items[this.index].tx, items[this.index].ty);
      //获取图片半径
      items[this.index].r = this.getDistancs(items[this.index].x, items[this.index].y, items[this.index].left, items[this.index].top);
      // console.log("otouchstart", items[this.index]);
    },
    oTouchMove: function oTouchMove(e) {
      var _this3 = this;

      if (this.flag) {
        this.flag = false;
        setTimeout(function () {
          _this3.flag = true;
        }, 100);
      }
      //记录移动后的位置
      items[this.index]._tx = e.touches[0].clientX;
      items[this.index]._ty = e.touches[0].clientY;
      //移动的点到圆心的距离
      items[this.index].disPtoO = this.getDistancs(items[this.index].x, items[this.index].y, items[this.index]._tx, items[this.index]._ty - 10);

      items[this.index].scale = items[this.index].disPtoO / items[this.index].r;
      items[this.index].oScale = 1 / items[this.index].scale;

      //移动后位置的角度
      items[this.index].angleNext = this.countDeg(items[this.index].x, items[this.index].y, items[this.index]._tx, items[this.index]._ty);
      //角度差
      items[this.index].new_rotate = items[this.index].angleNext - items[this.index].anglePre;

      //叠加的角度差
      items[this.index].rotate += items[this.index].new_rotate;
      items[this.index].angle = items[this.index].rotate; //赋值

      //用过移动后的坐标赋值为移动前坐标
      items[this.index].tx = e.touches[0].clientX;
      items[this.index].ty = e.touches[0].clientY;
      items[this.index].anglePre = this.countDeg(items[this.index].x, items[this.index].y, items[this.index].tx, items[this.index].ty);
      this.list = items;
    },
    getDistancs: function getDistancs(cx, cy, pointer_x, pointer_y) {
      var ox = pointer_x - cx;
      var oy = pointer_y - cy;
      return Math.sqrt(ox * ox + oy * oy);
    },

    /*
     *参数1和2为图片圆心坐标
     *参数3和4为手点击的坐标
     *返回值为手点击的坐标到圆心的角度
     */
    countDeg: function countDeg(cx, cy, pointer_x, pointer_y) {
      var ox = pointer_x - cx;
      var oy = pointer_y - cy;
      var to = Math.abs(ox / oy);
      var angle = Math.atan(to) / (2 * Math.PI) * 360;
      // console.log("ox.oy:", ox, oy)
      if (ox < 0 && oy < 0) {
        //相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系
        angle = -angle;
      } else if (ox <= 0 && oy >= 0) {
        //左下角,3象限
        angle = -(180 - angle);
      } else if (ox > 0 && oy < 0) {
        //右上角，1象限
        angle = angle;
      } else if (ox > 0 && oy > 0) {
        //右下角，2象限
        angle = 180 - angle;
      }
      return angle;
    },
    deleteItem: function deleteItem(e) {
      var newList = [];
      for (var i = 0; i < this.list.length; i++) {
        if (this.index != this.list[i].id) {
          newList.push(this.list[i]);
        }
      }
      if (newList.length > 0) {
        newList[newList.length - 1].active = true;
      }
      items = newList;
      this.list = newList;
    },
    create_new_img: function create_new_img() {
      var _this4 = this;

      this.$fun.loading("生成贴图中...");
      setTimeout(function () {
        _this4.$fun.hide_loading();
        _this4.step = 3;
      }, 1000);
    },
    create_poster: function create_poster() {
      var _this5 = this;

      this.$fun.loading("生成海报中");
      wx.getImageInfo({
        src: this.img_baseUrl + "/2/ysl/images/p3/poster/poster_img.png",
        success: function success(poster_img) {
          wx.getImageInfo({
            src: _this5.img_baseUrl + "/2/ysl/images/p3/poster/logo.png",
            success: function success(poster_logo) {
              wx.getImageInfo({
                src: _this5.img_baseUrl + "/2/ysl/images/p3/poster/qr_code.png",
                success: function success(code_info) {
                  wx.getImageInfo({
                    src: _this5.upload_img,
                    success: function success(bg_) {
                      _this5.canvas_pixel = _this5.phone_info.pixelRatio;
                      _this5.draw_img({
                        bg_info: {
                          img: _this5.upload_img,
                          w: Number(bg_.width),
                          h: Number(bg_.height)
                        },
                        canvas_w: _this5.phone_info.windowWidth,
                        canvas_h: _this5.phone_info.windowHeight,
                        canvas_pixel: _this5.phone_info.pixelRatio,
                        list: _this5.list,
                        code_img: code_info.path,
                        poster_img_info: {
                          img: poster_img.path,
                          w: Number(poster_img.width),
                          h: Number(poster_img.height)
                        },
                        poster_logo_info: {
                          img: poster_logo.path,
                          w: Number(poster_logo.width),
                          h: Number(poster_logo.height)
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    },
    draw_img: function draw_img(obj) {
      console.log(obj);
      var ctx = wx.createCanvasContext("upload_img111"),
          bgimg_w = Number((obj.canvas_w * 0.95).toFixed(1)),
          bgimg_h = Number((obj.bg_info.h / obj.bg_info.w * bgimg_w).toFixed(1)),
          qr_code_w = 80,
          canvas_page_h = 60 + bgimg_h + qr_code_w + 100;
      this.canvas_h = canvas_page_h + "px";
      ctx.setFillStyle("#cfe7cc");
      ctx.fillRect(0, 0, obj.canvas_w, canvas_page_h);
      ctx.drawImage(obj.bg_info.img, //背景图路径
      Number((obj.canvas_w * 0.025).toFixed(1)), 60, bgimg_w, bgimg_h);
      ctx.drawImage(obj.poster_img_info.img, //顶部logo
      Number((obj.canvas_w * 0.025).toFixed(1)), 10, 155, obj.poster_img_info.h / obj.poster_img_info.w * 155);
      ctx.drawImage(obj.poster_logo_info.img, //logo
      Number((obj.canvas_w * 0.025).toFixed(1)), 10 + 60 + bgimg_h + 60 + 10, 135, obj.poster_logo_info.h / obj.poster_logo_info.w * 135);
      ctx.drawImage(obj.code_img, //二维码
      obj.canvas_w - Number((obj.canvas_w * 0.025).toFixed(1)) - qr_code_w, 10 + 60 + bgimg_h, qr_code_w, qr_code_w);
      ctx.setFontSize(16);
      ctx.setFillStyle("#357d54");

      var resultTitle = this.breakLinesForCanvas(ctx, this.picker_sele ? this.picker_sele : this.textarea_val ? this.textarea_val : "", obj.canvas_w - Number((obj.canvas_w * 0.025).toFixed(1)) - qr_code_w - 20);
      resultTitle.forEach(function (line, index) {
        ctx.fillText(line, Number((obj.canvas_w * 0.025).toFixed(1)), 25 + 60 + bgimg_h + 20 * index);
      });

      ctx.setFontSize(14);
      ctx.setFillStyle("#357d54");

      ctx.fillText("扫码生成", obj.canvas_w - Number((obj.canvas_w * 0.025).toFixed(1)) - qr_code_w + 14, 10 + 60 + bgimg_h + qr_code_w + 20);
      ctx.fillText("萌宝海报", obj.canvas_w - Number((obj.canvas_w * 0.025).toFixed(1)) - qr_code_w + 14, 10 + 60 + bgimg_h + qr_code_w + 20 + 20);
      if (obj.list.length > 0) {
        for (var i in obj.list) {
          var cur_ = obj.list[i];
          var img_w = Number(cur_.width) * Number(cur_.scale);
          var img_h = Number(cur_.height) * Number(cur_.scale);
          var img_x = Number(cur_.left) + Number((obj.canvas_w * 0.025).toFixed(1)) - (img_w - Number(cur_.width)) / 2;
          var img_y = Number(cur_.top) + 52 - (img_h - Number(cur_.height)) / 2;
          //贴图旋转了就走这
          // if (cur_.rotate != 1) {
          //   ctx.translate(img_x, img_y);
          //   ctx.rotate(cur_.rotate * Math.PI / 180);
          //   ctx.translate(-(img_w-Number(cur_.width) / 2), -(img_y-Number(cur_.height) / 2));
          //   ctx.drawImage(cur_.image, Number((obj.canvas_w * 0.025).toFixed(1)), 52, img_w, img_h);
          // } else {
          ctx.drawImage(cur_.image, img_x, img_y, img_w, img_h);
          // }
        }
      }

      ctx.draw(false, this.CanvasToTempFilePath(obj.canvas_w, canvas_page_h, obj.canvas_pixel));
    },
    CanvasToTempFilePath: function CanvasToTempFilePath(c_w, c_h, pixelRatio) {
      var that = this;
      setTimeout(function () {
        wx.canvasToTempFilePath({
          destWidth: c_w * pixelRatio * 2,
          destHeight: c_h * pixelRatio * 2,
          canvasId: "upload_img111",
          fileType: "jpg",
          success: function success(res) {
            console.log(res.tempFilePath);
            that.$fun.hide_loading();
            that.canvas_create_img = res.tempFilePath;
            wx.setStorage({
              key: "poster",
              data: res.tempFilePath
            });

            that.go_page("/pages/make_poster/main?poster");
          },
          fail: function fail(err) {
            console.log(err);
          }
        }, that);
      }, 1000);
    },
    findBreakPoint: function findBreakPoint(text, width, ctx) {
      var min = 0;
      var max = text.length - 1;
      while (min <= max) {
        var middle = Math.floor((min + max) / 2);
        var middleWidth = ctx.measureText(text.substr(0, middle)).width;
        var oneCharWiderThanMiddleWidth = ctx.measureText(text.substr(0, middle + 1)).width;
        if (middleWidth <= width && oneCharWiderThanMiddleWidth > width) {
          return middle;
        }
        if (middleWidth < width) {
          min = middle + 1;
        } else {
          max = middle - 1;
        }
      }
      return -1;
    },
    breakLinesForCanvas: function breakLinesForCanvas(ctx, text, width) {
      var that = this;
      var result = [];
      var textArray = text.split("\r\n");
      for (var i = 0; i < textArray.length; i++) {
        var item = textArray[i];
        var breakPoint = 0;
        while ((breakPoint = that.findBreakPoint(item, width, ctx)) !== -1) {
          result.push(item.substr(0, breakPoint));
          item = item.substr(breakPoint);
        }
        if (item) {
          result.push(item);
        }
      }
      return result;
    },
    go_page: function go_page(url) {
      wx.navigateTo({
        url: url
      });
    }
  }
});

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "make_poster_page size0",
    class: [_vm.step == 2 ? 'pb200' : '']
  }, [(_vm.step == 1) ? _c('div', [_c('img', {
    staticClass: "top_bg",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p3/upload/top_bg.png',
      "mode": "aspectFit"
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "top_tit m_center",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p3/upload/page_tit.png',
      "mode": "aspectFit"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "upload_box w_80 size15",
    style: ({
      height: _vm.show_bottom ? '480rpx' : '800rpx'
    }),
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.upload_file
    }
  }, [_c('div', [_vm._v("点击上传照片")])])]) : _vm._e(), _vm._v(" "), (_vm.step == 1) ? _c('img', {
    staticClass: "bottom_bg",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p3/upload/bottom_bg.png',
      "mode": "aspectFit"
    }
  }) : _vm._e(), _vm._v(" "), (_vm.step == 2) ? _c('div', [_c('div', {
    staticClass: "upload_after_box pt10 m_center w_95 size0"
  }, [_c('img', {
    staticClass: "w_100",
    attrs: {
      "src": _vm.upload_img,
      "alt": "上传",
      "mode": "widthFix"
    }
  }), _vm._v(" "), _vm._l((_vm.list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "imgWrap",
      class: [item.active ? 'touchActive' : ''],
      style: ({
        'top': item.top + 'px',
        'left': item.left + 'px',
        'width': item.width + 'px',
        height: item.height + 'px',
        'transform': ' scale(' + item.scale + ')',
        'border-color': item.active ? '#fff' : 'transparent'
      }),
      attrs: {
        "catchtouchmove": "true"
      }
    }, [_c('img', {
      staticClass: "sticker_img_item",
      attrs: {
        "src": item.image,
        "data-id": item.id,
        "eventid": '1_' + index
      },
      on: {
        "touchstart": _vm.WraptouchStart,
        "touchmove": _vm.WraptouchMove,
        "touchend": _vm.WraptouchEnd
      }
    }), _vm._v(" "), _c('img', {
      staticClass: "x",
      staticStyle: {
        "transform-origin": "center"
      },
      style: ({
        'transform': 'scale(' + item.oScale + ')'
      }),
      attrs: {
        "src": _vm.img_baseUrl + '/2/ysl/images/p3/upload_after/close_.png',
        "eventid": '2_' + index
      },
      on: {
        "tap": _vm.deleteItem
      }
    }), _vm._v(" "), _c('img', {
      staticClass: "o",
      staticStyle: {
        "transform-origin": "center"
      },
      style: ({
        transform: 'scale(' + item.oScale + ')'
      }),
      attrs: {
        "src": _vm.img_baseUrl + '/2/ysl/images/p3/upload_after/scale.png',
        "eventid": '3_' + index
      },
      on: {
        "touchstart": _vm.oTouchStart,
        "touchmove": _vm.oTouchMove
      }
    })])
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "sticker_box bg_white w_90 p10_15"
  }, [_c('scroll-view', {
    staticClass: "sticker_sele_box",
    staticStyle: {
      "width": "100%",
      "height": "17.2vw"
    },
    attrs: {
      "scroll-x": ""
    }
  }, [_c('div', {
    staticClass: "sticker_item",
    attrs: {
      "eventid": '4'
    },
    on: {
      "click": function($event) {
        _vm.get_sticker_item_img('sticker_img1.png')
      }
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p3/page_sticker_img1.jpg',
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "sticker_item",
    attrs: {
      "eventid": '5'
    },
    on: {
      "click": function($event) {
        _vm.get_sticker_item_img('sticker_img2.png')
      }
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p3/page_sticker_img2.jpg',
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "sticker_item",
    attrs: {
      "eventid": '6'
    },
    on: {
      "click": function($event) {
        _vm.get_sticker_item_img('sticker_img3.png')
      }
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p3/page_sticker_img3.jpg',
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "sticker_item",
    attrs: {
      "eventid": '7'
    },
    on: {
      "click": function($event) {
        _vm.get_sticker_item_img('sticker_img4.png')
      }
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p3/page_sticker_img4.jpg',
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "sticker_item",
    attrs: {
      "eventid": '8'
    },
    on: {
      "click": function($event) {
        _vm.get_sticker_item_img('sticker_img5.png')
      }
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p3/page_sticker_img5.jpg',
      "alt": ""
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "flex_space_between mt20"
  }, [_c('img', {
    staticClass: "sticker_img w20 h20",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p3/upload_after/close_sticker.png',
      "mode": "aspectFit",
      "eventid": '9'
    },
    on: {
      "click": function($event) {
        _vm.step = 1, _vm.list = []
      }
    }
  }), _vm._v(" "), _c('div', [_vm._v("贴纸")]), _vm._v(" "), _c('img', {
    staticClass: "sticker_img w20 h20",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p3/upload_after/send_sticker.png',
      "mode": "aspectFit",
      "eventid": '10'
    },
    on: {
      "click": _vm.create_new_img
    }
  })])], 1)]) : _vm._e(), _vm._v(" "), (_vm.step == 3) ? _c('div', [_c('div', {
    staticClass: "w_95 m_center pt10"
  }, [_c('img', {
    staticClass: "w_100",
    attrs: {
      "src": _vm.upload_img,
      "mode": "widthFix"
    }
  }), _vm._v(" "), _vm._l((_vm.list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "imgWrap",
      style: ({
        'width': item.width + 'px',
        height: item.height + 'px',
        'transform': 'scale(' + item.scale + ')',
        'top': item.top + 'px',
        'left': item.left + 'px'
      })
    }, [_c('img', {
      staticClass: "sticker_img_item",
      attrs: {
        "src": item.image
      }
    })])
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "bottom_sele_text w_100 pb20"
  }, [_c('div', {
    staticClass: "select_text_box w_80 size15"
  }, [(_vm.show_textarea) ? _c('textarea', {
    staticClass: "textarea_",
    attrs: {
      "placeholder": "请输入宣言",
      "fixed": _vm.show_textarea ? true : false,
      "eventid": '11'
    },
    on: {
      "input": _vm.get_textarea
    }
  }) : _vm._e(), _vm._v(" "), (!_vm.show_textarea && !_vm.show_picker_val) ? _c('div', {
    staticClass: "picker_box flex"
  }, [_c('picker', {
    staticClass: "w_100 h100",
    attrs: {
      "range": _vm.picker_list,
      "eventid": '12'
    },
    on: {
      "change": _vm.pickerChange
    }
  }, [_c('div', {
    staticClass: "w_100 h100 t_center",
    staticStyle: {
      "line-height": "200rpx"
    }
  }, [_vm._v("选择拉票宣言或点击输入宣言")])])], 1) : _vm._e(), _vm._v(" "), (_vm.show_picker_val) ? _c('picker', {
    attrs: {
      "range": _vm.picker_list,
      "eventid": '13'
    },
    on: {
      "change": _vm.pickerChange
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.picker_sele))])]) : _vm._e()], 1), _vm._v(" "), (_vm.show_textarea) ? _c('div', {
    staticClass: "sele_picker t_center"
  }, [_c('picker', {
    attrs: {
      "range": _vm.picker_list,
      "eventid": '14'
    },
    on: {
      "change": _vm.pickerChange
    }
  }, [_vm._v("选择拉票宣言")])], 1) : _vm._e(), _vm._v(" "), _c('img', {
    staticClass: "create_poster_btn",
    attrs: {
      "src": _vm.img_baseUrl + '/2/ysl/images/p3/upload/make_post.png',
      "mode": "aspectFit",
      "eventid": '15'
    },
    on: {
      "click": _vm.create_poster
    }
  })])]) : _vm._e(), _vm._v(" "), _c('canvas', {
    staticClass: "canvas_box",
    style: ({
      width: '100vw',
      height: _vm.canvas_h
    }),
    attrs: {
      "canvas-id": "upload_img111"
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0029b3be", esExports)
  }
}

/***/ })

},[171]);