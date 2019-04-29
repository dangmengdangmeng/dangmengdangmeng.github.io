<template>
  <div class="weui-msg" style="background:#fff;height:100vh;width:100%;">
    <div class="weui-msg__icon-area">
      <i class="weui-icon-success weui-icon_msg"></i>
    </div>
    <div class="weui-msg__text-area">
      <h2 class="weui-msg__title">{{paramsObj.title}}</h2>
      <p class="weui-msg__desc" v-for="(item, index) in paramsObj.descList" :key="index">{{item}}</p>
    </div>
    <div class="weui-msg__opr-area">
      <div class="weui-btn-area">
        <button
          class="weui-btn"
          :class="[item.default?'weui-default':'weui-btn_primary']"
          :style="{'color':item.default?'#666':''}"
          v-for="(item, index) in paramsObj.btnList"
          :key="index"
          @click="btn_click(item.link, item.action)"
        >{{item.text}}</button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  methods: {
    btn_click(url, action) {
      console.log(url, action)
      if (action) {
        return action()
      }
      if (url == true) {
        wx.switchTab({
          url: "/pages/work_bench_item/main"
        });
      } else {
        wx.redirectTo({
          url: url
        });
      }
      
      
    }
  },
  props: ["paramsObj"]
};
</script>
<style>
</style>