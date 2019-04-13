<template>
  <div class="make_poster_page size0" :class="[step==2?'pb200':'']">
    <!--step1 用户上传图片 -->
    <div v-if="step==1">
      <img
        class="top_bg"
        :src="img_baseUrl+'/2/ysl/images/p3/upload/top_bg.png'"
        mode="aspectFit"
      >
      <img
        class="top_tit m_center"
        :src="img_baseUrl+'/2/ysl/images/p3/upload/page_tit.png'"
        mode="aspectFit"
      >
      <div
        class="upload_box w_80 size15"
        :style="{height:show_bottom?'480rpx':'800rpx'}"
        @click="upload_file"
      >
        <div>点击上传照片</div>
      </div>
    </div>
    <img
      v-if="step==1"
      class="bottom_bg"
      :src="img_baseUrl+'/2/ysl/images/p3/upload/bottom_bg.png'"
      mode="aspectFit"
    >
    <!-- step2 用户选择贴纸 -->
    <div v-if="step==2">
      <!-- 用户上传照片后 显示的照片 -->
      <div class="upload_after_box pt10 m_center w_95 size0">
        <img class="w_100" :src="upload_img" alt="上传" mode="widthFix">
        <!-- <div class="close_img_btn">
        <img :src="img_baseUrl+'/2/ysl/images/p3/upload/close.png'" alt>
        </div>-->

        <div
          class="imgWrap"
          :class="[item.active? 'touchActive':'']"
          v-for="(item,index) in list"
          :key="index"
          catchtouchmove="true"
          :style="{'top':item.top+'px','left':item.left+'px','width':item.width+'px',height:item.height+'px','transform':  ' scale('+item.scale+')','border-color':item.active?'#fff':'transparent'}"
        >
          <!-- 'rotate('+item.angle+'deg) -->
          <img
            class="sticker_img_item"
            :src="item.image"
            :data-id="item.id"
            @touchstart="WraptouchStart"
            @touchmove="WraptouchMove"
            @touchend="WraptouchEnd"
          >
          <img
            class="x"
            :src="img_baseUrl+'/2/ysl/images/p3/upload_after/close_.png'"
            style="transform-origin:center;"
            :style="{'transform':'scale('+item.oScale+')'}"
            @tap="deleteItem"
          >
          <img
            class="o"
            :src="img_baseUrl+'/2/ysl/images/p3/upload_after/scale.png'"
            :style="{transform: 'scale('+item.oScale+')'}"
            style="transform-origin:center;"
            @touchstart="oTouchStart"
            @touchmove="oTouchMove"
          >
        </div>
      </div>
      <div class="sticker_box bg_white w_90 p10_15">
        <scroll-view class="sticker_sele_box" scroll-x style="width:100%;height:17.2vw;">
          <div class="sticker_item" @click="get_sticker_item_img('sticker_img1.png')">
            <img :src="img_baseUrl+'/2/ysl/images/p3/page_sticker_img1.jpg'" alt>
          </div>
          <div class="sticker_item" @click="get_sticker_item_img('sticker_img2.png')">
            <img :src="img_baseUrl+'/2/ysl/images/p3/page_sticker_img2.jpg'" alt>
          </div>
          <div class="sticker_item" @click="get_sticker_item_img('sticker_img3.png')">
            <img :src="img_baseUrl+'/2/ysl/images/p3/page_sticker_img3.jpg'" alt>
          </div>
          <div class="sticker_item" @click="get_sticker_item_img('sticker_img4.png')">
            <img :src="img_baseUrl+'/2/ysl/images/p3/page_sticker_img4.jpg'" alt>
          </div>
          <div class="sticker_item" @click="get_sticker_item_img('sticker_img5.png')">
            <img :src="img_baseUrl+'/2/ysl/images/p3/page_sticker_img5.jpg'" alt>
          </div>
        </scroll-view>
        <div class="flex_space_between mt20">
          <img
            class="sticker_img w20 h20"
            :src="img_baseUrl+'/2/ysl/images/p3/upload_after/close_sticker.png'"
            mode="aspectFit"
            @click="step=1,list=[]"
          >
          <div>贴纸</div>
          <img
            class="sticker_img w20 h20"
            :src="img_baseUrl+'/2/ysl/images/p3/upload_after/send_sticker.png'"
            mode="aspectFit"
            @click="create_new_img"
          >
        </div>
      </div>
    </div>
    <!-- step3 用户选择宣言 -->
    <div v-if="step==3">
      <!-- 用户选择完图片并加了贴纸后显示 -->
      <div class="w_95 m_center pt10">
        <img :src="upload_img" class="w_100" mode="widthFix">
        <div
          class="imgWrap"
          v-for="(item,index) in list"
          :key="index"
          :style="{'width':item.width+'px',height:item.height+'px','transform': 'scale('+item.scale+')','top':item.top+'px','left':item.left+'px'}"
        >
          <!-- 'rotate('+item.angle+'deg)  -->
          <img class="sticker_img_item" :src="item.image">
        </div>
      </div>
      <div class="bottom_sele_text w_100 pb20">
        <div class="select_text_box w_80 size15">
          <textarea
            class="textarea_"
            v-if="show_textarea"
            placeholder="请输入宣言"
            :fixed="show_textarea?true:false"
            @input="get_textarea"
          ></textarea>

          <div class="picker_box flex" v-if="!show_textarea&&!show_picker_val">
            <picker @change="pickerChange" class="w_100 h100" :range="picker_list">
              <div class="w_100 h100 t_center" style="line-height:200rpx">选择拉票宣言或点击输入宣言</div>
            </picker>
            <!-- <span class="mlr5">或</span>
            <span @click="show_textarea=true,back_init_text='返回选择宣言'">点击输入宣言</span>-->
          </div>
          <picker @change="pickerChange" v-if="show_picker_val" :range="picker_list">
            <span>{{picker_sele}}</span>
          </picker>
        </div>

        <div class="sele_picker t_center" v-if="show_textarea">
          <picker @change="pickerChange" :range="picker_list">选择拉票宣言</picker>
        </div>
        <img
          class="create_poster_btn"
          :src="img_baseUrl+'/2/ysl/images/p3/upload/make_post.png'"
          mode="aspectFit"
          @click="create_poster"
        >
      </div>
    </div>
    <canvas canvas-id="upload_img111" class="canvas_box" :style="{width:'100vw',height:canvas_h}"></canvas>
  </div>
