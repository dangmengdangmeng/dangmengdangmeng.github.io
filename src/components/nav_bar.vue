<template>
  <div class="plr15 flex bg_white size15">
    <div
      class="ptb10 nav_bar_item max_w t_center"
      :class="[nav_bar.cur==index?'cur':'']"
      v-for="(item,index) in nav_bar.list"
      :key="index"
      @click="cur_nav(index)"
    >{{item}}</div>
  </div>
</template>
<script>
export default {
  props: ["nav_bar"],
  data() {
    return {};
  },
  methods: {
    cur_nav(idx) {
      this.$emit("cb", idx);
    }
  }
};
</script>
<style scoped>
.nav_bar_item {
  border-bottom: 2px solid transparent;
}
.cur {
  color: #04be02;
  border-bottom: 2px solid #04be02;
}
</style>