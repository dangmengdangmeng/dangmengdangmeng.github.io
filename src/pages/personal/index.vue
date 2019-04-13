<template>
  <div class="personal-container w_h100">
    <img class="bg-personal" :src="img_baseUrl+'/2/ysl/images/p5/bg-leaves2.png'">
    <!-- 上半部分 -->
    <div class="personal-upper">
      <div class="user-box">
        <img class="avatar" v-if="userInfo.WechatHeadImgUrl" :src="userInfo.WechatHeadImgUrl">
        <div class="avatar-bg" v-else>头像</div>
        <p class="name">[{{userInfo.FansNickname}}]</p>
      </div>
      <div class="details-box">
        <div class="info-box">
          <div class="info-item">
            <div>{{userInfo.ID}}</div>
            <div>编号</div>
          </div>
          <div class="info-item">
            <div>{{userInfo.TicketCount}}</div>
            <div>萌力值</div>
          </div>
          <div class="info-item">
            <div>{{userInfo.TopRank}}</div>
            <div>排行</div>
          </div>
        </div>
        <div class="btn-box">
          <a class="btn" @click="go_page('/pages/rank/main')">排行榜</a>
        </div>
      </div>
    </div>
    <!-- 下半部分 -->
    <div class="personal-lower">
      <img
        class="poster d_block"
        :src="img_baseUrl+userInfo.MemberHeadImgUrl"
        mode="aspectFit"
        @click="preview_img"
      >
      <div class="btn-box" @click="vote(userInfo.RankOpenId)">
        <img
          class="btn-like"
          :src="img_baseUrl+'/2/ysl/images/p5/icon-heart.png'"
          alt="icon-heart"
          mode="aspectFit"
        >
        <div class="btn-text">投一票</div>
      </div>
    </div>
    <!-- toast -->
    <my-toast v-if="isToastShow" @hideToast="hideToast"></my-toast>
  </div>
</template>
<script type="text/javascript">
import MyToast from "@/components/personal_toast.vue";
import countdown_ from "@/components/countdown_.vue";
export default {
  name: "",
  components: {
    MyToast,
    countdown_
  },
  data() {
    return {
      isToastShow: false,
      userInfo: {},
      payload: {
        RankOpenId: ""
      },
      img_baseUrl: ""
    };
  },
  props: [""],
  onLoad(params) {
    this.img_baseUrl = this.$api.host;
    this.payload = JSON.parse(params.payload);
    this.get_user_info();
  },
  methods: {
    go_page(url) {
      wx.navigateTo({
        url: url
      });
    },
    preview_img() {
      wx.previewImage({
        current: this.img_baseUrl + this.userInfo.MemberHeadImgUrl, // 当前显示图片的http链接
        urls: [this.img_baseUrl + this.userInfo.MemberHeadImgUrl] // 需要预览的图片http链接列表
      });
    },
    async get_user_info() {
      let { data } = await this.$http({
        url: this.$api.api.get_memberInfo,
        method: "post",
        data: this.payload
      });
      if (data.state === 1) {
        console.log(data.data);
        this.userInfo = data.data;
      }
      console.log(data);
    },
    async vote(id) {
      var count_down_end = wx.getStorageSync("count_down_end");
      if (count_down_end) {
        this.$fun.confirm_modal("提示", "活动已结束", false);
      } else {
        this.$fun.loading("投票中..");
        this.$http({
          method: "post",
          url: this.$api.api.set_ticket,
          data: { RankOpenId: id }
        }).then(res => {
          this.$fun.hide_loading();
          if (res.data.state === 1) {
            this.isToastShow = true;
          }
        });
      }
    },
    hideToast() {
      this.isToastShow = false;
      this.get_user_info();
    }
  }
};
</script>
<style>
#app,
body,
html {
  height: 100%;
}
.personal-container:before {
  content: "";
  display: table;
}
.personal-container {
  background: #cfe7cc;
}
.bg-personal {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
.personal-upper {
  margin-top: 20%;
  border-bottom: 1px solid #9bcb60;
  color: #34a94b;
  display: flex;
}
.personal-upper .user-box {
  width: 35%;
}
.user-box {
  text-align: center;
}
.user-box .avatar {
  width: 80px;
  height: 80px;
  border: 1px solid #999;
  box-sizing: border-box;
  border-radius: 20px;
  position: relative;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.user-box .avatar-bg {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  background: #b5b6b6;
  line-height: 80px;
  text-align: center;
  position: relative;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.user-box .name {
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}
.personal-upper .details-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 30px;
}
.info-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
}
.info-box .info-item {
  flex: 1;
}
.info-item div:first-child {
  font-size: 20px;
  font-weight: bold;
}
.details-box .btn-box {
  justify-content: center;
  display: flex;
  flex: 1;
  align-items: center;
}
.btn-box .btn {
  background: #36a14a;
  color: #fff;
  width: 80%;
  text-align: center;
  border-radius: 15px;
  padding: 3px;
}
.personal-lower .poster {
  width: 80vw;
  height: 80vw;
  margin: 15px auto 0;
}
.personal-lower .btn-box {
  text-align: center;
  width: 20%;
  left: 0;
  right: 0;
  margin: 10px auto 0;
}
.personal-lower .btn-text {
  color: #c30131;
  font-size: 20px;
}
.personal-lower .btn-like {
  display: block;
  width: 35px;
  height: 35px;
  left: 0;
  right: 0;
  margin: 0 auto;
}
</style>