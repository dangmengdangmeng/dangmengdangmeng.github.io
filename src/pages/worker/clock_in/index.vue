<template>
  <div class="color_f6 w_h100">
    <div
      class="top_nav w_90 m_center b_b size16 flex_space_between ptb5"
      style="border-color:#000;"
    >
      <div>打卡列表</div>
      <div>全部打卡</div>
    </div>
    <div class="mt10">
      <list_item :list_item="list"></list_item>
    </div>
    <f_button :button_list="button_list" @cb="create_clock"></f_button>
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
          title: "2019-01-05",
          type: "信阳东站",
          time: "12:12:21",
          status: "进行中",
          status_color: "red",
          link: "/pages/worker/clock_in/end_clock_in/main"
        },
        {
          title: "2019-01-05",
          type: "信阳东站",
          time: "12:12:21",
          status: "已完成",
          status_color: "blue",
          link: "/pages/worker/clock_in/clock_in_details/main"
        },
        {
          title: "2019-01-05",
          type: "信阳东站",
          time: "12:12:21",
          status: "进行中",
          status_color: "red",
          link: "/pages/worker/clock_in/end_clock_in/main",
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
      this.go_page("/pages/worker/clock_in/add_clock_in/main");
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
