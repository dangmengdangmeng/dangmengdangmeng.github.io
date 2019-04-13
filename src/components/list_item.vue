<template>
  <div class="size15 bg_white">
    <div
      class="ptb10 pl15 pr20 rl"
      :class="item.hide_border?'':'s_b_b' "
      v-for="(item,index) in list_item"
      :key="index"
      @click="go_page(item.link)"
    >
      <div class="flex_space_between mb10" style="align-items:flex-start">
        <div style="max-width:80%">{{item.title}}</div>
        <div v-if="!item.show_right_btn">{{item.type}}</div>
        <div
          class="right_top_btn size12"
          v-if="item.show_right_btn"
          :style="{background:item.btn_bg_color}"
        >{{item.btn_text}}</div>
      </div>
      <div class="flex_space_between color_6">
        <div style="max-width:80%">{{item.time}}</div>
        <div>{{item.status}}</div>
      </div>
      <div class="right_ft1"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["list_item"],
  methods: {
    go_page(url) {
      if (url) {
        wx.navigateTo({
          url: url
        });
      }
    }
  }
};
</script>
<style scoped>
.right_top_btn {
  padding: 2px 4px;
  margin-top: 5px;
  border-radius: 4px;
  color: #fff;
  background: #000;
}
</style>