<template>
  <div class="my-mask weui-mask">
    <div class="toast-box">
      <img class="bg-toast" src="http://ysl.entfly.com/2/ysl/images/p5/toast-bg.png" alt="popup-bg" mode="aspectFit">
      <div class="toast-title">投票成功！</div>
      <div style="text-align:center">
        <img class="toast-heart" src="http://ysl.entfly.com/2/ysl/images/p5/toast-heart.png" alt="toast-heart" mode="aspectFit">
      </div>
      <div class="toast-text">感谢各位小哥哥、小姐姐</div>
      <div class="toast-text">投我一票，么么哒~</div>
      <img 
        class="btn-cancel" 
        src="http://ysl.entfly.com/2/ysl/images/p4/btn-cancel.png" 
        alt="btn-cancel"
        @click="closePopup"
        mode="aspectFit"
      >  
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: '',
    components: {},
    data () {
      return {}
    },
    props: [''],
    methods: {
      closePopup () {
        this.$emit('hideToast')
      }
    }
  }
</script>
<style>
.my-mask {
  z-index: 1;
  position: absolute;
}
.toast-box {
  width: 80%;
  height: 70%;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: auto;
  transform: translateY(-50%);  
}
.bg-toast {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}
.toast-box .toast-title {
  color: #357d54;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 15% 0 10%;
}
.toast-box .toast-heart {
  width: 130px;
  height: 130px;
  margin: 0 0 10%;
}
.toast-box .btn-cancel {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -60px;
  margin: auto;
}
.toast-box .toast-text {
  color: #357d54;
  text-align: center;
}
</style>