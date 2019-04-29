<template>
  <div class="color_f6 w_h100">
    <page_top_info :page_top_info="page_top_info" @search_cb="search_cb" @filter_cb="filter_cb"></page_top_info>
    <news_list :news_list="news_list"></news_list>
  </div>
</template>
<script>
import page_top_info from "@/components/page_top_info";
import news_list from "@/components/news_list";
export default {
  name: "work_bench",
  components: {
    page_top_info,
    news_list,
  },
  data() {
    return {
      page_top_info: {
        hide_scan: true,
        hide_filter: true,
        placeholder: "请输入知识标题"
      },
      news_list: [
        {
          show_dot: true,
          title: "铁路信号灯的含义",
          des:
            "铁路信号通常是用不同的颜色灯光等显示的，我国规定用红色、黄色和绿色作为信号的基本颜色",
          time: "2018-11-23 19:16:30",
          link: "/pages/leader/notice_list/notice_details/main"
        },
        {
          title: "铁路信号灯的含义",
          des:
            "铁路信号通常是用不同的颜色灯光等显示的，我国规定用红色、黄色和绿色作为信号的基本颜色",
          time: "2018-11-23 19:16:30",
          link: "/pages/leader/notice_list/notice_details/main"
        },
        {
          title: "铁路信号灯的含义",
          des:
            "铁路信号通常是用不同的颜色灯光等显示的，我国规定用红色、黄色和绿色作为信号的基本颜色",
          time: "2018-11-23 19:16:30",
          link: "/pages/leader/notice_list/notice_details/main"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    go_page(url) {
      wx.navigateTo({ url: url });
    },
  }
};
</script>
<style scoped>
.page_box {
  background: #f5f5f5;
}
</style>
