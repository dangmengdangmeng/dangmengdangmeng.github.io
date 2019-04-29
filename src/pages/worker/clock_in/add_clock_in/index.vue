<template>
  <div class="color_f6 size14 w_h100 page_box pb100">
    <div v-if="!show_result">
      <div class="p10_15">开始打卡信息</div>
      <edit_input :edit_input="edit_input"></edit_input>
      <div class="w_100 h150">
        <map
          class="w_100 h150"
          :latitude="map_info.lat"
          :longitude="map_info.lng"
          :markers="map_info.markers"
          show-location
          v-if="!show_device_modal"
        ></map>
      </div>

      <div class="p10_15">上传打卡照片</div>

      <div class="p10_15 bg_white">
        <upload_ :upload_info="upload_info" @cb="get_choose_img"></upload_>
      </div>
      <div class="p10_15">
        设备
        <div class="scan_code_btn" @click="show_actionsheet">新增设备</div>
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
      <div class="device_modal_mask" v-if="show_device_modal" @click="hide_device_modal">
        <div class="device_modal size15 plr15" @click.stop>
          <div class="device_modal_tit">借用工务设备</div>
          <edit_picker :edit_picker="edit_picker" @cb="edit_picker_cb"></edit_picker>
          <edit_input :edit_input="edit_input1"></edit_input>
          <div class="device_btn_box flex ptb15">
            <div class="device_btn max_w" @click="hide_device_modal">取消</div>
            <div class="device_btn max_w" @click="hide_device_modal">确定</div>
          </div>
        </div>
      </div>
      <f_button :button_list="button_list1" @cb="button_cb1"></f_button>
    </div>
    <msg_panel v-if="show_result" :paramsObj="paramsObj"></msg_panel>
  </div>
</template>
<script>
import f_button from "@/components/f_button";
import edit_input from "@/components/input_item";
import edit_picker from "@/components/edit_picker";
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
    msg_panel,
    edit_picker
  },
  data() {
    return {
      slider_list: ["miniprof车轮", "miniprof钢轨", "波磨小车", "粗糙度仪"],
      show_device_modal: false,
      show_result: false,
      paramsObj: {
        title: "作业打卡成功",
        descList: ["编号为EO13543545的,打卡成功,您可以进行打卡作业了"],
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
      edit_picker: [
        {
          required: true,
          v: "设备分类",
          placeholder: "请选择设备类型",
          list: [
            [
              "miniprof车轮",
              "miniprof钢轨",
              "波磨小车",
              "粗糙度仪",
              "固资笔记本",
              "声级仪",
              "添乘仪",
              "同济钢轨",
              "网络存储器",
              "验收平板",
              "仪器笔记本",
              "硬度计",
              "照相机",
              "平稳性测试仪",
              "电子平直尺"
            ]
          ]
        }
      ],
      edit_input1: [
        {
          required: true,
          v: "设备序列号",
          placeholder: " 请输入设备序列号"
        }
      ],
      button_list: [
        {
          text: "操作方式"
        }
      ],
      button_list1: [
        {
          text: "开始作业打卡"
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
    show_actionsheet() {
      wx.showActionSheet({
        itemList: ["自备设备二维码", "外界设备序列号"],
        itemColor: "#000000",
        success: res => {
          if (res.tapIndex == 0) {
            //扫码
            wx.scanCode({
              success: res => {}
            });
          } else if (res.tapIndex == 1) {
            this.show_device_modal = true;
          }
        }
      });
    },
    hide_device_modal() {
      this.show_device_modal = false;
    },
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
    edit_picker_cb(res) {
      this.edit_picker[res.idx].placeholder = this.edit_picker[res.idx].list[0][
        res.value
      ];
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
}
.scan_code_btn {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: blue;
}
.device_modal_mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  z-index: 999999;
  background: rgba(0, 0, 0, 0.5);
}
.device_modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 90%;
}
.device_modal_tit {
  text-align: center;
  padding: 30px 0 20px;
}
.device_btn_box {
  margin-top: 40px;
}
.device_btn {
  text-align: center;
}
.device_btn_box .device_btn:nth-child(1) {
  border-right: 1px solid #999;
}
.device_btn_box .device_btn:nth-child(2) {
  color: green;
}
</style>
