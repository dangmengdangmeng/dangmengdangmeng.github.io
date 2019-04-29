<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div v-if="!show_result">
      <div class="p10_15">编辑明细</div>
      <div class="bg_white pb100" style="min-height:300px">
        <div
          class="flex t_center b_t"
          :class="[index==table_info.length-1?'b_b':'']"
          v-for="(item,index) in table_info"
          :key="index"
        >
          <div class="w70 ptb5 b_r" style="min-height:34px">{{item[0]}}</div>
          <div class="max_w ptb5 b_r" style="min-height:34px">{{item[1]}}</div>
          <div class="w70 ptb5 b_r" style="min-height:34px">{{item[2]}}</div>
          <div class="w70 ptb5" style="min-height:34px">{{item[3]}}</div>
        </div>

        <div class="w_100 plr15 page_center_box">
          <div class="w_100 flex_space_between">
            <div>合计</div>
            <div>3</div>
          </div>
          <div class="flex_space_between ptb10">
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
      </div>
      <div class="device_modal_mask" v-if="show_device_modal" @click="show_device_modal=false">
        <div class="device_modal size15 plr15" @click.stop>
          <div class="device_modal_tit">设备维修</div>
          <edit_input :edit_input="edit_input"></edit_input>
          <edit_picker :edit_picker="edit_picker" @cb="edit_picker_cb"></edit_picker>
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
import f_button from "@/components/f_button";
import msg_panel from "@/components/msg_panel";
import edit_input from "@/components/input_item";
import edit_picker from "@/components/edit_picker";

export default {
  components: {
    f_button,
    msg_panel,
    edit_picker,
    edit_input
  },
  data() {
    return {
      show_device_modal: false,
      edit_input: [
        {
          v: "设备名称",
          value: "轨道检测仪",
          no_arrow: true
        },
        {
          v: "原始状态",
          value: "正常",
          no_arrow: true
        }
      ],
      edit_picker: [
        {
          v: "当前状态",
          placeholder: "请选择设备状态",
          list: [["正常", "故障"]]
        }
      ],
      show_result: false,
      paramsObj: {
        title: "编辑成功",
        descList: ["编号为EO13543545,设备状态编辑成功."],
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
      table_info: [
        ["序号", "设备名称", "原始状态", "当前状态"],
        ["1", "轨道检测仪", "", ""],
        ["", "M9812739821", "正常", "故障"],
        ["", "M9812739821", "正常", "故障"]
      ],
      button_list: [
        {
          text: "编辑"
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
    edit_picker_cb(res) {
      this.edit_picker[res.idx].placeholder = this.edit_picker[res.idx].list[0][
        res.value
      ];
    },
    scan_cb(){
      wx.scanCode({
        success:res=>{}
      })
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
.page_center_box {
  position: absolute;
  left: 0;
  bottom: 0;
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
