<template>
  <div class="page_box pb100">
    <div class="top_user_info">
      <img class="top_user_left" :src="user_info.FansHeadImgUrl" alt>
      <div class="top_user_right">
        <div class="top_user_u_name">{{user_info.FansNickName}}</div>
        <div class="top_user_u_info">门店:{{user_info.PassageNodeName}}</div>
        <div class="top_user_u_bottom_box">
          <div class="top_user_u_rank_box wrap">
            <div class="user_cur_rank">
              <span style="font-size:22px;">No.</span>
              <span>{{user_info.Rank}}</span>
            </div>
            <div style="font-size:30px;display:flex;align-items:center;">
              <div>{{user_info.MemberCount}}</div>
              <div class="circle_items">人</div>
              <div>{{user_info.ScanCount}}</div>
              <div class="circle_items">瓶</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="countdown_text size16">倒计时:{{count_down_text}}</div>
    <div class="bottom_rank_box">
      <div class="bottom_rank_tit">
        <div class="bottom_rank_tit_line"></div>
        <div>服务员排行榜</div>
        <div class="bottom_rank_tit_line"></div>
      </div>
      <div class="bottom_rank_body">
        <div class="bottom_rank_top_line"></div>
        <div class="list_box">
          <div class="list_tit">
            <div class="list_tit_item rank_num_tit r_border">排名</div>
            <div class="list_tit_item user_info_tit r_border">服务人员</div>
            <div class="list_tit_item recommend_num_tit r_border">推荐顾客</div>
            <div class="list_tit_item scan_num_tit">扫码量(瓶)</div>
          </div>
          <div class="list_content">
            <div
              class="list_content_item"
              v-for="(item,index) in rank_list"
              :key="index"
              :style="{'background':item.Rank>10?'#fff':'rgb(219, 219, 219)'}"
            >
              <div class="list_item list_item_rank_num r_border">
                <img
                  v-if="item.Rank==1"
                  style="width:40px;height:40px;"
                  src="@/assets/images/rank1.png"
                  alt
                >
                <img
                  v-if="item.Rank==2"
                  style="width:40px;height:40px;"
                  src="@/assets/images/rank2.png"
                  alt
                >
                <img
                  v-if="item.Rank==3"
                  style="width:40px;height:40px;"
                  src="@/assets/images/rank3.png"
                  alt
                >
                <div v-if="item.Rank>3">{{item.Rank}}</div>
              </div>
              <div class="list_item list_item_user_info r_border">
                <div class="list_item_user_info_box">
                  <img :src="item.PassageUserFansHeadImgUrl" alt>
                  <div>{{item.PassageUserName}}</div>
                </div>
              </div>
              <div class="list_item list_item_recommend_num r_border">
                <div>{{item.MemberCount}}</div>
              </div>
              <div class="list_item list_item_scan_num">
                <div>{{item.ScanCount}}</div>
              </div>
            </div>
            <!-- {{result_info}} -->
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      class="w_90 flex"
      style="margin:10px auto 0;justify-content: center;"
      background
      layout="prev, pager, next"
      :pager-count="5"
      :page-count="rank_page_count"
      @current-change="get_page_size"
    ></el-pagination>
    <div class="bottom_btn_box">
      <div class="rule_btn" @click="go_page('/rule')">奖励规则</div>
      <div class="rule_btn" @click="swich_rank">{{switch_btn_text}}</div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      rank_list: [], //排行list
      count_down_text: "", //倒计时文字
      user_info: {}, //头部用户信息
      result_info: 1,
      rank_page_count: 0, //当前排行总页码
      cur_idx: 1, //当前分页页码
      cur_type: 0, //0为当前排行 1为上周排行
      switch_btn_text: "上周排行" //切换按钮的文字
    };
  },
  mounted() {
    this.count_down_text = this.get_countdown();
    this.get_user_info();
    this.get_rank(this.cur_idx);
  },
  methods: {
    get_page_size(page) {
      console.log(page);
      if (this.cur_type == 0) {
        this.get_rank(page);
      } else if (this.cur_type == 1) {
        this.swich_rank(page);
      }
    },
    go_page(url) {
      this.$router.push(url);
    },
    swich_rank(page_idx) {
      if (this.switch_btn_text == "上周排行") {
        this.cur_type = 1;
        this.switch_btn_text = "当前排行";
        this.$http({
          url:
            this.$api.api.history_rank +
            "?activityId=113&_ct=2&oaOpenId=225a333b35c96e744552faa68baad896&uOpenId=8659662804444e4b9ff929bb78b3da21&pageSize=10&pageIndex=" +
            // "?Activity=90&_ct=2&oaOpenId=225a333b35c96e744552faa68baad896&uOpenId=8659662804444e4b9ff929bb78b3da21&pageSize=10&pageIndex=" +
            page_idx
        })
          .then(res => {
            this.result_info = res;
            if (res.data.state == 1) {
              this.rank_list = res.data.data;
              this.rank_page_count = res.data.totalPages;
            }
            console.log(res);
          })
          .catch(err => {
            this.result_info = err;
          });
      } else if (this.switch_btn_text == "当前排行") {
        this.cur_type = 0;
        this.switch_btn_text = "上周排行";
        this.get_rank(1);
      }
    },
    get_countdown() {
      var weekDay = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      var date = new Date();
      var toady = date.getDay();
      // console.log(weekDay[toady]);
      switch (weekDay[toady]) {
        case "星期日":
          return "本周期剩余五天";
          break;
        case "星期一":
          return "本周期剩余四天";
          break;
        case "星期二":
          return "本周期剩余三天";
          break;
        case "星期三":
          return "本周期剩余二天";
          break;
        case "星期四":
          return "本周期剩余最后一天";
          break;
        case "星期五":
          return "本周期剩余七天";
          break;
        case "星期六":
          return "本周期剩余六天";
          break;
        default:
          return "本周期今天结束";
      }
    },
    get_user_info() {
      this.$http({
        url:
          this.$api.api.top_user_info +
          // "?Activity=90&_ct=2&oaOpenId=225a333b35c96e744552faa68baad896&uOpenId=8659662804444e4b9ff929bb78b3da21"
        "?activityId=113&_ct=2&oaOpenId=225a333b35c96e744552faa68baad896&uOpenId=8659662804444e4b9ff929bb78b3da21"
      }).then(res => {
        if (res.data.state == 1) {
          this.user_info = res.data.data;
        }
        console.log(res);
      });
    },
    get_rank(page_idx) {
      this.$http({
        url:
          this.$api.api.get_rank +
          // "?Activity=90&_ct=2&oaOpenId=225a333b35c96e744552faa68baad896&uOpenId=8659662804444e4b9ff929bb78b3da21&pageSize=10&pageIndex=" +
          "?activityId=113&_ct=2&oaOpenId=225a333b35c96e744552faa68baad896&uOpenId=8659662804444e4b9ff929bb78b3da21&pageSize=10&pageIndex=" +
          page_idx
      })
        .then(res => {
          this.result_info = res;
          if (res.data.state == 1) {
            this.rank_list = res.data.data;
            this.rank_page_count = res.data.totalPages;
          }
          console.log(res);
        })
        .catch(err => {
          this.result_info = err;
        });
    }
  }
};
</script>
<style>
* {
  box-sizing: border-box;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: rgb(254, 131, 4) !important;
}
.page_box {
  padding-top: 20px;
  width: 100vw;
  min-height: 100vh;
  background: rgb(12, 91, 163);
}
.bottom_btn_box {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}
.rule_btn {
  width: 120px;
  background: rgb(254, 131, 4);
  color: #fff;
  padding: 2px 0;
  text-align: center;
  font-size: 20px;
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
  z-index: 2;
  margin-right: 10px;
}

