<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="bg_white">
      <flow-steps :paramsList="flowParamsList"></flow-steps>
    </div>
    <div v-if="step==1">
      <div class="p10_15">出库位置</div>
      <edit_picker :edit_picker="edit_picker" @cb="edit_picker_cb"></edit_picker>
      <edit_textarea :edit_textarea="edit_textarea" @cb="get_textarea_val"></edit_textarea>
    </div>
    <div v-if="step==2">
      <div class="p10_15">选择出库明细</div>
      <table_ :table_info="table_info"></table_>
      <div class="fx_b w_90 size15 page_bottom_box">
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
          <img class="img30 mr10" src="/static/images/code_btn.png" alt>
          <div class="page_add_btn">新增</div>
        </div>
      </div>
    </div>
    <msg_panel v-if="step==3" :paramsObj="paramsObj"></msg_panel>
    <f_button v-if="step!=3" :button_list="button_list" @cb="button_cb"></f_button>
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
      table_info: {
        title: {
          num: "序号",
          name: "设备名称",
          num1: "固资编号"
        },
        list: [
          {
            num: "1",
            name: "轨道检测仪",
            num1: "My324135"
          },
          {
            num: "1",
            name: "轨道检测仪",
            num1: "My324135"
          },
          {
            num: "1",
            name: "轨道检测仪",
            num1: "My324135"
          }
        ]
      },
      paramsObj: {
        title: "提交成功",
        descList: ["编号为EO13543545的车轮廓形仪新增成功"],
        btnList: [
          {
            text: "继续出库",
            link:
              "/pages/leader/device_menagement/warehouse_out/add_device_out/main"
          },
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
      step: 1,
      edit_textarea: {
        required: true,
        v: "备注",
        placeholder: "请输入备注信息"
      },
      edit_picker: [
        {
          required: true,
          v: "出库单位",
          placeholder: "请选择出库单位",
          list: [["出库单位", "出库单位1"]]
        },
        {
          required: true,
          v: "接受部门",
          placeholder: "请选择接受部门",
          list: [["接受部门", "接受部门1"]]
        }
      ],

      flowParamsList: [
        {
          stepCount: 1,
          isDone: true,
          isActive: true,
          title: "出库位置"
        },
        {
          stepCount: 2,
          isDone: false,
          isActive: false,
          title: "出库明细"
        },
        {
          stepCount: 3,
          isDone: false,
          isActive: false,
          title: "出库完成"
        }
      ],
      button_list: [
        {
          text: "下一步"
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    button_cb() {
      if (this.step == 1) {
        this.step = 2;
        this.flowParamsList[1].isDone = true;
        this.flowParamsList[1].isActive = true;
        this.button_list[0].text = "出库";
      } else if (this.step == 2) {
        this.$fun.confirm_modal(
          "设备出库",
          "设备出库成功,是否提交保存?",
          true,
          res => {
            if (res.confirm) {
              this.step = 3;
              this.flowParamsList[2].isDone = true;
              this.flowParamsList[2].isActive = true;
            }
          }
        );
      }
    },
    get_textarea_val(res) {
      console.log(res);
    },
    edit_picker_cb(res) {
      this.edit_picker[res.idx].placeholder = this.edit_picker[res.idx].list[0][
        res.value
      ];
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
