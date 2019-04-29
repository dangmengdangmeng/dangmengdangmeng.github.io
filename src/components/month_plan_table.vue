<template>
  <div class="bg_white">
    <div class="p10_15 flex">
      <div class="s_b_b1"></div>
      <div class="w_30"></div>
      <div class="max_w t_center">计划完成</div>
      <div class="max_w t_center">实际完成</div>
    </div>
    <div class="p10_15 flex" v-for="(item,index) in month_plan_info" :key="index">
      <div class="s_b_b1"></div>
      <div class="w_30">{{item.text}}</div>
      <div class="max_w t_center">{{item.text1}}</div>
      <div class="max_w t_center">{{item.text2}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["month_plan_info"]
};
</script>