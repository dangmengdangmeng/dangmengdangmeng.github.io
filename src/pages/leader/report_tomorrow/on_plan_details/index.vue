<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="p10_15">填报人信息</div>
    <div class="flex bg_white">
      <div class="s_b_b1"></div>
      <div class="input_left_w105 size15 p10_15">创建人</div>
      <div class="size15 max_w p10_15 color_6 flex">
        <img class="img30 mr10" src="/static/images/4.png" alt>
        <span>张三</span>
      </div>
    </div>
    <edit_input :edit_input="edit_input"></edit_input>
    <div class="p10_15">次日计划信息</div>
    <edit_input :edit_input="edit_input1"></edit_input>
    <div class="p10_15">工作内容</div>
    <edit_input :edit_input="edit_input2"></edit_input>
    <div class="p10_15">关联信息</div>
    <edit_input :edit_input="edit_input3"></edit_input>
    <div class="p10_15">其他</div>
    <edit_input :edit_input="edit_input4"></edit_input>
    <f_button :button_list="button_list" @cb="button_cb"></f_button>
  </div>
</template>
<script>
import f_button from "@/components/f_button";
import edit_input from "@/components/input_item";
export default {
  name: "work_bench",
  components: {
    f_button,
    edit_input
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
            text: "新日报",
            link: "/pages/leader/report_today/online_report/main?clear=true"
          },
          {
            text: "返回工作台",
            link: true
          }
        ]
      },
      edit_input: [
        {
          v: "归属信息",
          value: " 京广高铁工务段信阳东站",
          hide_border: true,
          no_arrow:true
        }
      ],
      edit_input1: [
        { v: "编号", value: "EO1809231814196051" ,no_arrow:true},
        { v: "上线时间", value: "2019-01-01",no_arrow:true },
        { v: "下线时间", value: "2019-01-01",no_arrow:true },
      ],
      edit_input2: [
        { v: "作业类型", value: "上线计划" ,no_arrow:true},
        { v: "是否天窗", value: "是" ,no_arrow:true},
        { v: "工作类型", value: "跟车作业" ,no_arrow:true},
        { v: "工作路局", value: "武汉",no_arrow:true },
        { v: "工作地点", value: "京广高铁工务段信阳东站",no_arrow:true },
        { v: "详细位置", value: "站南5公里" ,no_arrow:true},
        { v: "行别", value: "上行" ,no_arrow:true},
        { v: "天气", value: "晴" ,no_arrow:true},
        {
          v: "备注",
          value: "京广高铁工务段信阳东站",
          hide_border: true,no_arrow:true
        }
      ],
      edit_input3: [
        { v: "编号", value: "EO1809231814196051",no_arrow:true },
        { v: "日报日期", value: "2019-01-12" ,no_arrow:true},
        {
          v: "关联时间",
          value: "2019-01-12 12:12:23",
          hide_border: true,no_arrow:true
        }
      ],
      edit_input4: [
        { v: "创建时间", value: "2019-01-12 16:47:22",no_arrow:true },
        {
          v: "最后更新",
          value: "2019-01-12 16:47:22",
          hide_border: true,no_arrow:true
        }
      ],
      button_list: [
        {
          text: "编辑计划"
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    button_cb() {
      wx.redirectTo({
        url: "/pages/leader/report_tomorrow/on_plan/main"
      });
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
