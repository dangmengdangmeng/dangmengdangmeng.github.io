<template>
  <div>
    <div class="text-box">
      <div class="text-box-item text-box-title">谢谢参与！</div>
      <div class="text-box-item text-box-content">中奖的神仙操作就是拉上</div>
      <div class="text-box-item text-box-content">好友一起参加哦！</div>
    </div>
    <div class="prize qr-code-box">
      <img class="qr-code" src="http://ysl.entfly.com/2/ysl/images/p4/qr-code.png" alt="prize" mode="aspectFit">
      <p class="qr-code-desc">长按识别关注公众号，赢更多福利！</p>
      <button class="popup-btn btn-thanks" open-type="share">邀好友助力</button>
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
    props: ['']
  }
</script>
<style scoped>
.text-box-title {
  font-size: 18px;
  font-weight: 600;
}
.text-box-content {
  font-size: 13px;
}
.qr-code-box {
  margin-top: 15px;
}
.qr-code {
  width: 180px;
  height: 180px;
}
.qr-code-desc {
  color: #357d54;
  font-size: 12px;
  margin-top: 15px;
}
/* .btn-thanks-box {
  width: 100%;
  margin-top: 20px;
  text-align: center;
} */
.btn-thanks {
  width: 45%;
  display: inline-block;
  margin: 10px 0 20px;
}
</style>