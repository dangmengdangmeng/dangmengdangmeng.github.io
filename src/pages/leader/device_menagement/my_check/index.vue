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
      nav_bar: {
        cur: 0,
        list: ["盘点列表"]
      },
      list: [
        {
          title: "轨道检测仪",
          type: "未盘点",
          time: "M12312312",
          status: "盘点",
          status_color: "blue",
          link: "/pages/leader/device_menagement/my_check/device_check/main"
        },
        {
          title: "轨道检测仪",
          type: "已盘点",
          time: "M12312312",
          link: "/pages/leader/device_menagement/my_check/check_details/main"
        },
        {
          title: "轨道检测仪",
          type: "未盘点",
          time: "M12312312",
          status: "盘点",
          status_color: "blue",
          hide_border: true,
          link: "/pages/leader/device_menagement/my_check/device_check/main"
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
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
</style>
