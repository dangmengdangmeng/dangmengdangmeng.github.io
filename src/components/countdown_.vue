<template>
  <div class="countdown-container pt90">
    <div class="countdown-box flex" v-if="count_down!='活动结束'">
      <div class="dot-badge">·</div>距投票结束：
      <div class="countdown-text">{{count_down[0]}}</div>天
      <div class="countdown-text">{{count_down[1]}}</div>时
      <div class="countdown-text">{{count_down[2]}}</div>分
    </div>
    <div class="countdown-box flex" style="color:red;" v-if="count_down=='活动结束'">投票已结束</div>
    <div class="total-count-box" v-if="count_down_info&&count_down_info.show_info">
      <div class="total-count-item">
        <p>参赛萌宝</p>
        <p class="total-count">{{count_info[0]}}</p>
      </div>
      <div class="total-count-item">
        <p>累计投票</p>
        <p class="total-count">{{count_info[1]}}</p>
      </div>
      <div class="total-count-item">
        <p>神助攻</p>
        <p class="total-count">{{count_info[2]}}</p>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "",
  components: {},
  data() {
    return {
      count_down: [0, 0, 0, 0],
      count_info: [0, 0, 0],
      count_down_: "", //倒计时定时器
      clear_interval: false
    };
  },
  props: ["count_down_info"],
  mounted() {
    this.$on("clear", val => {
      if (val) {
        this.clear_interval = true;
        clearInterval(this.count_down_);
      } else {
        this.get_top_info();
        this.clear_interval = false;
      }
    });
  },
  computed: {},
  methods: {
    countTime(data_date) {
      var that = this;
      that.count_down_ = setInterval(function() {
        //获取当前时间
        var date = new Date();
        var now = date.getTime();
        //设置截止时间
        var endDate = new Date(
          data_date ? data_date : "2019/04/08 20:45 00:00"
        );
        var end = endDate.getTime();
        //时间差
        var leftTime = end - now;
        if (leftTime > 0) {
          //定义变量 d,h,m,s保存倒计时的时间
          var d = Math.floor(leftTime / 1000 / 3600 / 24);
          var h = Math.floor((leftTime / 1000 / 3600) % 24);
          var m = Math.floor((leftTime / 1000 / 60) % 60);
          var s = Math.floor((leftTime / 1000) % 60);
          that.count_down = [d, h, m, s];
          // console.log(d, h, m, s);
          wx.setStorage({
            key: "count_down_end",
            data: false
          });
        } else {
          clearInterval(count_down_);
          that.count_down = "活动结束";
          wx.setStorage({
            key: "count_down_end",
            data: true
          });
        }
      }, 1000);
    },
    get_top_info() {
      this.$http({
        method: "post",
        url: this.$api.api.page2_top_info
        // data: { activityOpenId: "c04707c1413945cd942c9baf0e72d5d8" }
      }).then(res => {
        // console.log(res);
        this.countTime(res.data.endDate);
        this.count_info[0] = res.data.joinUserCount;
        this.count_info[1] = res.data.titketCount;
        this.count_info[2] = res.data.assistsCount;
      });
    }
  }
};
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