<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="p10_15 b_b">钢轨廓形仪</div>
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
          title: "钢轨廓形仪",
          plan_text: "正",
          plan_color: "blue",
          time: "M1233514",
          status: "空闲",
          status_color: "blue"
        },
        {
          title: "钢轨廓形仪",
          type: "张三",
          plan_text: "使",
          plan_color: "green",
          time: "M1233514",
          status: "领用",
          status_color: "green"
        },
        {
          title: "钢轨廓形仪",
          type: "李四",
          plan_text: "障",
          plan_color: "red",
          time: "M1233514",
          status: "维修",
          status_color: "red",
          hide_border: true
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {},
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
