<template>
  <div class="win-container">
    <div class="mask stack0-mask"></div>
    <img
      class="win-bg-top stack1"
      :src="img_baseUrl+'/2/ysl/images/p5/bg-butterfly-top.png'"
      alt="popup-bg"
      mode="aspectFit"
    >
    <img
      class="win-bg-right stack1"
      :src="img_baseUrl+'/2/ysl/images/p5/bg-butterfly-right.png'"
      alt="popup-bg"
      mode="aspectFit"
    >
    <img
      class="win-bg-bottom stack1"
      :src="img_baseUrl+'/2/ysl/images/p5/bg-butterfly-bottom.png'"
      alt="popup-bg"
      mode="aspectFit"
    >

    <div class="toast-container stack0">
      <img class="bg-toast" :src="img_baseUrl+'/2/ysl/images/p5/toast-bg.png'" alt="popup-bg">
      <div class="toast-content stack2">
        <img
          class="toast-header"
          :src="img_baseUrl+'/2/ysl/images/p5/toast-header.png'"
          alt
          mode="aspectFit"
        >
        <toast-prize v-if="toastStep==1" :prize_info="prizeInfo" @nextStep="a____"></toast-prize>
        <toast-form
          v-if="toastStep==2"
          :OpenId_="prizeInfo.joinOrderOpenId"
          @nextStep="toastStep=3"
        ></toast-form>
        <toast-info v-if="toastStep==3"></toast-info>
        <img
          class="btn-cancel"
          :src="img_baseUrl+'/2/ysl/images/p4/btn-cancel.png'"
          alt="btn-cancel"
          @click="closeToast"
        >
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import ToastPrize from "./toastPrize.vue";
import ToastForm from "./toastForm.vue";
import ToastInfo from "./toastInfo.vue";
export default {
  name: "",
  components: {
    ToastPrize,
    ToastForm,
    ToastInfo
  },
  data() {
    return {
      toastStep: 1,
      img_baseUrl: "",
      new_joinOrderOpenId: ""
      // isToastShow: true,
      // prize_info:{
      //   title:'恭喜你投票数 排名第一名',
      //   img:'https://ysl.entfly.com/2/ysl/images/p5/level1.png',
      //   des:'瑞哺恩阿尔卑斯山有机体验游(含往返机票+住宿6天4夜)',
      //   offset:true
      // },
      // prize_info:{
      //   title:'恭喜你投票数 排名第三名',
      //   img:'https://ysl.entfly.com/2/ysl/images/p5/level2.png',
      //   des:'亲子帐篷+户外野餐防潮垫',
      // },
      // prize_info:{
      //   title:'恭喜你投票数 排名第五名',
      //   img:'https://ysl.entfly.com/2/ysl/images/p5/level3.png',
      //   des:'瑞哺恩幼儿配方奶粉800g1罐',
      // },
    };
  },
  props: ["prizeInfo"],
  onLoad() {
    // console.log(this.prizeInfo);
    this.img_baseUrl = this.$api.host;
  },
  methods: {
    closeToast() {
      this.toastStep = 1;
      this.$emit("closeToast");
    },
    a____() {
      // this.$fun.confirm_modal(1111,this.prizeInfo.joinOrderOpenId);
      this.toastStep = 2;
    }
  }
};
</script>
<style scoped>
.win-container {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
}
.win-bg-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 320rpx;
}
.win-bg-bottom {
  position: absolute;
  width: 88px;
  height: 100px;
  bottom: 0;
  left: 0;
}
.win-bg-right {
  position: absolute;
  right: 0;
  top: 30%;
  height: 260px;
  width: 63px;
}
.bg-toast {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.stack-1 {
  z-index: -1;
}
.stack0-mask {
  z-index: 0;
  position: absolute;
}
.stack0 {
  z-index: 0;
}
.stack1 {
  z-index: 1;
}
.stack2 {
  z-index: 2;
}

.toast-container {
  position: relative;
  width: 80%;
  text-align: center;
  display: inline-block;
  top: 50%;
  transform: translateY(-48%);
}

.toast-content {
  width: 80%;
  display: inline-block;
}
.toast-header {
  width: 200px;
  height: 60px;
  margin-top: 20px;
}
.btn-cancel {
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>