<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <list_item :list_item="list"></list_item>
    <f_button :button_list="button_list" @cb="button_cb"></f_button>
  </div>
</template>
<script>
import list_item from "@/components/list_item";
import f_button from "@/components/f_button";
export default {
  components: {
    list_item,
    f_button
  },
  data() {
    return {
      button_list: [{ text: "填报" }],
      list: [
        {
          title: "哈尔滨",
          time: "2019-01",
          type: "39",
          link: "/pages/leader/month_report_list/all_detection_details/main"
        },
        {
          title: "哈尔滨",
          time: "2019-01",
          type: "39",
          link: "/pages/leader/month_report_list/all_detection_details/main",
          hide_border: true
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    button_cb() {},
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
