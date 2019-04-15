<template>
  <div class="set_mask">
    <div class="set_modal bg_white ptb20 flex size15">
      <div class="set_tit">需要您同意才能保存到相册</div>
      <button class="set_btn mt20" open-type="openSetting" @opensetting="get_setting">去设置</button>
    </div>
    <img
      class="btn-cancel w30 h30"
      :src="img_baseUrl+'/2/ysl/images/p4/btn-cancel.png'"
      @click="close"
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      img_baseUrl: "https://1.mengniuarla.com",
    };
  },
  onLoad() {
  },
  methods: {
    close() {
      this.$emit("close_setting", true);
    },
    get_setting(e) {
      console.log(e);
      var setting_obj = e.mp.detail.authSetting;
      if (setting_obj["scope.writePhotosAlbum"]) {
        this.$fun.toast("授权成功");
        setTimeout(() => {
          this.$emit("cb", true);
        }, 1000);
      } else {
        this.$emit("cb", false);
        this.$fun.toast("授权失败", "none");
      }
    }
  }
};
</script>
<style scoped>
.set_mask {
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 999999999;
}
.set_modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  width: 70%;
  flex-direction: column;
  justify-content: center;
}
.set_btn {
  border-radius: 50px;
  line-height: 30px;
  padding: 4px 30px;
  background: red;
  color: #fff;
}
.btn-cancel {
  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
}
</style>