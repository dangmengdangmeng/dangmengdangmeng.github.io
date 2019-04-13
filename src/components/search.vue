<template>
  <div class="p10_15" style="background:rgb(239,239,244)">
    <div
      class="bg_white input_box flex ptb6"
      style="justify-content:center"
      v-if="hide_input1"
      @click="hide_input1=false"
    >
      <img src="/static/images/search.png" class="img15 mr5" alt>
      <span class="size15" style="color:#bfbfbf;">请输入名称</span>
    </div>
    <div class="flex" v-if="!hide_input1">
      <div class="flex input_box ptb5 bg_white max_w pl10">
        <img src="/static/images/search.png" class="img15 mr5" alt>
        <input class="max_w" type="text" placeholder="请输入名称" :focus="!hide_input1">
      </div>
      <div class="wx_color ml10" @click="hide_input1=true">取消</div>
    </div>
  </div>
</template>
<script>
export default {
  props: [],
  data() {
    return {
      hide_input1: true
    };
  }
};
</script>
<style scoped>
.input_box {
  border-radius: 4px;
}
</style>