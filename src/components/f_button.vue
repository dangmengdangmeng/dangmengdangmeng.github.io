<template>
  <div class="fx_b w_90">
    <div
      class="button"
      v-for="(item,index) in button_list"
      :key="index"
      :style="{'background':item.background?item.background:'#1aad19'}"
      @click="click(index)"
    >{{item.text}}</div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: ["button_list"],
  methods: {
    click(index) {
      var info = this.button_list[index];
      if (info.link) {
        wx.navigateTo({
          url: info.link
        });
      } else {
        this.$emit("cb");
      }
    }
  }
};
</script>
<style scoped>
.button {
  width: 100%;
  margin-bottom: 20px;
  color: #fff;
  padding: 8px 0;
  text-align: center;
  border-radius: 6px;
}
</style>
