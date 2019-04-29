<template>
  <div class="login">
    <button class="login-btn" open-type="getUserInfo" @getuserinfo="getUserData">点击进入萌萌拍</button>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  props: [""],
  created() {},
  methods: {
    getUserData(e) {
      console.log(e);
      if(e.mp.detail.errMsg=='getUserInfo:ok'){
        var userInfo = e.mp.detail.userInfo;
          this.$app.globalData.userInfo = userInfo;
          //rawData 为userInfo的json string格式
          this.$app.onLogin(e.mp.detail.rawData, res => {
            if (res) {
              this.$emit("cb", true);
            }
          });
      }else{
        this.$fun.toast('同意就能参加活动')
      }
     
    }
  }
};
</script>
<style>
#app,
.login {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);
}
.login-btn {
  background: #69a73a;
  box-shadow: 0 2px 4px #666;
  width: 70%;
  height: 50px;
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  line-height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
</style>