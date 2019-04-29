<template>
  <div>
    <div
      class="size15 b_b p10_15 bg_white"
      v-for="(item,index) in news_list"
      :key="index"
      @click="go_page(item.link)"
    >
      <div class="news_title flex">
        <span class="red_dot" v-show="item.show_dot"></span>
        <div>{{item.title}}</div>
        <img v-show="item.show_fix_top" class="img20 ml10" src="/static/images/fix_top_icon.png">
      </div>
      <div class="color_6">{{item.des}}</div>
      <div class="news_time size14 color_9">{{item.time}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["news_list"],
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
.red_dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: red;
}
</style>