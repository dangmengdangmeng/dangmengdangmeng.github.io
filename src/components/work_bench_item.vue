<template>
  <div class="size15">
    <div
      class="flex p10_15 rl"
      v-for="(item,index) in work_bench_item"
      :key="index"
      @click="handleTap(item)"
    >
      <div class="s_b_b1" v-if="!item.hide_border"></div>
      <img v-if="item.img" :src="item.img" class="mr5 img25" mode="aspectFit">
      <div class="max_w" :class="item.no_arrow?'':'right_ft'">{{item.text}}</div>
      <div class="item_right_text" v-if="item.right_text">{{item.right_text}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["work_bench_item"],
  methods: {
    handleTap(item) {
      if (item.link) {
        mpvue.navigateTo({ url: item.link });
      }
      if (item.actionSheetOptions) {
        mpvue.showActionSheet(item.actionSheetOptions);
      }
    }
  }
};
</script>
<style>
.item_right_text {
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}
</style>