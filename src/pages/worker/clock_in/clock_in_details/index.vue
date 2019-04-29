<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="p10_15">打卡人信息</div>
    <div class="flex bg_white">
      <div class="s_b_b1"></div>
      <div class="input_left_w105 size15 p10_15">创建人</div>
      <div class="size15 max_w p10_15 color_6 flex">
        <img class="img30 mr10" src="/static/images/4.png" alt>
        <span>张三</span>
      </div>
    </div>
    <edit_input :edit_input="edit_input"></edit_input>
    <div class="p10_15">打卡信息</div>
    <edit_input :edit_input="edit_input1"></edit_input>
    <div class="p10_15">打卡明细</div>
    <div class="p10_15">开始打卡信息</div>
    <edit_input :edit_input="edit_input2"></edit_input>
    <img class="w_100 h160" src="/static/images/4.png">
    <div class="p10_15">打卡照片</div>
    <div class="p10_15 flex bg_white">
      <img class="w50 h50 mr10" src="/static/images/4.png" alt>
      <img class="w50 h50 mr10" src="/static/images/4.png" alt>
      <img class="w50 h50 mr10" src="/static/images/4.png" alt>
    </div>
    <div class="p10_15">设备</div>
    <div class="flex_space_between bg_white size15 p10_30">
      <div class="max_w t_center">设备名称3</div>
      <div class="max_w t_center">自备</div>
      <div class="max_w t_center">类型</div>
    </div>
    <edit_input :edit_input="edit_input3"></edit_input>
    <div class="p10_15">结束打卡信息</div>
    <edit_input :edit_input="edit_input4"></edit_input>
    <img class="w_100 h160" src="/static/images/4.png">
    <div class="p10_15">打卡照片</div>
    <div class="p10_15 flex bg_white">
      <img class="w50 h50 mr10" src="/static/images/4.png" alt>
      <img class="w50 h50 mr10" src="/static/images/4.png" alt>
      <img class="w50 h50 mr10" src="/static/images/4.png" alt>
    </div>
    <div class="p10_15">设备</div>
    <div class="flex_space_between bg_white size15 p10_30">
      <div class="max_w t_center">设备名称3</div>
      <div class="max_w t_center">自备</div>
      <div class="max_w t_center">类型</div>
    </div>
    <edit_input :edit_input="edit_input5"></edit_input>
    <div class="p10_15">关联信息</div>
    <edit_input :edit_input="edit_input6"></edit_input>
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
            link: "/pages/worker/report_today/online_report/main?change_step=1"
          },
          {
            text: "新日报",
            link: "/pages/worker/report_today/online_report/main?clear=true"
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
          hide_border: true
        }
      ],
      edit_input1: [
        { v: "编号", value: "EO1809231814196051" },
        { v: "打卡日期", value: "2019-01-01" },
        { v: "开始打卡时间", value: "2019-01-01 09:00:12" },
        { v: "结束打卡时间", value: "2019-01-01 09:00:12" },
        { v: "作业时长", value: "1时20分35秒" },
        { v: "打卡轨迹", value: "点击查看", hide_border: true }
      ],
      edit_input2: [
        { v: "开始打卡时间", value: "2019-01-01 09:00:12" },
        { v: "经纬度", value: "127.84,45,451" },
        {
          v: "位置",
          value: "信阳南站南广场",
          hide_border: true
        }
      ],
      edit_input3: [
        {
          v: "备注",
          value: "备注信息",
          hide_border: true
        }
      ],
      edit_input4: [
        { v: "结束打卡时间", value: "2019-01-12 16:47:22" },
        { v: "经纬度", value: "127.84,45,451" },
        {
          v: "位置",
          value: "信阳南站南广场",
          hide_border: true
        }
      ],
      edit_input5: [
        {
          v: "备注",
          value: "备注信息",
          hide_border: true
        }
      ],
      edit_input6: [
        {
          v: "编号",
          value: "EO1809231814196051"
        },
        {
          v: "日报日期",
          value: "2019-01-12"
        },
        {
          v: "关联时间",
          value: "2019-01-12 16:47:22",
          hide_border: true
        }
      ],
      button_list: [
        {
          text: "返回"
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    button_cb() {
      wx.navigateBack({
        delta:-1
      })
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
