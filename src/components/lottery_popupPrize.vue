<template>
  <div>
    <div class="text-box">
      <h4 class="text-box-item text-box-title">恭喜中奖！</h4>
      <h5 class="text-box-item text-box-content">{{result.title}}</h5>
    </div>
    <div class="prize">
      <img :src="result.url" alt="prize" class="prizeImage" mode="aspectFit">
    </div>
    <div class="popup-btn-box w_100 plr10 flex">
      <button class="popup-btn" open-type="share">炫耀一下</button>
      <a class="popup-btn" @click="handleClick">猛戳领奖</a>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "",
  components: {},
  data() {
    return {
      result: null
    };
  },
  created() {
    this.result = this.$parent.result;
    console.log(this.result);
  },
  computed: {},
  methods: {
    handleClick() {
      this.$emit("nextStep");
    }
  },
  onShareAppMessage() {
    return {
      title: "快来pick我家萌宝，一起赢阿尔卑斯山有机体验游！",
      imageUrl: "/static/images/share.jpg",
      path: "/pages/index/main?id=1"
    };
  }
};
</script>
<style>
.prizeImage {
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
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 5px;
}
.text-box-content {
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 5px;
}
.prize {
  text-align: center;
  margin-top: 10px;
}
.popup-btn-box {
  margin-top: 20px;
  margin-bottom: 30px;
  height: 45px;
  justify-content: space-around;
}
.popup-btn {
  text-align: center;
  display: block;
  background: #62a53b;
  width: 35%;
  line-height: 45px;
  font-size: 18px;
  color: #fff;
  margin: 0;
  border-radius: 18px;
  padding: 0 0;
}
</style>