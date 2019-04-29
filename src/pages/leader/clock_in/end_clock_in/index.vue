<template>
  <div class="color_f6 size14 page_box">
    <div class="w_100 h_100" v-if="!edit_end_info">
      <div class="w_100 h_100 pb100">
        <map
          class="w_100 h_100"
          :latitude="map_info.lat"
          :longitude="map_info.lng"
          :markers="map_info.markers"
          show-location
        ></map>
      </div>
      <f_button :button_list="button_list" @cb="button_cb"></f_button>
    </div>
    <div class="w_100 h_100" v-if="edit_end_info">
      <div v-if="!show_result" class="pb100">
        <div class="p10_15">结束打卡信息</div>
        <edit_input :edit_input="edit_input"></edit_input>
        <map
          class="w_100 h150"
          :latitude="map_info.lat"
          :longitude="map_info.lng"
          :markers="map_info.markers"
          show-location
        ></map>
        <div class="p10_15">上传打卡照片</div>
        <div class="p10_15 bg_white">
          <upload_ :upload_info="upload_info" @cb="get_choose_img"></upload_>
        </div>
        <div class="p10_15">
          设备
          <div class="scan_code_btn" @click="get_scan_code">自备设备扫码</div>
        </div>
        <slider-left
          v-for="(item,index) in slider_list"
          :key="index"
          @delete="del_slider_item(index)"
        >
          <div class="flex_space_between w_100 bg_white size15 p10_30">
            <div class="max_w t_center">{{item}}</div>
            <div class="max_w t_center">自备</div>
            <div class="max_w t_center">同济钢轨</div>
          </div>
        </slider-left>
        <div class="p10_15">其他</div>
        <edit_textarea :edit_textarea="edit_textarea"></edit_textarea>
        <f_button :button_list="button_list1" @cb="button_cb1"></f_button>
      </div>
      <msg_panel v-if="show_result" :paramsObj="paramsObj"></msg_panel>
    </div>
  </div>
</template>
<script>
import f_button from "@/components/f_button";
import edit_input from "@/components/input_item";
import edit_textarea from "@/components/edit_textarea";
import upload_ from "@/components/upload";
import msg_panel from "@/components/msg_panel";
export default {
  name: "work_bench",
  components: {
    f_button,
    edit_input,
    upload_,
    edit_textarea,
    msg_panel
  },
  data() {
    return {
      slider_list: ["miniprof车轮", "miniprof钢轨", "波磨小车", "粗糙度仪"],
      show_result: false,
      paramsObj: {
        title: "结束作业打卡成功",
        descList: ["编号为EO13543545的,结束作业打卡成功,作业时长12:21:15"],
        btnList: [
          {
            text: "返回工作台",
            link: true
          },
          {
            text: "关闭",
            link: true,
            default: true
          }
        ]
      },
      edit_textarea: {
        v: "备注",
        placeholder: "请输入备注信息"
      },
      map_info: {
        lat: 39.90925,
        lng: 116.3125,
        markers: [
          {
            id: 1,
            latitude: 39.90925,
            longitude: 116.3125
          }
        ]
      },
      edit_input: [
        {
          v: "当前位置",
          value: " 国海大厦C座",
          hide_border: true
        }
      ],
      button_list: [
        {
          text: "操作方式"
        }
      ],
      button_list1: [
        {
          text: "结束作业打卡"
        }
      ],
      upload_info: {
        class: "img50"
      },
      edit_end_info: false
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    button_cb() {
      wx.showActionSheet({
        itemList: ["结束作业", "视频求助"],
        itemColor: "#000000",
        success: res => {
          if (res.tapIndex == 0) {
            this.edit_end_info = true;
          } else if (res.tapIndex == 1) {
            //视频求助
          }
        }
      });
    },
    button_cb1() {
      this.show_result = true;
    },
    go_page(url) {
      wx.navigateTo({ url: url });
    },
    get_choose_img(res) {
      console.log(res);
    },
    get_scan_code() {
      wx.scanCode({
        success: res => {
          console.log(res);
        }
      });
    },
    del_slider_item(idx) {
      this.slider_list.splice(idx, 1);
      this.$fun.toast("删除成功");
    }
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data());
  }
};
</script>
<style scoped>
.page_box {
  background: #f5f5f5;
  width: 100vw;
  height: 100vh;
}
.scan_code_btn {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: blue;
}
</style>
