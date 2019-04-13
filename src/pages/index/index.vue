<template>
  <div>
    <swiper vertical class="w_h100" :current="cur_page" @change="swiper_change" v-if="login_state">
      <swiper-item>
        <div class="index_page_box size0">
          <img class="index_bg" :src="img_baseUrl+'/2/ysl/images/p1/index_bg.jpg'">
          <div class="active_des t_center size15" @click="show_active_info=true">活动简介</div>
          <div class="active_tit w_70 t_center size15">赢阿尔卑斯山有机体验游!</div>
          <img
            class="butterfly animations_"
            :style="{'animation-play-state':show_upload_tips?'paused':''}"
            :src="img_baseUrl+'/2/ysl/images/p1/butterfly.png'"
            mode="aspectFit"
          >
          <div class="upload_box size15">
            <img
              class="upload_btn"
              :src="img_baseUrl+'/2/ysl/images/p1/index_upload.png'"
              mode="widthFix"
            >
            <img
              class="upload_btn1 w40 h40"
              v-if="!show_upload_tips"
              :src="img_baseUrl+'/2/ysl/images/p1/upload_sm_img.png'"
              mode="aspectFit"
            >
            <div
              class="upload_btn1 size19"
              v-if="show_upload_tips"
              @click="show_sign_up=true"
            >点击马上萌拍</div>
          </div>
          <img
            class="bottom_arrow"
            :src="img_baseUrl+'/2/ysl/images/p1/down_arrow.png'"
            mode="aspectFit"
          >
          <div class="active_info pt20" v-if="show_active_info" catchtouchmove="true">
            <img
              class="close_active w20 h20"
              @click="show_active_info=false"
              src="/static/images/close.png"
            >
            <img class="active_bg" :src="img_baseUrl+'/2/ysl/images/p1/active_bg.png'">
            <img
              class="active_info_tit m_center"
              :src="img_baseUrl+'/2/ysl/images/p1/active_info/text_tit.png'"
              mode="widthFix"
            >
            <img
              class="active_info_text mt20"
              :src="img_baseUrl+'/2/ysl/images/p1/active_info/text1.png'"
              mode="widthFix"
            >
            <div class="active_info_text mt10">
              <img
                class="active_info_time"
                :src="img_baseUrl+'/2/ysl/images/p1/active_info/text2.png'"
                mode="widthFix"
              >
            </div>
            <img
              class="active_info_text mt10"
              :src="img_baseUrl+'/2/ysl/images/p1/active_info/text3.png'"
              mode="widthFix"
            >
            <img
              class="active_info_text mt10"
              :src="img_baseUrl+'/2/ysl/images/p1/active_info/text4.png'"
              mode="widthFix"
            >
            <img
              class="active_info_text mt10"
              :src="img_baseUrl+'/2/ysl/images/p1/active_info/text5.png'"
              mode="widthFix"
            >
          </div>
          <div class="sign_up pt50" v-if="show_sign_up" catchtouchmove="true">
            <img
              class="close_active w20 h20"
              @click="show_sign_up=false"
              src="/static/images/close.png"
            >
            <img class="sign_up_bg" :src="img_baseUrl+'/2/ysl/images/p3/sign_up_bg.png'">
            <div class="mb10">
              <img
                class="sign_up_tit m_center"
                :src="img_baseUrl+'/2/ysl/images/p3/sing_up_tit.png'"
                mode="widthFix"
              >
            </div>
            <div class="w_80 m_center" @click.stop>
              <input
                type="text"
                class="input_item bg_white ptb5 plr10 mb20"
                placeholder="输入宝贝昵称"
                v-model="user_name"
              >
              <picker class="input_item bg_white ptb5 plr10 mb20" mode="date" @change="date_change">
                <view
                  class="picker"
                  :style="{color:picker_date.length>0?'#97cea2':'#777'}"
                >{{picker_date.length>0?picker_date:"选择宝贝出生日期"}}</view>
              </picker>

              <picker
                class="input_item bg_white ptb5 plr10 mb20"
                mode="region"
                @change="city_change"
              >
                <view
                  class="picker"
                  :style="{color:picker_city.length>0?'#97cea2':'#777'}"
                >{{picker_city.length>0?picker_city[0]+"/"+picker_city[1]+"/"+picker_city[2]:"选择省份/城市/区县"}}</view>
              </picker>
              <input
                type="number"
                maxlength="11"
                class="input_item bg_white ptb5 plr10 mb20"
                placeholder="输入手机号码"
                v-model="tel"
              >
              <div class="flex_space_between yzm_box">
                <input
                  type="number"
                  maxlength="4"
                  class="input_item bg_white ptb5 plr10 max_w"
                  placeholder="输入验证码"
                  v-model="yzm_val"
                >
                <div class="yzm_btn w90 t_center" @click="get_yzm">{{yzm_text}}</div>
              </div>
            </div>
            <img
              :src="img_baseUrl+'/2/ysl/images/p3/sing_up_btn.png'"
              @click.stop="next_step"
              class="m_center w_80 h40 pt10"
              mode="aspectFit"
            >
          </div>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="p2_page_box size15" id="p2_page_box">
          <img
            class="p2_top_img w_100 h110"
            :src="img_baseUrl+'/2/ysl/images/p2/bg.png'"
            mode="aspectFit"
          >
          <!-- 倒计时组件 -->
          <countdown_ ref="countdown_"></countdown_>
          <!-- search bar -->
          <searchbar @call_back="get_search_info" @clear_call_back="clear_search"></searchbar>
          <div class="top_nav flex">
            <div
              class="top_nav_item"
              :class="cur_top_nav==0?'cur_nav_item':''"
              @click="switch_nav(0)"
            >默认排序</div>
            <div
              class="top_nav_item"
              :class="cur_top_nav==1?'cur_nav_item':''"
              @click="switch_nav(1)"
            >最新参与</div>
            <div
              class="top_nav_item"
              :class="cur_top_nav==2?'cur_nav_item':''"
              @click="go_page('/pages/rank/main')"
            >人气排行</div>
          </div>
          <scroll-view
            scroll-y
            v-if="cur_top_nav==0 || cur_top_nav==1"
            class="list_box w_90 m_center flex_space_between wrap"
            lower-threshold="100"
            @scrolltolower="get_more_list"
          >
            <div
              class="list_item"
              v-for="(item,index) in index_list"
              :key="index"
              @click="go_next_page(item)"
            >
              <div class="list_item_tag w40 h40">
                <img
                  class="w_100 h_100"
                  :src="img_baseUrl+'/2/ysl/images/p2/tag.png'"
                  mode="aspectFit"
                >
                <div>{{item.ID}}号</div>
              </div>
              <div class="w_100 h130">
                <!-- <img :src="img_baseUrl+item.MemberHeadImgUrl" class="w_100 h_100" mode="aspectFill"> -->
                <img :src="img_baseUrl+item.MemberHeadImgUrl" class="w_100 h_100" mode="aspectFill">
              </div>
              <div class="bg_white ptb5" style="color:#62a53b;">
                <div class="flex_space_between plr10 pb5" style="line-height:50rpx;">
                  <div>{{item.BabyName}}</div>
                  <div>{{item.TicketCount}}票</div>
                </div>
                <div
                  class="list_item_btn w_90 m_center flex"
                  @click.stop="set_ticket(item.RankOpenId,index)"
                >
                  <span>投TA一票</span>
                  <img
                    class="w20 h20 ml10"
                    :src="img_baseUrl+'/2/ysl/images/p2/heart.png'"
                    mode="aspectFit"
                  >
                </div>
              </div>
            </div>
          </scroll-view>
          <img
            class="bottom_arrow"
            :src="img_baseUrl+'/2/ysl/images/p1/down_arrow1.png'"
            mode="aspectFit"
          >
        </div>
      </swiper-item>
    </swiper>
    <login v-if="!login_state" @cb="login_cb"></login>
    <my-toast v-if="isToastShow" @hideToast="hideToast"></my-toast>
  </div>
