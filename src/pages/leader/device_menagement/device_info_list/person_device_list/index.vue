<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="p10_15 b_b">张三</div>
    <list_item :list_item="list"></list_item>
  </div>
</template>
<script>
import list_item from "@/components/list_item";
export default {
  components: {
    list_item,
  },
  data() {
    return {
      list: [
        {
          title: "轨道检测仪",
          type: "张三",
          plan_text: "使",
          plan_color: "green",
          time: "M1233514",
          status: "领用",
          status_color: "green"
        },
        {
          title: "轨道检测仪",
          type: "张三",
          plan_text: "使",
          plan_color: "green",
          time: "M1233514",
          status: "领用",
          status_color: "green"
        },
        {
         title: "轨道检测仪",
          type: "张三",
          plan_text: "使",
          plan_color: "green",
          time: "M1233514",
          status: "领用",
          status_color: "green",
          hide_border: true,
        }
      ],
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
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
