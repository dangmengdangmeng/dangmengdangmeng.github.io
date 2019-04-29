<template>
  <web-view :src="web_src"></web-view>
</template>
<script>
export default {
  components: {},
  props:['web_src111'],
  data() {
    return {
      // web_src: "https://1.mengniuarla.com/WxOpen2/WebView"
      web_src: "https://ysl.entfly.com/WxOpen2/WebView"
    };
  },
  onLoad() {
    var BrandOpenId = wx.getStorageSync("BrandOpenId");
    var MiniAccountOpenId = wx.getStorageSync("MiniAccountOpenId");
    this.web_src =
      this.web_src +
      "?bdOpenId=" +
      BrandOpenId +
      "&mpOpenId=" +
      MiniAccountOpenId+
      '&url='+this.web_src111;
  }
};
</script>
<style scoped>
</style>