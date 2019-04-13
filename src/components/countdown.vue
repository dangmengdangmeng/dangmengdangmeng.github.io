<template>
  <div class="countdown-container pt90">
    <div class="countdown-box">
      <span class="dot-badge">·</span>距投票结束：
      <span class="countdown-text">X</span>天
      <span class="countdown-text">X</span>时
      <span class="countdown-text">X</span>分
    </div>
    <div class="total-count-box">
      <div class="total-count-item">
        <p>参赛萌宝</p>
        <p class="total-count">2000</p>
      </div>
      <div class="total-count-item">
        <p>累计投票</p>
        <p class="total-count">120W</p>
      </div>
      <div class="total-count-item">
        <p>神助攻</p>
        <p class="total-count">120W</p>
      </div>
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
<style>
.countdown-container {
  font-size: 18px;
}

.countdown-box {
  color: #62a53b;
  width: 100%;
  padding: 0 30px 10px;
}
.dot-badge {
  color: #f00;
  font-weight: bold;
}
.countdown-text {
  color: #f00;
}
.total-count-box {
  color: #62a53b;
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.total-count {
  color: #f00;
  font-size: 22px;
  font-weight: 500;
}
</style>