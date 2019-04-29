<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <nav_bar :nav_bar="nav_bar" @cb="switch_nav"></nav_bar>
    <list_item :list_item="list"></list_item>
  </div>
</template>
<script>
import nav_bar from "@/components/nav_bar";
import list_item from "@/components/list_item";
export default {
  components: {
    nav_bar,
    list_item
  },
  data() {
    return {
      list: [
        {
          title: "全项目检测作业情况",
          time: "2019-11-12",
          link: "/pages/leader/month_report_list/all_detection_list/main"
        },
        {
          title: "打磨车作业情况",
          time: "2019-11-12",
          link: "/pages/leader/month_report_list/dmc_list/main",
          hide_border: true
        }
      ],
      nav_bar: {
        cur: 0,
        list: ["当月报告", "历史报告"]
      }
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    go_page(url) {
      wx.navigateTo({ url: url });
    },
    switch_nav(idx) {
      this.nav_bar.cur = idx;
      if (idx == 0) {
        this.list = [
          {
            title: "全项目检测作业情况",
            time: "2019-11-12",
            link: "/pages/leader/month_report_list/all_detection_list/main"
          },
          {
            title: "打磨车作业情况",
            time: "2019-11-12",
            link: "/pages/leader/month_report_list/dmc_list/main",
            hide_border: true
          }
        ];
      } else if (idx == 1) {
        this.list = [
          {
            title: "打磨车作业情况",
            time: "2019-11-12",
            link: "/pages/leader/month_report_list/dmc_list/main"
          },
          {
            title: "全项目检测作业情况",
            time: "2019-11-12",
            link: "/pages/leader/month_report_list/all_detection_list/main",
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
</style>