.top_user_info {
  width: 90%;
  margin: 0 auto;
  border-radius: 10px;
  background: rgb(220, 234, 244);
  padding: 20px 25px;
  display: flex;
  /* align-items: center; */
  box-sizing: border-box;
}
.top_user_left {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}
.top_user_right {
  flex: 1;
}
.top_user_u_name {
  font-weight: bold;
  font-size: 24px;
}
.top_user_u_info {
  font-size: 16px;
}
.top_user_u_bottom_box {
}
.top_user_u_rank_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}
.user_cur_rank {
  font-size: 30px;
}
.circle_items {
  border-radius: 50%;
  color: #fff;
  background: rgb(254, 131, 4);
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  width: 20px;
  height: 20px;
  margin: 10px 3px 0;
}
.countdown_text {
  width: 90%;
  margin: 4px auto 0;
  background: rgb(220, 234, 244);
  border-radius: 5px;
  padding: 4px 0;
  text-align: center;
}
.bottom_rank_box {
  border-radius: 5px;
  background: rgb(220, 234, 244);
  width: 90%;
  margin: 4px auto 0;
  padding: 4px 10px;
}
.bottom_rank_tit {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 4px;
}
.bottom_rank_tit_line {
  flex: 1;
  height: 2px;
  background: #000;
}
.bottom_rank_top_line {
  width: 100%;
  height: 4px;
  background: rgb(254, 131, 4);
}

.list_box {
  width: 100%;
  margin: 4px 0;
}
.list_tit,
.list_content_item {
  display: flex;
  align-items: center;
  background: rgb(254, 131, 4);
  border-bottom: 5px solid rgb(220, 234, 244);
}
.list_tit_item {
  padding: 6px 0;
  text-align: center;
  color: #fff;
  font-size: 14px;
}
.r_border {
  border-right: 5px solid rgb(220, 234, 244);
}

.list_tit .rank_num_tit,
.list_item_rank_num {
  width: 60px;
}
.list_tit .user_info_tit,
.list_item_user_info {
  flex: 1;
  white-space: wrap;
}

.list_tit .recommend_num_tit,
.list_item_recommend_num {
  width: 70px;
}
.list_tit .scan_num_tit,
.list_item_scan_num {
  width: 80px;
}
.list_content_item {
  background: rgb(219, 219, 219);
  font-size: 18px;
}
.list_item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  font-weight: bold;
  padding: 0 4px;
}
.list_item_user_info {
  align-items: flex-start;
}
.list_item_user_info_box {
  padding: 4px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 17px;
}
.list_item_user_info_box img {
  width: 34px;
  height: 34px;
  margin-right: 6px;
}
</style>