<template>
  <div class="color_f6 w_h100">
    <div
      class="top_nav w_90 m_center b_b size16 flex_space_between ptb5"
      style="border-color:#000;"
    >
      <div>打卡列表</div>
      <div @click="paramsObj1.isPanelShow=true">全部打卡</div>
    </div>
    <div class="mt10">
      <list_item :list_item="list"></list_item>
    </div>
    <f_button :button_list="button_list" @cb="create_clock"></f_button>
    <slide_panel :paramsObj="paramsObj1"></slide_panel>
  </div>
</template>
<script>
import list_item from "@/components/list_item";
import f_button from "@/components/f_button";
import slide_panel from "@/components/slide_panel";
export default {
  name: "work_bench",
  components: {
    list_item,
    f_button,
    slide_panel
  },
  data() {
    return {
       paramsObj1: {
        isPanelShow: false,
        edit_time: [
          {
            v: "开始日期",
            placeholder: "请选择开始日期"
          },
          {
            v: "结束日期",
            placeholder: "请选择结束日期"
          }
        ],
        edit_radio: [
          {
            v: "入库类型",
            list: [
              {
                value: "归还",
                checked: true
              },
              {
                value: "新增"
              }
            ]
          }
        ]
      },
      list: [
        {
          title: "2019-01-05",
          type: "信阳东站",
          time: "12:12:21",
          status: "进行中",
          status_color: "red",
          link: "/pages/leader/clock_in/end_clock_in/main"
        },
        {
          title: "2019-01-05",
          type: "信阳东站",
          time: "12:12:21",
          status: "已完成",
          status_color: "blue",
          link: "/pages/leader/clock_in/clock_in_details/main"
        },
        {
          title: "2019-01-05",
          type: "信阳东站",
          time: "12:12:21",
          status: "进行中",
          status_color: "red",
          link: "/pages/leader/clock_in/end_clock_in/main",
          hide_border: true
        }
      ],
      button_list: [
        {
          text: "新建打卡"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    go_page(url) {
      wx.navigateTo({ url: url });
    },
    create_clock() {
      this.go_page("/pages/leader/clock_in/add_clock_in/main");
    }
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
