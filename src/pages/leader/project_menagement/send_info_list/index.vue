<template>
  <div class="color_f6 w_h100 size14 page_box">
    <list_item :list_item="list"></list_item>
  </div>
</template>
<script>
import list_item from "@/components/list_item";

export default {
  components: {
    list_item
  },
  data() {
    return {
      list: [
        {
          title: "合同签订",
          type: "张三",
          time: "2018-12-29 16:47:22",
          link: "/pages/leader/project_menagement/send_info_details/main"
        },
        {
          title: "合同签订",
          type: "张三",
          time: "2018-12-29 16:47:22",
          link: "/pages/leader/project_menagement/send_info_details/main",
          hide_border: true
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
