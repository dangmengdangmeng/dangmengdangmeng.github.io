<template>
  <div class="color_f6 w_h100">
    <div class="p10_15">钢轨廓形仪</div>
    <list_item :list_item="list"></list_item>
  </div>
</template>
<script>
import list_item from "@/components/list_item";
export default {
  name: "work_bench",
  components: {
    list_item
  },
  data() {
    return {
      list: [
        {
          title: "张三",
          type: "使用中",
          time: "2019-01-12 12:12:21",
          link: "/pages/worker/device_menagement/warehouse_in/loop_details/main"
        },
        {
          title: "张三",
          type: "使用中",
          time: "2019-01-12 12:12:21",
          link: "/pages/worker/device_menagement/warehouse_in/loop_details/main"
        },
        {
          title: "张三",
          type: "使用中",
          time: "2019-01-12 12:12:21",
          link: "/pages/worker/device_menagement/warehouse_in/loop_details/main",
          hide_border: true
        }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.page_box {
  background: #f5f5f5;
}
</style>
