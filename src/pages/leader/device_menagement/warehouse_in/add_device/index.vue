<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="bg_white">
      <flow-steps :paramsList="flowParamsList"></flow-steps>
    </div>
    <div v-if="step==1">
      <div class="p10_15">基本信息</div>
      <edit_input :edit_input="edit_input"></edit_input>
      <div class="p10_15 bg_white flex">
        <div class="w105">
          <span class="required">*</span>
          <span>设备名称</span>
        </div>
        <div class="s_b_b1"></div>
        <upload_ :upload_info="upload_info" @cb="get_upload_img"></upload_>
      </div>
      <edit_input :edit_input="edit_input1"></edit_input>
      <edit_textarea :edit_textarea="edit_textarea" @cb="get_textarea_val"></edit_textarea>
    </div>
    <div v-if="step==2">
      <nav_bar :nav_bar="nav_bar" @cb="switch_nav"></nav_bar>
      <div class="mt10">
        <edit_input :edit_input="edit_input2" v-if="nav_bar.cur==0"></edit_input>
        <div v-if="nav_bar.cur==1">
          <edit_time :edit_time="edit_time"></edit_time>
          <edit_input :edit_input="edit_input3"></edit_input>
          <edit_time :edit_time="edit_time1"></edit_time>
          <edit_input :edit_input="edit_input4"></edit_input>
        </div>
        <div v-if="nav_bar.cur==2">
          <edit_input :edit_input="edit_input5"></edit_input>
        </div>
        <div v-if="nav_bar.cur==3">
          <edit_picker :edit_picker="edit_picker" @cb="edit_picker_cb"></edit_picker>
          <edit_time :edit_time="edit_time2"></edit_time>
          <edit_input :edit_input="edit_input6"></edit_input>
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
import edit_input from "@/components/input_item";
import edit_time from "@/components/edit_time";
import edit_picker from "@/components/edit_picker";
import edit_textarea from "@/components/edit_textarea";
import nav_bar from "@/components/nav_bar";
import upload_ from "@/components/upload";
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
    nav_bar,
    msg_panel,
    upload_
  },
  data() {
    return {
      paramsObj: {
        title: "提交成功",
        descList: ["编号为EO13543545的车轮廓形仪新增成功"],
        btnList: [
          {
            text: "重新编辑",
            link: "/pages/leader/device_menagement/warehouse_in/add_device/main"
          },
          {
            text: "新增设备",
            link: "/pages/leader/device_menagement/warehouse_in/add_device/main"
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
      upload_info: {
        class: "img50"
      },
      step: 1,
      nav_bar: {
        cur: 0,
        list: ["仪器信息", "节点信息", "财务信息", "归属信息"]
      },
      edit_textarea: {
        v: "备注",
        placeholder: "请输入备注信息"
      },
      edit_picker: [
        {
          required: true,
          v: "增加方式",
          placeholder: "请选择增加方式",
          list: [["增加方式", "增加方式1"]]
        },
        {
          required: true,
          v: "利润中心",
          placeholder: "请选择利润中心",
          list: [["利润中心", "利润中心1"]]
        },
        {
          required: true,
          v: "部门",
          placeholder: "请选择部门",
          list: [["部门", "部门1"]]
        },
        {
          required: true,
          v: "责任人",
          placeholder: "请选择责任人",
          list: [["责任人", "责任人1"]]
        },
        {
          required: true,
          v: "使用人",
          placeholder: "请选择使用人",
          list: [["使用人", "使用人1"]]
        }
      ],
      edit_time: [
        {
          v: "资本化日期",
          placeholder: "请选择资本化日期"
        }
      ],
      edit_time1: [
        {
          v: "质保开始日期",
          placeholder: "请选择开始日期"
        },
      ],
      edit_time2: [
        {
          v: "验收领用日期",
          placeholder: "请选择验收领用日期"
        }
      ],
      edit_input: [
        {
          v: "设备名称",
          required: true,
          placeholder: "请输入设备名称"
        }
      ],
      edit_input1: [
        {
          v: "固资编号",
          required: true,
          placeholder: "请输入固资编号"
        },
        {
          v: "财务卡片号",
          required: true,
          placeholder: "请输入财务卡片号"
        },
        {
          v: "研究院编号",
          required: true,
          placeholder: "请输入研究院编号"
        }
      ],
      edit_input2: [
        {
          v: "固定资产名称",
          placeholder: "请输入固定资产名称"
        },
        {
          v: "品牌",
          placeholder: "请输入品牌"
        },
        {
          v: "规格型号",
          placeholder: "请输入规格型号"
        },
        {
          v: "机身唯一代码",
          placeholder: "请输入机身唯一代码"
        },
        {
          v: "二维码",
          value: "绑定",
          hide_border: true
        }
      ],
      edit_input3: [
        {
          v: "折旧剩余周期",
          placeholder: "请输入折旧剩余周期"
        }
      ],
      edit_input4: [
        {
          v: "质保期(天)",
          placeholder: "请输入质保天数"
        },
        {
          v: "质保到期日",
          placeholder: "请输入质保到期日"
        }
      ],
      edit_input5: [
        {
          v: "原值",
          placeholder: "请输入原值"
        },
        {
          v: "每月折扣额",
          placeholder: "请输入每月折扣额"
        }
      ],
      edit_input6: [
        {
          v: "供应商名称",
          placeholder: "请输入供应商名称",
          hide_border: true
        }
      ],
      flowParamsList: [
        {
          stepCount: 1,
          isDone: true,
          isActive: true,
          title: "基本信息"
        },
        {
          stepCount: 2,
          isDone: false,
          isActive: false,
          title: "详细信息"
        },
        {
          stepCount: 3,
          isDone: false,
          isActive: false,
          title: "新增完成"
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
      } else if (this.step == 2) {
        var nav_idx = this.nav_bar.cur;
        if (nav_idx == 0) {
          this.nav_bar.cur = 1;
        } else if (nav_idx == 1) {
          this.nav_bar.cur = 2;
        } else if (nav_idx == 2) {
          this.nav_bar.cur = 3;
          this.button_list[0].text = "保存";
        } else if (nav_idx == 3) {
          this.$fun.confirm_modal(
            "新增设备",
            "新增设备成功,是否提交保存",
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
      }
    },
    get_textarea_val(res) {
      console.log(res);
    },
    get_upload_img(res) {
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
    switch_nav(idx) {
      this.nav_bar.cur = idx;
      if (idx == 3) {
        this.button_list[0].text = "保存";
      } else {
        this.button_list[0].text = "下一步";
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
