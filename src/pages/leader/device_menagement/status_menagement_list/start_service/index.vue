<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div v-if="!show_result">
      <div class="p10_15">维修明细</div>
      <edit_input :edit_input="edit_input"></edit_input>
      <div class="p10_15 bg_white">
        <div class="flex_space_between">
          <input
            class="max_w mr10 ptb5 pl10 size15"
            type="text"
            style="border:1px solid #999;"
            placeholder="请输入序号"
          >
          <img class="img30 mr10" src="/static/images/code_btn.png" @click="scan_cb">
          <div class="page_add_btn" @click="show_device_modal=true">新增</div>
        </div>
      </div>

      <div class="p10_15">选择维修信息</div>
      <edit_time :edit_time="edit_time"></edit_time>
      <edit_textarea :edit_textarea="edit_textarea"></edit_textarea>

      <div class="device_modal_mask" v-if="show_device_modal" @click="show_device_modal=false">
        <div class="device_modal size15 plr15" @click.stop>
          <div class="device_modal_tit">设备维修</div>
          <edit_input :edit_input="edit_input1"></edit_input>
          <edit_picker :edit_picker="edit_picker" @cb="edit_picker_cb"></edit_picker>
          <edit_textarea :edit_textarea="edit_textarea1"></edit_textarea>
          <edit_input :edit_input="edit_input2"></edit_input>
          <div class="device_btn_box flex ptb15">
            <div class="device_btn max_w" @click="show_device_modal=false">取消</div>
            <div class="device_btn max_w" @click="show_device_modal=false">确定</div>
          </div>
        </div>
      </div>
      <f_button :button_list="button_list" @cb="button_cb"></f_button>
    </div>
    <msg_panel v-if="show_result" :paramsObj="paramsObj"></msg_panel>
  </div>
</template>
<script>
import edit_input from "@/components/input_item";
import edit_picker from "@/components/edit_picker";
import edit_time from "@/components/edit_time";
import edit_textarea from "@/components/edit_textarea";
import f_button from "@/components/f_button";
import msg_panel from "@/components/msg_panel";
export default {
  components: {
    f_button,
    edit_input,
    edit_time,
    edit_picker,
    msg_panel,
    edit_textarea
  },
  data() {
    return {
      show_result: false,
      show_device_modal: false,
      paramsObj: {
        title: "维修成功",
        descList: ["编号为EO13543545,您已经成功设置2台设备开始维修"],
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
      button_list: [
        {
          text: "维修"
        }
      ],
      edit_time: [
        { v: "开始时间", placeholder: "请选择维修开始时间", required: true }
      ],
      edit_textarea: {
        v: "备注",
        required: true,
        placeholder: "请输入备注信息"
      },
      edit_picker: [
        {
          v: "故障责任人",
          required: true,
          placeholder: "请选择故障责任人",
          list: [["责任人1", "责任人2"]]
        }
      ],
      edit_textarea1: {
        v: "故障描述",
        required: true,
        placeholder: "请输入故障描述"
      },
      edit_input: [
        {
          v: "设备名称",
          value: "廓形仪",
          no_arrow: true
        },
        {
          v: "固资编号",
          value: "M6655465",
          no_arrow: true
        },
        {
          v: "故障描述",
          value: "描述内容",
          no_arrow: true
        },
        {
          v: "故障责任人",
          value: "张三",
          no_arrow: true
        },
        {
          v: "维修单位",
          value: "单位名称",
          no_arrow: true
        },
        {
          v: "预估金额",
          value: "400",
          hide_border: true,
          no_arrow: true
        }
      ],
      edit_input1: [
        {
          v: "设备名称",
          value: "廓形仪",
          no_arrow: true
        },
        {
          v: "固资编号",
          value: "More400",
          no_arrow: true
        }
      ],
      edit_input2: [
        {
          v: "维修单位",
          placeholder: "请输入维修单位"
        },
        {
          v: "预估金额",
          placeholder: "请输入预估金额",
          required: true
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    button_cb() {
      this.show_result = true;
    },
    go_page(url) {
      wx.navigateTo({ url: url });
    },
    search_cb(val) {
      console.log(val);
    },
    scan_cb() {
      wx.scanCode({
        success: res => {
          console.log(res);
        }
      });
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
.page_add_btn {
  background: #1aad19;
  color: #fff;
  border-radius: 5px;
  padding: 5px 15px;
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
