<template>
  <div class="color_f6 w_h100">
    <page_top_info :page_top_info="page_top_info" @search_cb="search_cb" @filter_cb="filter_cb"></page_top_info>
    <news_list :news_list="news_list"></news_list>
    <slide_panel :paramsObj="paramsObj"></slide_panel>
  </div>
</template>
<script>
import page_top_info from "@/components/page_top_info";
import news_list from "@/components/news_list";
import slide_panel from "@/components/slide_panel";
export default {
  name: "work_bench",
  components: {
    page_top_info,
    news_list,
    slide_panel
  },
  data() {
    return {
      paramsObj: {
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
        edit_picker: [
          {
            v: "分类",
            placeholder: "请选择分类",
            list: [["分类", "分类1"]]
          }
        ]
      },
      page_top_info: {
        hide_scan: true,
        placeholder: "请输入知识标题"
      },
      news_list: [
        {
          title: "铁路信号灯的含义",
          show_fix_top: true,
          des:
            "铁路信号通常是用不同的颜色灯光等显示的，我国规定用红色、黄色和绿色作为信号的基本颜色",
          time: "2018-11-23 19:16:30",
          link: "/pages/worker/know_how_list/know_how_details/main"
        },
        {
          title: "铁路信号灯的含义",
          des:
            "铁路信号通常是用不同的颜色灯光等显示的，我国规定用红色、黄色和绿色作为信号的基本颜色",
          time: "2018-11-23 19:16:30",
          link: "/pages/worker/know_how_list/know_how_details/main"
        },
        {
          title: "铁路信号灯的含义",
          des:
            "铁路信号通常是用不同的颜色灯光等显示的，我国规定用红色、黄色和绿色作为信号的基本颜色",
          time: "2018-11-23 19:16:30",
          link: "/pages/worker/know_how_list/know_how_details/main"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    go_page(url) {
      wx.navigateTo({ url: url });
    },
    filter_cb() {
      this.paramsObj.isPanelShow = true;
    },
    search_cb(res) {}
  }
};
</script>
<style scoped>
.page_box {
  background: #f5f5f5;
}
</style>
