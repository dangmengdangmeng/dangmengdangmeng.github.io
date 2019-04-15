<template>
  <div class="w_h100">
    <div class="rank-container" v-if="!isToastShow">
      <img class="bg bg-top" :src="img_baseUrl+'/2/ysl/images/p2/bg.png'" alt="bg-leaves">
      <!-- 倒计时组件 -->
      <countdown_ ref="countdown_" :count_down_info="count_down_info"></countdown_>
      <searchbar @call_back="get_search_info" @clear_call_back="clear_search"></searchbar>
      <!-- rank -->
      <div
        v-if="cur_user_list_info.TopRank>0"
        class="cur_user_list_info mt10 plr15 ptb5 flex_space_between"
        @click="goUserPage(cur_user_list_info)"
      >
        <div class="left_box flex">
          <div class="place-box">
            <img
              class="icon-medal"
              v-if="cur_user_list_info.TopRank==1"
              :src="img_baseUrl+'/2/ysl/images/p5/icon-gold.png'"
              alt="icon"
              mode="aspectFit"
            >
            <img
              class="icon-medal"
              v-else-if="cur_user_list_info.TopRank==2"
              :src="img_baseUrl+'/2/ysl/images/p5/icon-silver.png'"
              alt="icon"
              mode="aspectFit"
            >
            <img
              class="icon-medal"
              v-else-if="cur_user_list_info.TopRank==3"
              :src="img_baseUrl+'/2/ysl/images/p5/icon-bronze.png'"
              alt="icon"
              mode="aspectFit"
            >
            <span v-else style="font-size:22px;">{{cur_user_list_info.TopRank}}</span>
          </div>
          <div class="user-info-box">
            <img class="avatar" :src="cur_user_list_info.WechatHeadImgUrl" mode="aspectFill">
            <span>{{cur_user_list_info.BabyName}}</span>
          </div>
        </div>

        <div class="right_box flex">
          <div class="prize-box" v-if="countDownEnd" @click.stop="collectPrize(cur_user_list_info)">
            <img
              class="icon-prize"
              v-if="cur_user_list_info.TopRank == 1"
              src="/static/images/p5/icon-prize1.png"
              alt
              mode="aspectFit"
            >
            <img
              class="icon-prize"
              v-else-if="cur_user_list_info.TopRank > 1 && cur_user_list_info.TopRank <= 4"
              src="/static/images/p5/icon-prize2.png"
              alt
              mode="aspectFit"
            >
            <img
              class="icon-prize"
              v-else-if="cur_user_list_info.TopRank > 4 && cur_user_list_info.TopRank <= 10"
              src="/static/images/p5/icon-prize3.png"
              alt
              mode="aspectFit"
            >
          </div>
          <span class="ticket_item">{{cur_user_list_info.TicketCount}} 票</span>
        </div>
      </div>
      <div class="rank-body-box mt10">
        <div
          class="rank-body-item plr15 ptb5 flex_space_between"
          v-for="(item, index) in list"
          :key="index"
          @click="goUserPage(item)"
        >
          <div class="left_box flex">
            <div class="place-box">
              <img
                class="icon-medal"
                v-if="item.TopRank==1"
                :src="img_baseUrl+'/2/ysl/images/p5/icon-gold.png'"
                alt="icon"
                mode="aspectFit"
              >
              <img
                class="icon-medal"
                v-else-if="item.TopRank==2"
                :src="img_baseUrl+'/2/ysl/images/p5/icon-silver.png'"
                alt="icon"
                mode="aspectFit"
              >
              <img
                class="icon-medal"
                v-else-if="item.TopRank==3"
                :src="img_baseUrl+'/2/ysl/images/p5/icon-bronze.png'"
                alt="icon"
                mode="aspectFit"
              >
              <span v-else style="font-size:22px;">{{item.TopRank}}</span>
            </div>
            <div class="user-info-box">
              <img class="avatar" :src="item.WechatHeadImgUrl" mode="aspectFit">
              <span>{{item.BabyName}}</span>
            </div>
          </div>

          <div class="right_box flex">
            <div class="prize-box" v-if="countDownEnd" @click.stop="collectPrize(item)">
              <img
                class="icon-prize"
                v-if="item.TopRank == 1"
                src="/static/images/p5/icon-prize1.png"
                alt
                mode="aspectFit"
              >
              <img
                class="icon-prize"
                v-else-if="item.TopRank > 1 && item.TopRank <= 4"
                src="/static/images/p5/icon-prize2.png"
                alt
                mode="aspectFit"
              >
              <img
                class="icon-prize"
                v-else-if="item.TopRank > 4 && item.TopRank <= 10"
                src="/static/images/p5/icon-prize3.png"
                alt
                mode="aspectFit"
              >
            </div>
            <span class="ticket_item">{{item.TicketCount}} 票</span>
          </div>
        </div>
        {{countDownEnd1}}
      </div>
    </div>
    <toast v-else @closeToast="isToastShow=false" :prizeInfo="prizeInfo"></toast>
  </div>