</template>
<script>
var items = [];
var _id = -1;
export default {
  data() {
    return {
      step: 1,
      picker_list: [
        "点击输入宣言",
        "请为我爆肝投票！",
        "小哥哥小姐姐，就差你一票我就能出道！",
        "看到这么萌的小宝贝，怎么忍心不投一票？",
        "让犹豫走掉，选择我就好！",
        "一票是情，两票是爱！"
      ],
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
      img_baseUrl: ""
    };
  },
  onLoad() {
    this.img_baseUrl = this.$api.host;
  },
  onShow() {
    this.show_textarea = false;
    this.show_picker_val = false;
  },
  mounted() {
    this.phone_info = wx.getSystemInfoSync();
  },
  methods: {
    back_init() {
      this.show_textarea = false;
      this.show_picker_val = false;
    },
    pickerChange(e) {
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
    get_textarea(e) {
      this.picker_sele = "";
      this.textarea_val = e.target.value;
    },
    upload_file() {
      wx.chooseImage({
        count: 1,
        success: res => {
          // console.log(res);
          this.upload_img = res.tempFilePaths[0];
          this.step = 2;
        }
      });
    },
    get_sticker_item_img(url) {
      let data = {};
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
    WraptouchStart(e) {
      // console.log(e);
      for (let i = 0; i < items.length; i++) {
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
    WraptouchMove(e) {
      if (this.flag) {
        this.flag = false;
        setTimeout(() => {
          this.flag = true;
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
    WraptouchEnd() {},
    oTouchStart(e) {
      //找到点击的那个图片对象，并记录
      for (let i = 0; i < items.length; i++) {
        items[i].active = false;
      }
      items[this.index].active = true;
      //获取作为移动前角度的坐标
      items[this.index].tx = e.touches[0].clientX;
      items[this.index].ty = e.touches[0].clientY;
      //移动前的角度
      items[this.index].anglePre = this.countDeg(
        items[this.index].x,
        items[this.index].y,
        items[this.index].tx,
        items[this.index].ty
      );
      //获取图片半径
      items[this.index].r = this.getDistancs(
        items[this.index].x,
        items[this.index].y,
        items[this.index].left,
        items[this.index].top
      );
      // console.log("otouchstart", items[this.index]);
    },
    oTouchMove(e) {
      if (this.flag) {
        this.flag = false;
        setTimeout(() => {
          this.flag = true;
        }, 100);
      }
      //记录移动后的位置
      items[this.index]._tx = e.touches[0].clientX;
      items[this.index]._ty = e.touches[0].clientY;
      //移动的点到圆心的距离
      items[this.index].disPtoO = this.getDistancs(
        items[this.index].x,
        items[this.index].y,
        items[this.index]._tx,
        items[this.index]._ty - 10
      );

      items[this.index].scale = items[this.index].disPtoO / items[this.index].r;
      items[this.index].oScale = 1 / items[this.index].scale;

      //移动后位置的角度
      items[this.index].angleNext = this.countDeg(
        items[this.index].x,
        items[this.index].y,
        items[this.index]._tx,
        items[this.index]._ty
      );
      //角度差
      items[this.index].new_rotate =
        items[this.index].angleNext - items[this.index].anglePre;

      //叠加的角度差
      items[this.index].rotate += items[this.index].new_rotate;
      items[this.index].angle = items[this.index].rotate; //赋值

      //用过移动后的坐标赋值为移动前坐标
      items[this.index].tx = e.touches[0].clientX;
      items[this.index].ty = e.touches[0].clientY;
      items[this.index].anglePre = this.countDeg(
        items[this.index].x,
        items[this.index].y,
        items[this.index].tx,
        items[this.index].ty
      );
      this.list = items;
    },
    getDistancs(cx, cy, pointer_x, pointer_y) {
      var ox = pointer_x - cx;
      var oy = pointer_y - cy;
      return Math.sqrt(ox * ox + oy * oy);
    },
    /*
     *参数1和2为图片圆心坐标
     *参数3和4为手点击的坐标
     *返回值为手点击的坐标到圆心的角度
     */
    countDeg(cx, cy, pointer_x, pointer_y) {
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
    deleteItem(e) {
      let newList = [];
      for (let i = 0; i < this.list.length; i++) {
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
    create_new_img() {
      this.$fun.loading("生成贴图中...");
      setTimeout(() => {
        this.$fun.hide_loading();
        this.step = 3;
      }, 1000);
    },
    create_poster() {
      this.$fun.loading("生成海报中");
      wx.getImageInfo({
        src: "https://ysl.entfly.com/2/ysl/images/p3/poster/poster_img.png",
        success: poster_img => {
          wx.getImageInfo({
            src: "https://ysl.entfly.com/2/ysl/images/p3/poster/logo.png",
            success: poster_logo => {
              wx.getImageInfo({
                src:
                  "https://ysl.entfly.com/2/ysl/images/p3/poster/qr_code.png",
                success: code_info => {
                  wx.getImageInfo({
                    src: this.upload_img,
                    success: bg_ => {
                      this.canvas_pixel = this.phone_info.pixelRatio;
                      this.draw_img({
                        bg_info: {
                          img: this.upload_img,
                          w: Number(bg_.width),
                          h: Number(bg_.height)
                        },
                        canvas_w: this.phone_info.windowWidth,
                        canvas_h: this.phone_info.windowHeight,
                        canvas_pixel: this.phone_info.pixelRatio,
                        list: this.list,
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
    draw_img(obj) {
      console.log(obj);
      var ctx = wx.createCanvasContext("upload_img111"),
        bgimg_w = Number((obj.canvas_w * 0.95).toFixed(1)),
        bgimg_h = Number((obj.bg_info.h / obj.bg_info.w * bgimg_w).toFixed(1)),
        qr_code_w = 80,
        canvas_page_h = 60 + bgimg_h + qr_code_w + 100;
      this.canvas_h = canvas_page_h + "px";
      ctx.setFillStyle("#cfe7cc");
      ctx.fillRect(0, 0, obj.canvas_w, canvas_page_h);
      ctx.drawImage(
        obj.bg_info.img, //背景图路径
        Number((obj.canvas_w * 0.025).toFixed(1)),
        60,
        bgimg_w,
        bgimg_h
      );
      ctx.drawImage(
        obj.poster_img_info.img, //顶部logo
        Number((obj.canvas_w * 0.025).toFixed(1)),
        10,
        155,
        obj.poster_img_info.h / obj.poster_img_info.w * 155
      );
      ctx.drawImage(
        obj.poster_logo_info.img, //logo
        Number((obj.canvas_w * 0.025).toFixed(1)),
        10 + 60 + bgimg_h + 60 + 10,
        135,
        obj.poster_logo_info.h / obj.poster_logo_info.w * 135
      );
      ctx.drawImage(
        obj.code_img, //二维码
        obj.canvas_w - Number((obj.canvas_w * 0.025).toFixed(1)) - qr_code_w,
        10 + 60 + bgimg_h,
        qr_code_w,
        qr_code_w
      );
      ctx.setFontSize(16);
      ctx.setFillStyle("#357d54");

      var resultTitle = this.breakLinesForCanvas(
        ctx,
        this.picker_sele
          ? this.picker_sele
          : this.textarea_val
            ? this.textarea_val
            : "",
        obj.canvas_w -
          Number((obj.canvas_w * 0.025).toFixed(1)) -
          qr_code_w -
          20
      );
      resultTitle.forEach(function(line, index) {
        ctx.fillText(
          line,
          Number((obj.canvas_w * 0.025).toFixed(1)),
          25 + 60 + bgimg_h + 20 * index
        );
      });

      ctx.setFontSize(14);
      ctx.setFillStyle("#357d54");

      ctx.fillText(
        "扫码生成",
        obj.canvas_w -
          Number((obj.canvas_w * 0.025).toFixed(1)) -
          qr_code_w +
          14,
        10 + 60 + bgimg_h + qr_code_w + 20
      );
      ctx.fillText(
        "萌宝海报",
        obj.canvas_w -
          Number((obj.canvas_w * 0.025).toFixed(1)) -
          qr_code_w +
          14,
        10 + 60 + bgimg_h + qr_code_w + 20 + 20
      );
      if (obj.list.length > 0) {
        for (var i in obj.list) {
          var cur_ = obj.list[i];
          var img_w = Number(cur_.width) * Number(cur_.scale);
          var img_h = Number(cur_.height) * Number(cur_.scale);
          var img_x =
            Number(cur_.left) +
            Number((obj.canvas_w * 0.025).toFixed(1)) -
            (img_w - Number(cur_.width)) / 2;
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

      ctx.draw(
        false,
        this.CanvasToTempFilePath(obj.canvas_w, canvas_page_h, obj.canvas_pixel)
      );
    },
    CanvasToTempFilePath(c_w, c_h, pixelRatio) {
      var that = this;
      setTimeout(function() {
        wx.canvasToTempFilePath(
          {
            destWidth: c_w * pixelRatio * 2,
            destHeight: c_h * pixelRatio * 2,
            canvasId: "upload_img111",
            fileType: "jpg",
            success: res => {
              console.log(res.tempFilePath);
              that.$fun.hide_loading();
              that.canvas_create_img = res.tempFilePath;
              wx.setStorage({
                key: "poster",
                data: res.tempFilePath
              });

              that.go_page("/pages/make_poster/main?poster");
            },
            fail: err => {
              console.log(err);
            }
          },
          that
        );
      }, 1000);
    },
    findBreakPoint(text, width, ctx) {
      var min = 0;
      var max = text.length - 1;
      while (min <= max) {
        var middle = Math.floor((min + max) / 2);
        var middleWidth = ctx.measureText(text.substr(0, middle)).width;
        var oneCharWiderThanMiddleWidth = ctx.measureText(
          text.substr(0, middle + 1)
        ).width;
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
    breakLinesForCanvas(ctx, text, width) {
      var that = this;
      var result = [];
      var textArray = text.split("\r\n");
      for (let i = 0; i < textArray.length; i++) {
        let item = textArray[i];
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
    go_page(url) {
      wx.navigateTo({
        url: url
      });
    }
  }
};
</script>

<style scoped>
.make_poster_page {
  background: #cfe7cc;
  width: 100vw;
  min-height: 100vh;
}
.top_bg {
  width: 100%;
  height: 90px;
}
.top_tit {
  display: block;
  width: 50%;
  height: 50px;
}
.upload_box {
  margin: 10px auto 0;
  border: 1px solid #999;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #357d54;
}
.select_text_box {
  margin: 10px auto 0;
  border: 1px solid #999;
  height: 100px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #357d54;
}
.picker_box {
  width: 100%;
  height: 100%;
}
.sele_picker {
  margin-top: 10px;
  color: #357d54;
}
.textarea_ {
  width: 90%;
  height: 90%;
}
.create_poster_btn {
  width: 80%;
  height: 40px;
  display: block;
  margin: 10px auto 0;
}
.upload_after_box {
}
.close_img_btn {
  position: absolute;
  right: 0px;
  top: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
}
.close_img_btn img {
  width: 88%;
  height: 88%;
}
.bottom_bg {
  position: absolute;
  left: -5px;
  bottom: 0;
  width: 100%;
  height: 60px;
}

.sticker_box {
  position: fixed;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  overflow: hidden;
  white-space: nowrap;
  z-index: 99999;
}
.sticker_sele_box {
}
.sticker_item {
  width: 17.2vw;
  height: 17.2vw;
  display: inline-block;
  margin-right: 1vw;
}
.sticker_item:last-child {
  margin-right: 1vw;
}
.sticker_item img {
  width: 100%;
  height: 100%;
}
.touch_box {
  position: absolute;
  left: 0;
  top: 0;
}
.touch_item {
  position: absolute;
  border: 1px dashed #666;
}
.touch_sticker_img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.close_sticker {
  position: absolute;
  right: -10px;
  top: -10px;
}
.scale_sticker {
  position: absolute;
  left: -10px;
  bottom: -10px;
}
.canvas_box {
  position: fixed;
  left: -1000vw;
  top: -1000vh;
  /* margin-top: 200px; */
}
.bottom_sele_text {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #cfe7cc;
  z-index: 99999;
}
.sticker_item1 {
  position: absolute;
}
.imgWrap {
  transform-origin: center;
  position: absolute;
  z-index: 100;
  box-sizing: border-box;
  border: 5rpx transparent dashed;
}
.sticker_img_item {
  width: 100%;
  height: 100%;
}
.touchActive .x {
  display: block;
}

.touchActive .o {
  display: block;
}

.x {
  position: absolute;
  top: -25rpx;
  left: -25rpx;
  z-index: 500;
  display: none;
  width: 50rpx;
  height: 50rpx;
  overflow: hidden;
  font-weight: bold;
  color: #d1e3f1;
}
.o {
  position: absolute;
  bottom: -25rpx;
  right: -25rpx;
  width: 50rpx;
  height: 50rpx;
  text-align: center;
  display: none;
  overflow: hidden;
  font-weight: bold;
  color: #d1e3f1;
}
.active {
  background-color: rgb(78, 114, 151);
}

.active view {
  border: none;
}
.touchActive {
  /* border: 4rpx #fff dashed; */
  z-index: 400;
}
</style>