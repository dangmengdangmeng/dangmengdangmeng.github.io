<template>
  <div class="page_box w_h100">
    <div class="bg_white">
      <work_bench_item :work_bench_item="works_list"></work_bench_item>
    </div>
    <div class="mt10 bg_white">
      <work_bench_item :work_bench_item="works_list1"></work_bench_item>
    </div>
    <div class="mt10 bg_white">
      <work_bench_item :work_bench_item="works_list2"></work_bench_item>
    </div>
    <div class="mt10 bg_white">
      <work_bench_item :work_bench_item="works_list3"></work_bench_item>
    </div>
  </div>
</template>
<script>
import work_bench_item from "@/components/work_bench_item.vue";
export default {
  components: {
    work_bench_item
  },
  data() {
    return {
      works_list: [
        {
          text: "入库",
          img: "/static/images/device_menagement/1_15.png",
          link: "/pages/leader/device_menagement/warehouse_in/main"
        },
        {
          text: "出库",
          img: "/static/images/device_menagement/1_19.png",
          link: "/pages/leader/device_menagement/warehouse_out/main"
        },
        {
          text: "盘点",
          img: "/static/images/device_menagement/1_23.png",
          link: "/pages/leader/device_menagement/check_list/main",
          hide_border: true
        }
      ],
      works_list1: [
        {
          text: "领用",
          img: "/static/images/device_menagement/2_06.png",
          link: "/pages/leader/device_menagement/add_use/main"
        },
        {
          text: "归还",
          img: "/static/images/device_menagement/2_08.png",
          link: "/pages/leader/device_menagement/return_device/main"
        },
        {
          text: "我的盘点",
          img: "/static/images/device_menagement/1_23.png",
          link: "/pages/leader/device_menagement/my_check/main"
        },
        {
          text: "我的领用",
          img: "/static/images/device_menagement/2_06.png",
          link: "/pages/leader/device_menagement/use_list/main",
          hide_border: true
        }
      ],
      works_list2: [
        {
          text: "审核",
          img: "/static/images/device_menagement/review.png",
          link: "/pages/leader/device_menagement/review_list/main",
        },
        {
          text: "状态管理",
          img: "/static/images/device_menagement/2_10.png",
          link: "/pages/leader/device_menagement/status_menagement_list/main", 
          hide_border: true
        }
      ],
      works_list3: [
        {
          text: "设备信息管理",
          img: "/static/images/device_menagement/3_06.png",
          link: "/pages/leader/device_menagement/device_info_list/main", 
        },
        {
          text: "设备库存明细",
          img: "/static/images/device_menagement/3_12.png",
          link: "/pages/leader/device_menagement/device_details_list/main",
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