</template>
<script type="text/javascript">
import countdown_ from "@/components/countdown_.vue";
import Searchbar from "@/components/searchbar.vue";
import Toast from "@/components/rank_toast.vue";
export default {
  components: {
    countdown_,
    Searchbar,
    Toast
  },
  data() {
    return {
      list: [],
      newList: [],
      count_down_info: {
        show_info: true
      },
      list_page_count: 5,
      default_page: 1,
      // countDownEnd: wx.getStorageSync('count_down_end'),
      countDownEnd: true,
      isToastShow: false,
      prizeInfo: {},
      search_text: "",
      cur_user_list_info: {},
      img_baseUrl: ""
    };
  },
  onLoad() {
    this.list = [];
    this.img_baseUrl = this.$api.host;
    this.get_list(1, "", "");
  },
  mounted() {
    this.$refs.countdown_.$emit("clear", false);
  },
  onShow() {
    if (this.$refs.countdown_) this.$refs.countdown_.$emit("clear", false);
  },
  onHide() {
    this.$refs.countdown_.$emit("clear", true);
  },
  onReachBottom() {
    if (this.default_page < this.list_page_count) {
      this.$fun.loading("加载信息中");
      this.default_page++;
      if (this.search_text != "") {
        this.get_list(this.default_page, this.search_text, "");
      } else {
        this.get_list(this.default_page, "", "");
      }
    } else {
      this.$fun.toast("到底了");
    }
  },
  methods: {
    //搜索后的操作
    get_search_info(res) {
      //搜索后的操作
      // console.log(res);
      this.list = [];
      if (res != "") {
        //输入搜索内容
        this.search_text = res;
        this.$fun.loading("搜索中..");
        setTimeout(() => {
          this.get_list(1, res, 2);
        }, 1000);
      } else {
        //没有搜索或删除了搜索内容  去请求默认的列表
        this.get_list(1, "", 2);
      }
    },
    get_list(page, search, orderby) {
      this.$http({
        url: this.$api.api.get_index_list,
        method: "post",
        data: {
          PageIndex: page ? page : 1, //默认页码
          BabyName: search ? search : "", //搜索内容
          orderby: orderby ? orderby : 2 //默认排序按投票排序
        }
      }).then(res => {
        console.log(res);
        if (search) {
          //搜索
          if (res.data.data.length <= 0) {
            this.$fun.alert_modal("数据为空,请重试", "提示");
          } else {
            this.list = this.list.concat(res.data.data);
            this.list_page_count = res.data.totalCount;
          }
        } else {
          //没有搜索 正常请求
          this.list = this.list.concat(res.data.data);
          if (res.data.user.ID != 0) {
            res.data.user.isMe = true;
            this.cur_user_list_info = res.data.user;
          }
          this.list_page_count = res.data.totalCount;
        }
        this.$fun.hide_loading();
      });
    },
    clear_search() {
      this.list = [];
      this.search_text = "";
      this.get_list(1, "", 2);
    },
    goUserPage(userInfo) {
      let payload = {
        RankOpenId: userInfo.RankOpenId
      };
      payload = JSON.stringify(payload);
      mpvue.navigateTo({ url: "/pages/personal/main?payload=" + payload });
    },
    async collectPrize(userInfo) {
      let { data } = await this.$http({
        url: this.$api.api.ApplyRankAward,
        method: "post",
        data: { RankOpenId: userInfo.RankOpenId }
      });

      if (data.state === 1) {
        switch (data.data.PrizeCode) {
          case "5dde208d3c544501a313e12aacbd61b6":
            this.prizeInfo.img =
              this.img_baseUrl + "/2/ysl/images/p5/level1.png";
            this.prizeInfo.offset = true;
            break;
          case "8aa142dc459c4f83baf7503cb5eb3981":
            this.prizeInfo.img =
              this.img_baseUrl + "/2/ysl/images/p5/level2.png";
            break;
          case "1385ea3e5cee4898b92e5c72ac11669e":
            this.prizeInfo.img =
              this.img_baseUrl + "/2/ysl/images/p5/level3.png";
            break;
        }
        // this.prizeInfo.des = data.data.PrizeCode;
        this.prizeInfo.des = data.data.AwardName;
        this.prizeInfo.rank = data.data.TopRank;
        this.prizeInfo.joinOrderOpenId = data.data.OpenId;
        // this.$fun.alert_modal(this.prizeInfo.joinOrderOpenId);
        this.isToastShow = true;
      }
    }
  },
  props: [""]
};
</script>
<style scoped>
.rank-container {
  background-color: #ebf4e3;
  min-height: 100vh;
}
.rank-container:before {
  content: "";
  display: table;
}
.bg-top {
  width: 100%;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
}
.rank-body-box {
  text-align: center;
  /* margin-top: 20px; */
  font-size: 18px;
  padding-bottom: 20px;
}
.rank-body-box > div:nth-child(2n + 1) {
  background-color: #63a959;
  color: #fff;
}
.rank-body-box > div:nth-child(2n) {
  color: #63a959;
}
.cur_user_list_info {
  background-color: #63a959;
  color: #fff;
}
.rank-body-item {
  height: 50px;
}

.user-info-box {
  display: flex;
  align-items: center;
  height: 40px;
}
.user-info-box .avatar {
  display: block;
  width: 40px;
  margin-right: 10px;
  height: 40px;
}
.place-box {
  width: 40px;
  height: 40px;
  line-height: 40px;
  position: relative;
  margin-right: 10px;
}
.icon-medal {
  height: 100%;
  width: 100%;
}
.prize-box {
  width: 40px;
  height: 40px;
  position: relative;
  margin-left: 10px;
}
.icon-prize {
  height: 90%;
  width: 100%;
}
.right_box {
}
.ticket_item {
  margin-left: 10px;
}
</style>