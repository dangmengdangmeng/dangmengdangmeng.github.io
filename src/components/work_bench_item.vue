<template>
  <div class="size15">
    <div
      class="flex p10_15"
      :class="item.hide_border?'':'s_b_b'"
      v-for="(item,index) in work_bench_item"
      :key="index"
    >
      <img :src="item.img" class="mr5 img20" alt>
      <div class="max_w" :class="item.no_arrow?'':'right_ft'">{{item.text}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["work_bench_item"]
};
</script>