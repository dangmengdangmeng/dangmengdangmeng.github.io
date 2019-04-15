<template>
  <div class="popup-box">
    <img class="popup-bg" :src="img_baseUrl+'/2/ysl/images/p4/popup.png'" alt="popup-bg">
    <img
      class="popup-header"
      :src="img_baseUrl+'/2/ysl/images/p4/popup-header.png'"
      alt="popup-header"
      mode="aspectFit"
    >
    <div v-if="popupStep==1">
      <popup-prize v-if="result.isPrize" @nextStep="showForm"></popup-prize>
      <popup-thanks v-else></popup-thanks>
    </div>
    <popup-form v-if="popupStep==2" :OpenId_="result.joinOrderOpenId" @nextStep="showInfo"></popup-form>
    <popup-info v-if="popupStep==3" :userInfo="userInfo"></popup-info>
    <img
      class="btn-cancel"
      :src="img_baseUrl+'/2/ysl/images/p4/btn-cancel.png'"
      alt="btn-cancel"
      @click="closePopup"
    >
  </div>
</template>
<script type="text/javascript">
import PopupThanks from "./lottery_popupThanks.vue";
import PopupPrize from "./lottery_popupPrize.vue";
import PopupForm from "./lottery_popupForm.vue";
import PopupInfo from "./lottery_popupInfo.vue";
export default {
  name: "",
  components: {
    PopupThanks,
    PopupPrize,
    PopupForm,
    PopupInfo
  },
  data() {
    return {
      popupStep: 1,
      userInfo: {},
      img_baseUrl: "https://1.mengniuarla.com"
    };
  },
  onLoad() {
  },
  props: ["result"],
  mounted() {
    // console.log(this.result);
  },
  methods: {
    closePopup() {
      console.log("asdasdas");
      if (this.popupStep == 3) {
        this.$emit("closePopup", true);
      } else {
        this.$emit("closePopup", false);
      }
      this.popupStep = 1;
    },
    showForm() {
      this.popupStep = 2;
    },
    showInfo(userInfo) {
      console.log("step 3");
      this.popupStep = 3;
      this.userInfo = userInfo;
    }
  }
};
</script>
<style>
.popup-box {
  width: 80%;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-55%);
  margin: auto;
  display: block;
  text-align: center;
}
.popup-bg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
}
.popup-header {
  width: 200px;
  height: 60px;
  margin-top: 20px;
}

.btn-cancel {
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: -60px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>