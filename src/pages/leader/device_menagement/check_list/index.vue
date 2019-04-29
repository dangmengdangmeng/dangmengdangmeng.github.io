<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <page_top_info :page_top_info="page_top_info" @search_cb="search_cb" @scan_cb="scan_cb"></page_top_info>
    <nav_bar :nav_bar="nav_bar" @cb="switch_nav"></nav_bar>
    <list_item :list_item="list"></list_item>
    <f_button :button_list="button_list" @cb="button_cb"></f_button>
  </div>
</template>
<script>
import f_button from "@/components/f_button";
import nav_bar from "@/components/nav_bar";
import list_item from "@/components/list_item";
import page_top_info from "@/components/page_top_info";

export default {
  components: {
    f_button,
    nav_bar,
    list_item,
    page_top_info
  },
  data() {
    return {
      page_top_info: {
        hide_filter: true,
        placeholder: "请输入要盘点的日期"
      },
      button_list: [
        {
          text: "盘点"
        }
      ],
      nav_bar: {
        cur: 0,
        list: ["盘点列表"]
      },
      list: [
        {
          title: "运营中心",
          type: "12/53",
          time: "2019-11-12",
          status: "进行中",
          status_color: "blue",
          link: "/pages/leader/device_menagement/my_check/main"
        },
        {
          title: "运营中心",
          type: "12/53",
          time: "2019-11-12",
          status: "已完成",
          link: "/pages/leader/device_menagement/my_check/main"
        },
        {
          title: "运营中心",
          type: "12/53",
          time: "2019-11-12",
          status: "进行中",
          status_color: "blue",
          hide_border: true,
          link: "/pages/leader/device_menagement/my_check/main"
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    button_cb() {
      this.go_page(
        "/pages/leader/device_menagement/check_list/check_info/main"
      );
    },
    go_page(url) {
      wx.navigateTo({ url: url });
    },
    search_cb(val) {
      console.log(val);
    },
    scan_cb() {
      wx.scanCode({
        success: res => {
          console.log(res);
        }
      });
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
