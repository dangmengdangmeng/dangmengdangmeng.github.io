<template>
  <div class="flex ptb20 plr15 bg_white">
    <img class="img80 mr20" :src="work_bench_top.img">
    <div class="size14 top_right_info">
      <h4 class="mb5 size16">{{work_bench_top.name}}</h4>
      <p class="mb5">{{work_bench_top.title}}</p>
      <p class="mb5">{{work_bench_top.title1}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["work_bench_top"]
};
</script>
<style scoped>
</style>
