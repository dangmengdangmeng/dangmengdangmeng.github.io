<template>
  <div class="bg_white">
    <div class="flex t_center">
      <div class="w50 ptb5 border_">{{table_info.title.num}}</div>
      <div class="max_w ptb5 border_ no_left">{{table_info.title.name}}</div>
      <div class="max_w ptb5 border_ no_left">{{table_info.title.num1}}</div>
      <div class="ptb5 border_ no_left w70" v-if="table_info.title.state">{{table_info.title.state}}</div>
      <div class="ptb5 border_ no_left no_right w70" v-if="table_info.title.img_num">{{table_info.title.img_num}}</div>
    </div>
    <div class="flex ptb5 t_center" v-for="(item,index) in table_info.list" :key="index">
      <div class="w50">{{item.num}}</div>
      <div class="max_w">{{item.name}}</div>
      <div class="max_w">{{item.num1}}</div>
      <div class="w70" v-if="!item.state?false:true">{{item.state}}</div>
      <div class="w70" v-if="!item.img_num?false:(item.img_num || item.img_num==0)?true:false">{{item.img_num}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["table_info"]
};
</script>
<style scoped>
.border_ {
  border: 1px solid #e0e0e0;
}
.no_left {
  border-left-color: transparent;
}
.no_right {
  border-right-color: transparent;
}
</style>