<template>
  <div class="lottery-box">
    <img class="bg stack-1" :src="img_baseUrl+'/2/ysl/images/p4/bg.png'" alt="bg-lottery">
    <img
      class="bg stack1"
      :src="img_baseUrl+'/2/ysl/images/p4/bg-front.png'"
      alt="bg-lottery-front"
    >
    <div class="wheel-box stack0">
      <img
        class="wheel"
        :src="img_baseUrl+'/2/ysl/images/p4/wheel.png'"
        alt="bg-wheel"
        mode="aspectFit"
      >
    </div>
    <div class="wheel-box stack1">
      <img
        class="btn-wheel"
        :src="img_baseUrl+'/2/ysl/images/p4/wheel-btn.png'"
        alt="wheel-btn"
        :style="{transform:styleTransform, transition:styleTransition}"
        @click="onClickLotteryBtn"
        mode="aspectFit"
      >
    </div>
    <div class="bottom-btn stack1">今日抽奖剩余次数：{{rotateChance}}</div>
    <div class="mask stack2" v-show="isPopupShow">
      <popup @closePopup="close_cb" :result="result"></popup>
    </div>
  </div>
</template>
<script type="text/javascript">
import Popup from "@/components/lottery_popup.vue";
export default {
  name: "",
  components: {
    Popup
  },
  data() {
    return {
      rotateChance: 0, // 可旋转次数
      rotateBtnDisabled: false, // 旋转按钮是否无法点击
      styleTransform: "",
      styleTransition: "transform 6s ease-in-out",
      rotateStartAngle: 0,
      hasPrize: false, // 是否中奖
      resultList: [
        {
          title: "瑞哺恩门店50元满减券",
          isPrize: true,
          url: "/2/ysl/images/p4/coupon.png"
        },
        {
          title: "旅行折叠饭盒一个",
          isPrize: true,
          url: "/2/ysl/images/p4/prize_img2.png"
        },
        {
          title: "卡通雨伞一把",
          isPrize: true,
          url: "/2/ysl/images/p4/prize_img1.png"
        },

        {
          title: "奶粉分装瓶一个",
          isPrize: true,
          url: "/2/ysl/images/p4/prize_img3.png"
        },
        {
          isPrize: false
        },
        {
          title: "防走失书包一个",
          isPrize: true,
          url: "/2/ysl/images/p4/prize_img4.png"
        }
      ],
      resultIndex: null, // 转轮结果下标
      result: {
        joinOrderOpenId: ""
      },
      isPopupShow: false,
      img_baseUrl: "https://1.mengniuarla.com"
    };
  },
  props: [""],
  onShow() {},
  onLoad() {
    this.getUserInfo();
    for (var i in this.resultList) {
      if (this.resultList[i].url) {
        this.resultList[i].url = this.$api.host + this.resultList[i].url;
      }
    }
    // this.AppMusic = wx.createInnerAudioContext();
    // this.AppMusic.loop = true;
    // this.AppMusic.onPlay(() => {
    //   console.log("开始播放");
    // });
    // this.AppMusic.onError(res => {
    //   console.log(res.errMsg);
    //   console.log(res.errCode);
    // });
    // app.AppMusic.src =
    //   "http://.mp3";
  },
  methods: {
    close_cb(res) {
      this.isPopupShow = false;
      if (res) {
        wx.navigateTo({
          url: "/pages/rank/main"
        });
      }
    },
    // music_() {},
    async getUserInfo() {
      let { data } = await this.$http({
        method: "post",
        url: this.$api.api.GetAwardCount
      });
      if (data.state === 1) {
        this.rotateChance = data.count;
      }
    },
    onClickLotteryBtn() {
      if (this.rotateBtnDisabled) return;
      if (this.rotateChance > 0) {
        this.rotateChance--;
      } else {
        return this.$fun.confirm_modal("提示", "今日抽奖次数已用完", false);
      }
      this.rotateBtnDisabled = true;
      this.getLotteryResult(); // 获取抽奖结果
    },
    async getLotteryResult() {
      let { data } = await this.$http({
        url: this.$api.api.StartActivity,
        method: "post",
        data: {
          activityOpenId: "c04707c1413945cd942c9baf0e72d5d8",
          memberGpsLng: 100,
          memberGpsLat: 100,
          memberID: 271760
        }
      });
      if (data.state === 1) {
        switch (data.data.PrizeCode) {
          //奶粉券
          case "c08230b04418406a92c0c02ceb8a1e2a":
            this.resultIndex = 0;
            break;
          //饭盒
          case "c92f6b5df8dd493e8ccf3652625bee24":
            this.resultIndex = 1;
            break;
          //雨伞
          case "0c44c5ea03d84fa4b5e4a2876af1f979":
            this.resultIndex = 2;
            break;
          //书包
          case "d6e993ccc6ae409490e6980dc2b9a9db":
            this.resultIndex = 5;
            break;
          //奶瓶
          case "a7ed5ccb360742429fca5edf42f36d5e":
            this.resultIndex = 3;
            break;
        }
      } else if (data.state === 2) {
        this.resultIndex = 4;
      }
      this.result = this.resultList[this.resultIndex];
      this.result.joinOrderOpenId = data.data.OpenId;
      // console.log(this.result.joinOrderOpenId)
      this.beginRotate(); // 根据结果旋转转盘
    },
    beginRotate() {
      let fullCircleCount = 10;
      let rotateAngle =
        this.rotateStartAngle +
        fullCircleCount * 360 +
        60 * this.resultIndex -
        this.rotateStartAngle % 360;
      this.styleTransform = "rotate(" + rotateAngle + "deg)";
      this.rotateStartAngle = rotateAngle; // 设置下次旋转的起始度数
      this.endRotate();
    },
    endRotate() {
      let that = this;
      setTimeout(() => {
        that.rotateBtnDisabled = false;
        that.isPopupShow = true;
      }, 6000 + 500);
    }
  }
};
</script>
<style>
html,
body,
#app {
  height: 100%;
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.lottery-box {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 0;
}
.stack-1 {
  z-index: -1;
}
.stack0 {
  z-index: 0;
}
.stack1 {
  z-index: 1;
}
.stack2 {
  position: absolute;
  z-index: 2;
}
.wheel-box {
  position: absolute;
  top: 23%;
  width: 100%;
  height: 70%;
}
.wheel {
  width: 80%;
  height: 100%;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.btn-wheel {
  width: 90px;
  height: 100px;
  position: absolute;
  left: 0;
  right: 0;
  top: 10px;
  bottom: 0;
  margin: auto;
  transform-origin: 50% 44px;
}
.bottom-btn {
  background: #69a73a;
  box-shadow: 0 2px 4px #666;
  width: 50%;
  height: 32px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 30px;
  position: absolute;
  bottom: 6%;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 10px;
}
</style>