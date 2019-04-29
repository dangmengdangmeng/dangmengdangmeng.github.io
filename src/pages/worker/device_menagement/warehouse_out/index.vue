<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <page_top_info @search_cb="search_cb" @filter_cb="filter_cb" @scan_cb="scan_cb"></page_top_info>
    <nav_bar :nav_bar="nav_bar" @cb="switch_nav"></nav_bar>
    <list_item :list_item="list"></list_item>
    <slide_panel :paramsObj="paramsObj"></slide_panel>
    <f_button v-if="step!=3" :button_list="button_list" @cb="button_cb"></f_button>
  </div>
</template>
<script>
import f_button from "@/components/f_button";
import nav_bar from "@/components/nav_bar";
import list_item from "@/components/list_item";
import page_top_info from "@/components/page_top_info";
import slide_panel from "@/components/slide_panel";

export default {
  components: {
    f_button,
    nav_bar,
    list_item,
    page_top_info,
    slide_panel
  },
  data() {
    return {
      paramsObj: {
        isPanelShow: false,
        edit_time: [
          {
            v: "开始日期",
            placeholder: "请选择开始时间"
          },
          {
            v: "结束日期",
            placeholder: "请选择结束时间"
          }
        ],
        edit_radio: [
          {
            v: "出库类型",
            list: [
              {
                value: "转借",
                checked: true
              },
              {
                value: "领用"
              }
            ]
          }
        ]
      },
      button_list: [
        {
          text: "出库"
        }
      ],
      nav_bar: {
        cur: 0,
        list: ["出库列表"]
      },
      list: [
        {
          title: "2019-11-12",
          type: "转借",
          time: "2019-11-12 12:12:21",
          status: "3",
          link:
            "/pages/worker/device_menagement/warehouse_out/warehouse_out_details/main"
        },
        {
          title: "2019-11-12",
          type: "领用",
          time: "2019-11-12 12:12:21",
          status: "3",
          link:
            "/pages/worker/device_menagement/warehouse_out/warehouse_out_details/main"
        },
        {
          title: "2019-11-12",
          type: "转借",
          time: "2019-11-12 12:12:21",
          status: "3",
          hide_border: true,
          link:
            "/pages/worker/device_menagement/warehouse_out/warehouse_out_details/main"
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    button_cb() {
      this.go_page(
        "/pages/worker/device_menagement/warehouse_out/add_device_out/main"
      );
    },

    go_page(url) {
      wx.navigateTo({ url: url });
    },
    search_cb(val) {
      console.log(val);
    },
    filter_cb() {
      this.paramsObj.isPanelShow = true;
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
