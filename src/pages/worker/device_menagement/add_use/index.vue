<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div v-if="!show_result">
      <div class="p10_15">领用信息</div>
      <div class="bg_white ptb10">
        <table_ :table_info="table_info"></table_>
        <div class="w_90 m_center size15">
          <div class="flex_space_between plr15 mb10">
            <div>合计</div>
            <div>3</div>
          </div>
          <div class="flex_space_between">
            <input
              class="max_w mr10 ptb5 pl10 size15"
              type="text"
              style="border:1px solid #999;"
              placeholder="请输入固定资产编号"
            >
            <img class="img30 mr10" src="/static/images/code_btn.png" @click="get_wx_scan">
            <div class="page_add_btn">新增</div>
          </div>
        </div>
      </div>

      <div class="p10_15">备注</div>
      <edit_textarea :edit_textarea="edit_textarea"></edit_textarea>
    </div>

    <msg_panel v-if="show_result" :paramsObj="paramsObj"></msg_panel>
    <f_button v-if="!show_result" :button_list="button_list" @cb="button_cb"></f_button>
  </div>
</template>
<script>
import FlowSteps from "@/components/flow_steps";
import f_button from "@/components/f_button";
import edit_picker from "@/components/edit_picker";
import edit_textarea from "@/components/edit_textarea";
import table_ from "@/components/table";
import msg_panel from "@/components/msg_panel";
export default {
  name: "work_bench",
  components: {
    FlowSteps,
    f_button,
    edit_picker,
    edit_textarea,
    msg_panel,
    table_
  },
  data() {
    return {
      show_result: false,
      table_info: {
        title: {
          num: "序号",
          name: "设备名称",
          num1: "数量"
        },
        list: [
          {
            num: "1",
            name: "轨道检测仪",
            num1: "2"
          },
          {
            num: "",
            name: "轨道检测仪",
            num1: ""
          },
          {
            num: "",
            name: "轨道检测仪",
            num1: ""
          }
        ]
      },
      paramsObj: {
        title: "领用成功",
        descList: ["编号为EO13543545,您已经成功领用2台设备"],
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
        required: true,
        v: "备注",
        placeholder: "请输入备注信息"
      },
      button_list: [
        {
          text: "领用"
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
    get_textarea_val(res) {
      console.log(res);
    },
    edit_picker_cb(res) {
      this.edit_picker[res.idx].placeholder = this.edit_picker[res.idx].list[0][
        res.value
      ];
    },
    get_wx_scan() {
      wx.scanCode({
        success: res => {}
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
.page_bottom_box {
  bottom: 90px;
  z-index: 999;
}
.page_bottom_input {
  border: 1px solid #999;
  outline: none;
}
.page_add_btn {
  background: #1aad19;
  color: #fff;
  border-radius: 5px;
  padding: 5px 15px;
}
</style>
