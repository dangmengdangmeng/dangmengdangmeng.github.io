<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="bg_white">
      <flow-steps :paramsList="flowParamsList"></flow-steps>
    </div>
    <div v-if="step==1">
      <div class="p10_15">今日工作</div>
      <edit_picker :edit_picker="edit_picker" @cb="edit_picker_cb"></edit_picker>
      <edit_time :edit_time="edit_time"></edit_time>
      <edit_radio :edit_radio="edit_radio"></edit_radio>
      <edit_input :edit_input="edit_input"></edit_input>
      <edit_picker :edit_picker="edit_picker1" @cb="edit_picker_cb1"></edit_picker>
      <edit_textarea :edit_textarea="edit_textarea" @cb="get_textarea_val"></edit_textarea>
      <edit_input :edit_input="edit_input1"></edit_input>
      <edit_textarea :edit_textarea="edit_textarea1" @cb="get_textarea_val1"></edit_textarea>
    </div>
    <div v-if="step==2">
      <nav_bar :nav_bar="nav_bar" @cb="switch_nav"></nav_bar>
      <div class="mt10" v-if="nav_bar.cur==0">
        <div v-if="sele_text=='车轮调查'">
          <edit_input :edit_input="nav_show_arr[0].edit_input"></edit_input>
        </div>
        <div v-if="sele_text=='线路调查'">
          <edit_input :edit_input="nav_show_arr[1].edit_input"></edit_input>
        </div>
        <div v-if="sele_text=='道岔调查'">
          <edit_input :edit_input="nav_show_arr[2].edit_input"></edit_input>
        </div>
        <div v-if="sele_text=='线路跟车'">
          <edit_picker :edit_picker="nav_show_arr[3].edit_picker" @cb="edit_picker_cb2"></edit_picker>
          <edit_input :edit_input="nav_show_arr[3].edit_input"></edit_input>
          <edit_picker :edit_picker="nav_show_arr[3].edit_picker1" @cb="edit_picker_cb3"></edit_picker>
          <edit_time :edit_time="nav_show_arr[3].edit_time"></edit_time>
          <edit_picker :edit_picker="nav_show_arr[3].edit_picker2" @cb="edit_picker_cb4"></edit_picker>
          <edit_input :edit_input="nav_show_arr[3].edit_input1"></edit_input>
        </div>
        <div v-if="sele_text=='道岔验收'">
          <edit_input :edit_input="nav_show_arr[4].edit_input"></edit_input>
        </div>
        <div v-if="sele_text=='小机指导'">
          <edit_input :edit_input="nav_show_arr[5].edit_input"></edit_input>
        </div>
        <div v-if="sele_text=='线路验收'">
          <edit_input :edit_input="nav_show_arr[6].edit_input"></edit_input>
        </div>
        <div v-if="sele_text=='道岔跟车'">
          <edit_picker :edit_picker="nav_show_arr[7].edit_picker" @cb="edit_picker_cb5"></edit_picker>
          <edit_input :edit_input="nav_show_arr[7].edit_input"></edit_input>
          <edit_picker :edit_picker="nav_show_arr[7].edit_picker1" @cb="edit_picker_cb6"></edit_picker>
          <edit_time :edit_time="nav_show_arr[7].edit_time"></edit_time>
          <edit_input :edit_input="nav_show_arr[7].edit_input1"></edit_input>
        </div>
        <div v-if="sele_text=='线路观测'">
          <edit_input :edit_input="nav_show_arr[8].edit_input"></edit_input>
        </div>
        <div v-if="sele_text=='道岔观测'">
          <edit_input :edit_input="nav_show_arr[9].edit_input"></edit_input>
        </div>
        <div v-if="sele_text=='全项目检测'">
          <edit_input :edit_input="nav_show_arr[10].edit_input"></edit_input>
        </div>
        <div v-if="sele_text=='添乘'">
          <edit_input :edit_input="nav_show_arr[11].edit_input"></edit_input>
          <edit_time :edit_time="nav_show_arr[11].edit_time"></edit_time>
          <edit_input :edit_input="nav_show_arr[11].edit_input1"></edit_input>
        </div>
        <div v-if="sele_text=='预评估'">
          <edit_input :edit_input="nav_show_arr[12].edit_input"></edit_input>
        </div>
      </div>
      <div class="mt10" v-if="nav_bar.cur==1">
        <!-- 切换到其他的时候 -->
        <edit_radio :edit_radio="edit_radio1"></edit_radio>
        <edit_input :edit_input="edit_input2"></edit_input>
        <edit_radio :edit_radio="edit_radio2"></edit_radio>
        <edit_textarea :edit_textarea="edit_textarea2" @cb="get_textarea_val2"></edit_textarea>
      </div>
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
import edit_radio from "@/components/edit_radio";
import edit_textarea from "@/components/edit_textarea";
import nav_bar from "@/components/nav_bar";
import msg_panel from "@/components/msg_panel";
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
    nav_bar,
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
            link: "/pages/worker/report_today/online_report/main?change_step=1"
          },
          {
            text: "新日报",
            link: "/pages/worker/report_today/online_report/main?clear=true"
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
      nav_bar: {
        cur: 0,
        list: ["作业详情", "其他"]
      },
      edit_textarea: {
        required: true,
        v: "详细位置",
        placeholder: "请输入详细位置"
      },
      edit_textarea1: {
        v: "存在问题",
        placeholder: "请输入存在问题"
      },
      edit_textarea2: {
        v: "备注",
        placeholder: "请输入备注信息"
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
      edit_radio1: [
        {
          v: "是否夜间",
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
      edit_radio2: [
        {
          v: "是否高原作业",
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
          v: "打卡记录",
          placeholder: "请选择打卡记录",
          list: [["打卡记录1", "打卡记录2"]]
        }
      ],
      edit_picker1: [
        {
          required: true,
          v: "工作类型",
          placeholder: "车轮调查",
          list: [["车轮调查", "线路调查"]]
        },
        {
          required: true,
          v: "工作路局",
          placeholder: "武汉",
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
          v: "天窗命令号",
          required: true,
          placeholder: "请输入天窗命令号"
        }
      ],
      edit_input1: [
        {
          v: "团队人员",
          placeholder: "请输入团队人员"
        },
        {
          v: "配合人员",
          placeholder: "请输入工务配合人员"
        }
      ],
      edit_input2: [
        {
          v: "夜班时长",
          placeholder: "请输入夜班作业小时"
        },
        {
          v: "徒步距离",
          placeholder: "请输入徒步公里数",
          hide_border: true
        }
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
      ],
      nav_show_arr: [
        {
          text: "车轮调查",
          edit_input: [
            {
              v: "车轮测量个数",
              placeholder: "请输入车轮个数",
              hide_border: true
            }
          ]
        },
        {
          text: "线路调查",
          edit_input: [
            {
              v: "曲线测量个数",
              placeholder: "请输入曲线测量个数"
            },
            {
              v: "曲线测量点数量",
              placeholder: "请输入曲线测量点数"
            },
            {
              v: "直线测量个数",
              placeholder: "请输入直线测量个数"
            },
            {
              v: "直线测量点个数",
              placeholder: "请输入直线测量点数量",
              hide_border: true
            }
          ]
        },
        {
          text: "道岔调查",
          edit_input: [
            {
              v: "道岔测量组数",
              placeholder: "请输入道岔测量组数"
            },
            {
              v: "道岔测量点数量",
              placeholder: "请输入道岔测量点数量",
              hide_border: true
            }
          ]
        },
        {
          text: "线路跟车",
          edit_picker: [
            {
              required: true,
              v: "大机编号",
              placeholder: "请选择大机编号",
              list: [["大机编号1", "大机编号2"]]
            }
          ],
          edit_input: [
            {
              required: true,
              v: "打磨策略",
              placeholder: "请输入打磨策略"
            }
          ],
          edit_picker1: [
            {
              required: true,
              v: "策略执行情况",
              placeholder: "请选择实际作业情况",
              list: [["情况1", "情况2"]]
            }
          ],
          edit_time: [
            {
              v: "作业开始时间",
              required: true,
              placeholder: "请选择开始时间"
            },
            {
              v: "作业结束时间",
              required: true,
              placeholder: "请选择结束时间"
            }
          ],
          edit_picker2: [
            {
              v: "项目名称",
              placeholder: "请选择项目名称",
              list: [["名称1", "名称2"]]
            }
          ],
          edit_input1: [
            {
              required: true,
              v: "作业开始里程",
              placeholder: "请输入开始里程"
            },
            {
              required: true,
              v: "作业结束里程",
              placeholder: "请输入结束里程",
              hide_border: true
            }
          ]
        },
        {
          text: "道岔验收",
          edit_input: [
            {
              v: "道岔测量组数",
              placeholder: "请输入道岔测量组数"
            },
            {
              v: "道岔测量点数量",
              placeholder: "请输入道岔测量点数量",
              hide_border: true
            }
          ]
        },
        {
          text: "小机指导",
          edit_input: [
            {
              v: "道岔测量组数",
              placeholder: "请输入道岔测量组数"
            },
            {
              v: "道岔测量点数量",
              placeholder: "请输入道岔测量点数量",
              hide_border: true
            }
          ]
        },
        {
          text: "线路验收",
          edit_input: [
            {
              v: "曲线测量个数",
              placeholder: "请输入曲线测量个数"
            },
            {
              v: "曲线测量点数量",
              placeholder: "请输入曲线测量点数"
            },
            {
              v: "直线测量个数",
              placeholder: "请输入直线测量个数"
            },
            {
              v: "直线测量点个数",
              placeholder: "请输入直线测量点数量",
              hide_border: true
            }
          ]
        },
        {
          text: "道岔跟车",
          edit_picker: [
            {
              required: true,
              v: "大机编号",
              placeholder: "请选择大机编号",
              list: [["大机编号1", "大机编号2"]]
            }
          ],
          edit_input: [
            {
              required: true,
              v: "打磨策略",
              placeholder: "请输入打磨策略"
            }
          ],
          edit_picker1: [
            {
              required: true,
              v: "策略执行情况",
              placeholder: "请选择实际作业情况",
              list: [["情况1", "情况2"]]
            }
          ],
          edit_time: [
            {
              v: "作业开始时间",
              required: true,
              placeholder: "请选择开始时间"
            },
            {
              v: "作业结束时间",
              required: true,
              placeholder: "请选择结束时间"
            }
          ],
          edit_input1: [
            {
              required: true,
              v: "作业开始里程",
              placeholder: "请输入开始里程"
            },
            {
              required: true,
              v: "作业结束里程",
              placeholder: "请输入结束里程",
              hide_border: true
            }
          ]
        },
        {
          text: "线路观测",
          edit_input: [
            {
              v: "曲线测量个数",
              placeholder: "请输入曲线测量个数"
            },
            {
              v: "曲线测量点数量",
              placeholder: "请输入曲线测量点数"
            },
            {
              v: "直线测量个数",
              placeholder: "请输入直线测量个数"
            },
            {
              v: "直线测量点个数",
              placeholder: "请输入直线测量点数量",
              hide_border: true
            }
          ]
        },
        {
          text: "道岔观测",
          edit_input: [
            {
              v: "道岔测量组数",
              placeholder: "请输入道岔测量组数"
            },
            {
              v: "道岔测量点数量",
              placeholder: "请输入道岔测量点数量",
              hide_border: true
            }
          ]
        },
        {
          text: "全项目检测",
          edit_input: [
            {
              v: "曲线测量个数",
              placeholder: "请输入曲线测量个数"
            },
            {
              v: "曲线测量点数量",
              placeholder: "请输入曲线测量点数"
            },
            {
              v: "直线测量个数",
              placeholder: "请输入直线测量个数"
            },
            {
              v: "直线测量点个数",
              placeholder: "请输入直线测量点数量"
            },
            {
              v: "道岔测量组数",
              placeholder: "请输入道岔测量组数"
            },
            {
              v: "道岔测量点数量",
              placeholder: "请输入道岔测量点数量",
              hide_border: true
            }
          ]
        },
        {
          text: "添乘",
          edit_input: [
            {
              required: true,
              v: "车次",
              placeholder: "请输入车次"
            },
            {
              v: "开始车站",
              required: true,
              placeholder: "请输入开始车站"
            },
            {
              v: "结束车站",
              required: true,
              placeholder: "请输入结束车站"
            }
          ],
          edit_time: [
            {
              v: "开始时间",
              required: true,
              placeholder: "请选择开始时间"
            },
            {
              v: "结束时间",
              required: true,
              placeholder: "请选择结束时间"
            }
          ],
          edit_input1: [
            {
              required: true,
              v: "发现问题",
              placeholder: "请输入发现的问题",
              hide_border: true
            }
          ]
        },
        {
          text: "预评估",
          edit_input: [
            {
              v: "曲线测量个数",
              placeholder: "请输入曲线测量个数"
            },
            {
              v: "曲线测量点数量",
              placeholder: "请输入曲线测量点数"
            },
            {
              v: "直线测量个数",
              placeholder: "请输入直线测量个数"
            },
            {
              v: "直线测量点个数",
              placeholder: "请输入直线测量点数量"
            },
            {
              v: "道岔测量组数",
              placeholder: "请输入道岔测量组数"
            },
            {
              v: "道岔测量点数量",
              placeholder: "请输入道岔测量点数量",
              hide_border: true
            }
          ]
        }
      ],
      sele_text: ""
    };
  },
  onLoad(options) {
    console.log(options);
    if (options.clear) {
      Object.assign(this.$data, this.$options.data());
    }
    // idx为picker第三列的下标  type为picker第一列的下标
    var sele_idx = (options.sele_idx ? options.sele_idx : 1) - 1,
      sele_type = options.sele_type ? options.sele_type : 0,
      picker_list = wx.getStorageSync("picker_list"),
      list = picker_list[sele_type].children[0].children,
      new_list = [];
    this.edit_picker1[0].placeholder = list[sele_idx].label;
    this.sele_text = list[sele_idx].label;
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
    get_textarea_val2(res) {
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
    edit_picker_cb2(res) {
      this.nav_show_arr[3].edit_picker[
        res.idx
      ].placeholder = this.nav_show_arr[3].edit_picker[res.idx].list[0][
        res.value
      ];
    },
    edit_picker_cb3(res) {
      this.nav_show_arr[3].edit_picker1[
        res.idx
      ].placeholder = this.nav_show_arr[3].edit_picker1[res.idx].list[0][
        res.value
      ];
    },
    edit_picker_cb4(res) {
      this.nav_show_arr[3].edit_picker2[
        res.idx
      ].placeholder = this.nav_show_arr[3].edit_picker2[res.idx].list[0][
        res.value
      ];
    },
    edit_picker_cb5(res) {
      this.nav_show_arr[7].edit_picker[
        res.idx
      ].placeholder = this.nav_show_arr[7].edit_picker[res.idx].list[0][
        res.value
      ];
    },
    edit_picker_cb6(res) {
      this.nav_show_arr[7].edit_picker1[
        res.idx
      ].placeholder = this.nav_show_arr[7].edit_picker1[res.idx].list[0][
        res.value
      ];
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
