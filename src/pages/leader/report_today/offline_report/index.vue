<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="bg_white">
      <flow-steps :paramsList="flowParamsList"></flow-steps>
    </div>
    <div v-if="step==1">
      <div class="p10_15">实际工作</div>
      <edit_picker :edit_picker="edit_picker" @cb="edit_picker_cb"></edit_picker>
      <edit_time :edit_time="edit_time"></edit_time>
      <edit_picker :edit_picker="edit_picker1" @cb="edit_picker_cb1"></edit_picker>
      <edit_textarea :edit_textarea="edit_textarea"></edit_textarea>
    </div>
    <div v-if="step==2">
      <div class="p10_15">工作内容</div>
      <edit_input :edit_input="edit_input"></edit_input>
      <edit_textarea :edit_textarea="edit_textarea1"></edit_textarea>
    </div>
    <msg_panel v-if="step==3" :paramsObj="paramsObj"></msg_panel>
    <f_button v-if="step!=3" :button_list="button_list" @cb="button_cb"></f_button>
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
export default {
  name: "work_bench",
  components: {
    FlowSteps,
    f_button,
    edit_input,
    edit_time,
    edit_picker,
    edit_textarea,
    msg_panel
  },
  data() {
    return {
      paramsObj: {
        title: "操作成功",
        descList: ["编号为EO13543545的日报提交成功"],
        btnList: [
          {
            text: "重新编辑",
            link: "/pages/leader/report_today/online_report/main?change_step=1"
          },
          {
            text: "新日报",
            link: "/pages/leader/report_today/online_report/main?clear=true"
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
      edit_textarea:{
        v:'详细位置',
        required:true,
        placeholder:'请输入详细位置',
        hide_border:true,
      },
      edit_textarea1:{
        v:'备注',
        placeholder:'请输入备注信息',
        hide_border:true,
      },
      edit_picker: [
        {
          required: true,
          v: "打卡记录",
          placeholder: "请选择打卡记录",
          list: [["打卡记录1", "打卡记录2"]]
        }
      ],
      edit_picker1: [
        {
          required: true,
          v: "工作类型",
          placeholder: "途中",
          list: [["车轮调查", "线路调查"]]
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
      edit_time: [
        {
          v: "上线时间",
          placeholder: "请选择上线时间"
        },
        {
          v: "下线时间",
          placeholder: "请选择下线时间"
        }
      ],
      edit_input: [
        {
          v: "团队人员",
          placeholder: "请输入团队人员"
        },
      ],

      flowParamsList: [
        {
          stepCount: 1,
          isDone: true,
          isActive: true,
          title: "今日工作"
        },
        {
          stepCount: 2,
          isDone: false,
          isActive: false,
          title: "工作明细"
        },
        {
          stepCount: 3,
          isDone: false,
          isActive: false,
          title: "填报完成"
        }
      ],
      button_list: [
        {
          text: "下一步"
        }
      ]
    };
  },
  onLoad(options) {
    console.log(options);
    if (options.clear) {
      Object.assign(this.$data, this.$options.data());
    }
    var sele_idx = (options.sele_idx ? options.sele_idx : 1) - 1,
      sele_type = options.sele_type ? options.sele_type : 0,
      picker_list = wx.getStorageSync("picker_list"),
      list = picker_list[sele_type].children[1].children,
      new_list = [];
    this.edit_picker1[0].placeholder = list[sele_idx].label;
    for (var i in list) {
      new_list.push(list[i].label);
    }
    this.edit_picker1[0].list[0] = new_list;
  },
  mounted() {},
  methods: {
    button_cb() {
      if (this.step == 1) {
        this.step = 2;
        this.flowParamsList[1].isDone = true;
        this.flowParamsList[1].isActive = true;
      } else if (this.step == 2) {
        this.$fun.confirm_modal(
          "提交日报",
          "是否确定填报无误，提交日报",
          true,
          res => {
            if (res.confirm) {
              this.$fun.loading("日报提交中..");
              setTimeout(() => {
                this.$fun.hide_loading();
                this.$fun.toast("提交成功");
                this.step = 3;
                this.flowParamsList[2].isDone = true;
                this.flowParamsList[2].isActive = true;
              }, 1000);
            }
          }
        );
      }
    },
    get_textarea_val(res) {
      console.log(res);
    },
    get_textarea_val1(res) {
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
    },
    onConfirm(e) {
      console.log(e);
    },
    show_picker() {
      this.$refs.mpvuePicker.show();
    },
    switch_nav(idx) {
      this.nav_bar.cur = idx;
      if (idx == 0) {
        this.edit_input2 = [
          {
            v: "车轮测量个数",
            placeholder: "请输入车轮个数",
            hide_border: true
          }
        ];
      } else if (idx == 1) {
        this.edit_input2 = [
          {
            v: "其他",
            placeholder: "其他",
            hide_border: true
          }
        ];
      }
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
