<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div v-if="!show_result">
      <div class="p10_15">次日计划(上线作业)</div>
      <edit_time :edit_time="edit_time"></edit_time>
      <edit_radio :edit_radio="edit_radio"></edit_radio>
      <edit_picker :edit_picker="edit_picker" @cb="edit_picker_cb"></edit_picker>

      <edit_input :edit_input="edit_input"></edit_input>
      <edit_picker :edit_picker="edit_picker1" @cb="edit_picker_cb1"></edit_picker>
      <edit_textarea :edit_textarea="edit_textarea"></edit_textarea>
      <f_button :button_list="button_list" @cb="button_cb"></f_button>
    </div>
    <msg_panel v-if="show_result" :paramsObj="paramsObj"></msg_panel>
  </div>
</template>
<script>
import FlowSteps from "@/components/flow_steps";
import f_button from "@/components/f_button";
import edit_input from "@/components/input_item";
import edit_time from "@/components/edit_time";
import edit_picker from "@/components/edit_picker";
import edit_textarea from "@/components/edit_textarea";
import msg_panel from "@/components/msg_panel";
import edit_radio from "@/components/edit_radio";

export default {
  name: "work_bench",
  components: {
    FlowSteps,
    f_button,
    edit_input,
    edit_time,
    edit_picker,
    edit_radio,
    edit_textarea,
    msg_panel
  },
  data() {
    return {
      show_result: false,
      paramsObj: {
        title: "操作成功",
        descList: ["编号为EO13543545的次日计划提交成功"],
        btnList: [
          {
            text: "重新编辑",
            link: "/pages/leader/report_today/online_report/main?change_step=1"
          },
          {
            text: "新计划",
            link: "/pages/leader/report_today/online_report/main?clear=true"
          },
          {
            text: "返回工作台",
            link: true
          }
        ]
      },
      edit_radio: [
        {
          v: "是否天窗",
          required: true,
          list: [
            {
              checked: true,
              value: "是"
            },
            {
              checked: false,
              value: "否"
            }
          ]
        }
      ],
      edit_picker: [
        {
          required: true,
          v: "工作类型",
          placeholder: "请选择工作类型",
          list: [
            [
              "未指定",
              "线路调查",
              "走访",
              "车轮测量",
              "跟车",
              "设计",
              "观测",
              "检测",
              "验收",
              "添乘",
              "办公室作业"
            ]
          ]
        },
        {
          required: true,
          v: "工作路局",
          placeholder: "请选择工作路局",
          list: [["武汉", "北京"]]
        },
        {
          required: true,
          v: "工作地点",
          placeholder: "请选择工作地点",
          list: [["武汉", "北京"]]
        }
      ],
      edit_picker1: [
        {
          required: true,
          v: "天气",
          placeholder: "请选择天气情况",
          list: [["晴天", "阴天"]]
        }
      ],
      edit_time: [
        {
          v: "上线时间",
          required: true,
          placeholder: "请选择上线时间"
        },
        {
          v: "下线时间",
          required: true,
          placeholder: "请选择下线时间"
        }
      ],
      edit_input: [
        {
          required: true,
          v: "详细位置",
          placeholder: "请输入详细位置"
        }
      ],
      edit_textarea: {
        v: "备注",
        required: true,
        placeholder: "请输入备注",
        hide_border: true
      },

      button_list: [
        {
          text: "提交次日计划"
        }
      ]
    };
  },
  onLoad(options) {
    console.log(options);
    if (options.clear) {
      Object.assign(this.$data, this.$options.data());
    }
  },
  mounted() {},
  methods: {
    button_cb() {
      this.$fun.confirm_modal(
        "新建明日计划",
        "2019-01-13日计划已创建,点击确定后保存",
        true,
        res => {
          if (res.confirm) {
            this.$fun.loading("计划提交中...");
            setTimeout(() => {
              this.$fun.hide_loading();
              this.show_result = true;
            }, 1000);
          }
        }
      );
    },
    get_textarea_val(res) {
      console.log(res);
    },
    edit_picker_cb(res) {
      this.edit_picker[res.idx].placeholder = this.edit_picker[res.idx].list[0][
        res.value
      ];
    },
    edit_picker_cb1(res) {
      this.edit_picker1[res.idx].placeholder = this.edit_picker1[
        res.idx
      ].list[0][res.value];
    },
    go_page(url) {
      wx.navigateTo({ url: url });
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
.next_btn {
  color: #fff;
  background: #1aad19;
  padding: 8px 0;
  text-align: center;
  border-radius: 6px;
}
</style>
