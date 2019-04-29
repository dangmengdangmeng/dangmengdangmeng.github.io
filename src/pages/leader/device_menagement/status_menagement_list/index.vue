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
          text: "状态修改"
        }
      ],
      nav_bar: {
        cur: 0,
        list: ["状态管理列表"]
      },
      list: [
        {
          title: "2019-01-05",
          type: "开始维修",
          time: "2019-11-12 11:01:01",
          link:
            "/pages/leader/device_menagement/status_menagement_list/start_service/main"
        },
        {
          title: "2019-01-05",
          type: "结束维修",
          time: "2019-11-12 11:01:01",
          link:
            "/pages/leader/device_menagement/status_menagement_list/end_service/main"
        },
        {
          title: "2019-01-05",
          type: "报废",
          time: "2019-11-12 11:01:01",
          hide_border: true
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    button_cb() {
      mpvue.showActionSheet({
        itemList: ["维修", "状态编辑"],
        itemColor: "#000000",
        success: function({ tapIndex }) {
          if (tapIndex === 0) {
            // mpvue.navigateTo({
            //   url: "/pages/worker/report_tomorrow/on_plan/main"
            // });
          } else if (tapIndex === 1) {
            mpvue.navigateTo({
              url: "/pages/leader/device_menagement/status_menagement_list/edit_state/main"
            });
          }
        }
      });
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
