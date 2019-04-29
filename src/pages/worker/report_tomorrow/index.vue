<template>
  <div class="color_f6 w_h100">
    <div
      class="top_nav w_90 m_center b_b size16 flex_space_between ptb5"
      style="border-color:#000;"
    >
      <div>计划列表</div>
      <div>全部计划</div>
    </div>
    <div class="mt10">
      <list_item :list_item="list"></list_item>
    </div>

    <f_button :button_list="button_list" @cb="show_picker"></f_button>
  </div>
</template>
<script>
import list_item from "@/components/list_item";
import f_button from "@/components/f_button";
export default {
  name: "work_bench",
  components: {
    list_item,
    f_button
  },
  data() {
    return {
      list: [
        {
          title: "01月12日计划",
          type: "跟车作业",
          time: "2019-11-12 12:12:21",
          status: "未完成",
          plan_text: "上",
          status_color: "red",
          plan_color: "#199ed8",
          link: "/pages/worker/report_tomorrow/on_plan_details/main"
        },
        {
          title: "01月12日计划",
          type: "走访",
          time: "2019-11-12 12:12:21",
          status: "已完成",
          plan_text: "上",
          status_color: "blue",
          plan_color: "#199ed8",
          link: "/pages/worker/report_tomorrow/on_plan_details/main"
        },
        {
          title: "01月12日计划",
          type: "跟车作业",
          time: "2019-11-12 12:12:21",
          status: "未完成",
          status_color: "red",
          plan_text: "非",
          plan_color: "#008000",
          hide_border: true,
          link: "/pages/worker/report_tomorrow/off_plan_details/main"
        }
      ],
      button_list: [
        {
          text: "新建计划"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    go_page(url) {
      wx.navigateTo({ url: url });
    },
    show_picker() {
      mpvue.showActionSheet({
        itemList: ["上线计划", "非上线计划"],
        itemColor: "#000000",
        success: function({ tapIndex }) {
          if (tapIndex === 0) {
            mpvue.navigateTo({
              url: "/pages/worker/report_tomorrow/on_plan/main"
            });
          } else if (tapIndex === 1) {
            mpvue.navigateTo({
              url: "/pages/worker/report_tomorrow/off_plan/main"
            });
          }
        }
      });
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