</template>
<script>
import countdown_ from "@/components/countdown_.vue";
import Searchbar from "@/components/searchbar.vue";
import login from "@/components/login.vue";
import MyToast from "@/components/personal_toast.vue";
export default {
  components: {
    countdown_,
    Searchbar,
    login,
    MyToast
  },
  data() {
    return {
      isToastShow: false,
      cur_page: 0,
      show_active_info: false,
      show_upload_tips: false,
      show_sign_up: false,
      yzm_text: "获取验证码",
      yzm_lock: false,
      picker_city: [],
      picker_date: "",
      user_name: "",
      tel: "",
      yzmval: "",
      tel_reg: /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/,
      cur_top_nav: 0,
      default_page_size: 1, //默认展示list的页面
      index_list: [], //参赛列表
      list_page_count: 1, //list总页数
      search_text: "",
      login_state: true,
      img_baseUrl: "",
      ticket_lock: false,
      is_activity_: false
    };
  },
  onLoad() {
    this.img_baseUrl = this.$api.host;
    var SessionId = wx.getStorageSync("SessionId");
    if (SessionId) {
      this.login_state = true;
      this.animate_();
    } else {
      this.login_state = false;
    }
    this.index_list = [];
    this.is_activity();
  },
  onShow() {
    // Object.assign(this, this.$options.data());
  },
  onHide() {
    this.$refs.countdown_.$emit("clear", true);
  },
  mounted() {},
  methods: {
    is_activity() {
      this.$http({
        url: this.$api.api.is_activity,
        methods: "post"
      }).then(res => {
        if (res.data.result) {
          this.is_activity_ = true;
          this.index_list = [];
          this.cur_page = 1;
        }
        console.log(res);
      });
    },
    login_cb(res) {
      if (res) {
        this.$fun.toast("登录成功");
        this.$fun.hide_loading();
        this.login_state = true;
        this.animate_();
      }
    },
    switch_nav(idx) {
      this.$fun.loading("加载中...");
      this.cur_top_nav = idx;
      this.index_list = [];
      if (idx == 0) {
        this.get_list();
      } else if (idx == 1) {
        this.get_list("", "", 1);
      }
    },
    animate_() {
      setTimeout(() => {
        this.show_upload_tips = true;
      }, 4000);
    },
    get_yzm() {
      if (!this.tel_reg.test(this.tel)) {
        this.$fun.confirm_modal("提示", "请输入正确的手机号码", false);
        return;
      }

      if (!this.yzm_lock) {
        this.$fun.loading("发送中...");
        this.$http({
          method: "post",
          url: this.$api.api.get_yzm,
          data: {
            mobile: this.tel
          }
        }).then(res => {
          console.log(res);
          this.$fun.hide_loading();
          if (res.data.state == 1) {
            this.$fun.toast("验证码已发送");
            this.yzm_lock = true;
            this.yzm_text = 60;
            var timer = setInterval(() => {
              if (this.yzm_text > 1) {
                this.yzm_text--;
              } else {
                clearInterval(timer);
                this.yzm_text = "获取验证码";
                this.yzm_lock = false;
              }
            }, 1000);
          }
        });
      }
    },
    city_change(e) {
      //获取选择的城市
      // console.log(e);
      this.picker_city = e.target.value;
    },
    date_change(e) {
      //获取选择的日期
      // console.log(e);
      this.picker_date = e.target.value;
    },
    //切换首页与列表页  0为首页 每次切换 还原默认数据
    swiper_change(e) {
      this.index_list = [];
      var cur_page_ = e.target.current;
      this.cur_page = cur_page_;
      if (cur_page_ == 0) {
        this.show_active_info = false;
        this.show_sign_up = false;
        this.yzm_text = "获取验证码";
        this.yzm_lock = false;
        this.picker_city = [];
        this.picker_date = "";
        this.user_name = "";
        this.tel = "";
        this.yzmval = "";
        this.$refs.countdown_.$emit("clear", true);
      } else if (cur_page_ == 1) {
        this.get_list();
        this.cur_top_nav = 0;
        this.default_page_size = 1;
        this.$refs.countdown_.$emit("clear", false);
      }
    },
    //跳转页面
    go_page(url) {
      wx.navigateTo({
        url: url
      });
    },
    //报名
    next_step() {
      if (this.is_activity_) {
        this.$fun.toast("您已注册");
        return;
      }
      var u_name = this.user_name,
        u_date = this.picker_date,
        u_city = this.picker_city,
        u_tel = this.tel,
        u_yzm = this.yzm_val;
      if (!u_name) {
        this.$fun.confirm_modal("提示", "请输入宝宝姓名", false);
      } else if (!u_date) {
        this.$fun.confirm_modal("提示", "请输入出生日期", false);
      } else if (u_city.length < 1) {
        this.$fun.confirm_modal("提示", "请输入所在城市", false);
      } else if (!this.tel_reg.test(u_tel)) {
        this.$fun.confirm_modal("提示", "请输入正确的手机号码", false);
      } else if (!u_yzm) {
        this.$fun.confirm_modal("提示", "请输入验证码", false);
      } else {
        wx.setStorage({
          key: "u_name",
          data: u_name
        });
        wx.setStorage({
          key: "u_date",
          data: u_date
        });
        wx.setStorage({
          key: "u_city",
          data: u_city
        });
        wx.setStorage({
          key: "u_tel",
          data: u_tel
        });
        // 友好加载中提示
        this.$fun.loading("验证中...");
        this.$http({
          method: "post",
          url: this.$api.api.set_yzm,
          data: {
            mobile: this.tel,
            smsCheckCode: u_yzm
          }
        }).then(res => {
          this.$fun.hide_loading();
          if (res.data.state == 1) {
            setTimeout(() => {
              this.go_page("/pages/upload_img/main");
            }, 1000);
          }
        });
      }
    },
    get_search_info(res) {
      //搜索后的操作
      // console.log(res);
      this.index_list = [];
      if (res != "") {
        //输入搜索内容
        this.search_text = res;
        this.$fun.loading("搜索中..");
        setTimeout(() => {
          this.get_list(1, res, "");
        }, 1000);
      } else {
        //没有搜索或删除了搜索内容  去请求默认的列表
        this.get_list(1, "", "");
      }
    },
    clear_search(res) {
      //点击搜索框的关闭按钮  清空搜索内容并请求默认列表
      this.index_list = [];
      this.search_text = "";
      this.get_list(1, "", "");
      // console.log(res);
    },
    //点击list_item
    go_next_page(userInfo) {
      var count_down_end = wx.getStorageSync("count_down_end");
      if (count_down_end) {
        this.$fun.confirm_modal("提示", "活动已结束", false);
      } else {
        let payload = { RankOpenId: userInfo.RankOpenId };
        payload = JSON.stringify(payload);
        this.go_page("/pages/personal/main?payload=" + payload);
      }
    },
    get_list(page, search, orderby) {
      this.$http({
        url: this.$api.api.get_index_list,
        method: "post",
        data: {
          PageIndex: page ? page : 1, //默认页码
          BabyName: search ? search : "", //搜索内容
          orderby: orderby ? orderby : "" //默认排序  传1为最新排序
        }
      })
        .then(res => {
          if (search) {
            //搜索
            if (res.data.data.length <= 0) {
              let cb = () => {
                if (this.cur_top_nav == 1) {
                  this.get_list(1, "", 1); //当前展示列表为最新排序
                } else {
                  this.get_list(1, "", ""); //默认列表
                }
              };
              this.$fun.alert_modal("数据为空,请重试", "提示", cb);
            } else {
              this.index_list = this.index_list.concat(res.data.data);
              this.list_page_count = res.data.totalCount;
            }
          } else {
            //没有搜索 正常请求
            this.index_list = this.index_list.concat(res.data.data);

            this.list_page_count = res.data.totalCount;
          }
          this.$fun.hide_loading();
        })
        .catch(err => {
          console.log(err);
        });
    },
    get_search_list(page, search) {},
    //分页加载
    get_more_list() {
      if (this.list_page_count > this.default_page_size) {
        this.$fun.loading("加载信息中");
        this.default_page_size++;
        //如果当前加载的是搜索后的列表
        if (this.search_text) {
          if (this.cur_top_nav == 1) {
            this.get_list(this.default_page_size, this.search_text, 1);
          } else {
            this.get_list(this.default_page_size, this.search_text, "");
          }
        } else {
          this.get_list(this.default_page_size, "", "");
        }
      } else {
        this.$fun.toast("到底了");
      }
    },
    set_ticket(id, idx) {
      if (!this.ticket_lock) {
        this.$fun.loading("投票中..");
        this.ticket_lock = true;
        this.$http({
          url: this.$api.api.set_ticket,
          method: "post",
          data: {
            RankOpenId: id //默认页码
          }
        }).then(res => {
          this.$fun.hide_loading();
          setTimeout(() => {
            this.ticket_lock = false;
          }, 1000);
          if (res.data.state == 1) {
            this.isToastShow = true;
            this.index_list[idx].TicketCount++;
            // this.$fun.toast("投票成功");
          }
          console.log(res);
        });
      }
    },
    hideToast() {
      this.isToastShow = false;
    }
  }
};
</script>
<style scoped>
.index_page_box {
  width: 100vw;
  height: 100vh;
}
.active_des {
  position: absolute;
  right: -4px;
  top: 40px;
  background: #6ebf54;
  width: 34px;
  padding: 10px 14px 10px 10px;
  color: #fff;
  border-radius: 10px;
  box-shadow: 1px 8px 5px -2px rgba(0, 0, 0, 0.3);
}
.active_tit {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translateX(-50%);
  background: #6ebf54;
  color: #fff;
  border-radius: 10px;
  padding: 4px 0;
  letter-spacing: 4px;
}
.butterfly {
  width: 30px;
  height: 34px;
  position: absolute;
  right: 95px;
  bottom: 152px;
}
.animations_ {
  animation: animX 3s cubic-bezier(0.36, 0, 0.64, 1) -1s forwards infinite alternate,
    animY 3s cubic-bezier(0.36, 0, 0.64, 1) 0s forwards infinite alternate;
}
@keyframes animX {
  0% {
    right: 125px;
    transform: rotate(0deg);
  }
  100% {
    right: 95px;
    transform: rotate(15deg);
  }
}
@keyframes animY {
  0% {
    bottom: 172px;
    transform: rotate(0deg);
  }
  100% {
    bottom: 152px;
    transform: rotate(-15deg);
  }
}
.bottom_arrow {
  width: 28px;
  height: 28px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.upload_box {
  width: 240px;
  position: absolute;
  bottom: 10%;
  right: 12%;
  animation: upload_box 1s 2s ease-in-out forwards;
}
@keyframes upload_box {
  0% {
    bottom: 10%;
    right: 12%;
  }
  100% {
    bottom: 5%;
    right: 5%;
  }
}
.upload_btn {
  width: 100%;
}
.upload_btn1 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
}
.active_info,
.sign_up {
  width: 80%;
  height: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.close_active {
  position: absolute;
  right: 10px;
  top: 10px;
}
.index_bg {
  width: 100vw;
  height: 100vh;
  position: relative;
  left: 0;
  top: 0;
  z-index: -1;
}
.active_bg,
.sign_up_bg {
  width: 100%;
  height: 100%;
}
.active_bg,
.sign_up_bg {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}
.active_info_tit {
  width: 100px;
  display: inline-block;
}
.active_info_text {
  display: inline-block;
  width: 90%;
}
.active_info_time {
  width: 36%;
}
.avtive_info_tips,
.active_info_sub_tit {
  color: #566540;
}
.text_num_ {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 5px;
  margin-right: 5px;
  background: #566540;
}

.sign_up_tit {
  width: 150px;
}

.input_item {
  border-radius: 10px;
  color: #97cea2;
}
.input_item::placeholder {
  color: #97cea2;
}
.yzm_box {
}
.yzm_box input {
  border-radius: 8px;
}
.yzm_btn {
  border-radius: 8px;
  color: #fff;
  padding: 6px;
  margin-left: 10px;
  background: #36a14a;
}

/* p2的css */
.p2_page_box {
  background: #ebf4e3;
  width: 100vw;
  min-height: 100vh;
}

.top_nav {
  width: 100%;
  height: 40px;
  border-bottom: 2px solid #bcbcbc;
  justify-content: center;
}
.top_nav_item {
  padding: 0 10px;
  margin-right: 20px;
  height: 42px;
  line-height: 42px;
  border-bottom: 2px solid transparent;
}
.top_nav_item:last-child {
  margin-right: 0;
}
.cur_nav_item {
  border-color: #62a53b;
  color: #62a53b;
}
.list_box {
  margin-top: 5vw;
  height: 330px;
}
.list_item {
  display: inline-block;
  width: 42.5vw;
  margin-right: 5vw;
  margin-bottom: 5vw;
}
.list_item:nth-child(2n) {
  margin-right: 0;
}
.list_item:last-child {
  /* padding-bottom: 50px; */
}
.list_item_tag {
  position: absolute;
  left: 5px;
  top: -2px;
  z-index: 1;
  color: #fff;
}
.list_item_tag div {
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  line-height: 36px;
  width: 100%;
  font-size: 10px;
}
.list_item_btn {
  border-radius: 50px;
  background: #62a53b;
  color: #fff;
  padding: 4px 0;
  line-height: 50rpx;
  justify-content: center;
}
.p2_top_img {
  position: absolute;
  left: 0;
  top: 0;
}
</style>