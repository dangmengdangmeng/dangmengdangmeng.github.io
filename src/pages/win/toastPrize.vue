<template>
  <div>
    <div class="text-box">
      <h4 class="text-box-item text-box-title">恭喜你投票数 排名第{{prize_info.rank}}名</h4>
    </div>
    <div class="prize">
      <img
        :src="prize_info.img"
        :style="{left:prize_info.offset?'-9%':'0'}"
        class="prizeImage"
        mode="aspectFit"
      >
    </div>
    <div class="desc-box">
      <div class="desc-title">{{prize_info.des}}</div>
      <div class="desc-text">奖品以实物为准，工作人员以电话联系中奖者</div>
      <div class="desc-text">确认信息，请确认信息无误！</div>
    </div>
    <div class="popup-btn-box">
      <a class="popup-btn" @click="$emit('nextStep')">填写邮寄信息</a>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "",
  components: {},
  data() {
    return {
      resultItem: null
    };
  },
  props: ["prize_info"],
  created() {
    this.resultItem = this.$parent.resultItem;
  },
  methods: {}
};
</script>
<style scoped>
.prize {
  position: relative;
  width: 260px;
  height: 185px;
}
.prizeImage {
  position: absolute;
  left: 0;
  top: 0;
  max-width: 260px;
  max-height: 185px;
}
.text-box {
  width: 100%;
}
.text-box:after {
  content: "";
  display: table;
}
.text-box-item {
  text-align: center;
  color: #357d54;
}
.text-box-title {
  font-size: 20px;
  font-weight: bold;
}
.desc-box {
  margin-top: 10px;
}
.desc-title,
.desc-text {
  color: #357d54;
  text-align: center;
  font-size: 12px;
}
.desc-title {
  font-size: 15px;
  font-weight: bold;
}
.desc-text {
  font-size: 12px;
}
.popup-btn-box {
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 45px;
}
.popup-btn {
  text-align: center;
  display: block;
  background: #62a53b;
  width: 50%;
  line-height: 45px;
  font-size: 16px;
  color: #fff;
  border-radius: 18px;
}
</style>