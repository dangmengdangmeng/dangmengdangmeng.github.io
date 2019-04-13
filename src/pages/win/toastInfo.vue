<template>
  <div class="info-container">
    <div class="info-box">
      <div class="info-item">
        <span>姓名</span>
        <span>xxx</span>
      </div>
      <div class="info-item">
        <span>身份证</span>
        <span>xxxxxxxxxxxxxxxxx</span>
      </div>
      <div class="info-item">
        <span>电话</span>
        <span>xxxxxxxxxxxx</span>
      </div>
      <div class="info-item">
        <span>地址</span>
        <span>xxxxxxxxxxxxxxxxxxxxxxx</span>
      </div>
    </div>
    <div class="desc-box">
      <div>谢谢参与，工作人员将在5个工作日内致电联系，请保持电话畅通。</div>
      <div>客服热线：400-700-1863</div>
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
.info-container {
  box-sizing: border-box;
  margin-top: -20px;
  width: 100%;
  font-size: 16px;
  color: #357d54;
  display: inline-block;
}
.info-item {
  font-weight: 600;
  margin-top: 20px;
  display: flex;
  text-align: left;
}
.info-item>span:first-child {
  width: 20%;
  text-align-last: justify;
  padding-right: 10px;
}
.desc-box {
  background-color: #ebf4e3;
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
  margin-bottom: 30px;
}
.desc-box>div {
  font-size: 14px;
}
.desc-box>div:nth-child(2) {
  margin-top: 10px;
}

</style>