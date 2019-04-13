<template>
  <div class="form-box">
    <label class="input-title" for="name">姓名</label>
    <input class="popup-input" v-model="name" type="text" id="name" placeholder="请输入你的真实姓名">
    <label class="input-title" for="name">身份证</label>
    <input class="popup-input" v-model="id" type="text" id="id" placeholder="请务必输入正确的身份证号码">
    <label class="input-title" for="name">电话</label>
    <input class="popup-input" v-model="phone" type="text" id="tel" placeholder="请输入手机号码">
    <label class="input-title" for="name">地址</label>
    <picker class="popup-input" mode="region" @change="city_change">
      <view
        class="picker"
        :style="{color:picker_city.length>0?'#97cea2':'#777'}"
      >{{picker_city.length>0?picker_city[0]+"/"+picker_city[1]+"/"+picker_city[2]:"选择省份/城市/区县"}}</view>
    </picker>
    <input
      class="popup-input"
      style="margin-top:10px"
      v-model="address"
      type="text"
      id="address"
      placeholder="请输入地址"
    >
    <div class="btn-box">
      <button class="input-btn" @click="checkInput">立即领取</button>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "",
  components: {},
  data() {
    return {
      name: "",
      id: null,
      phone: null,
      address: "",
      picker_city: [],
      mobileReg: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
    };
  },
  props: ["OpenId_"],
  mounted() {},
  methods: {
    checkInput() {
      // console.log(this.OpenId_)
      if (this.name.length === 0) {
        this.$fun.confirm_modal("提示", "请输入姓名", false);
      } else if (!this.id) {
        this.$fun.confirm_modal("提示", "请输入身份证号", false);
      } else if (!this.phone) {
        this.$fun.confirm_modal("提示", "请输入手机号", false);
      } else if (!this.mobileReg.test(this.phone)) {
        this.$fun.confirm_modal("提示", "手机号码不正确", false);
      } else if (this.picker_city.length === 0) {
        this.$fun.confirm_modal("提示", "请选择省/城/县", false);
      } else if (this.address.length === 0) {
        this.$fun.confirm_modal("提示", "请输入地址", false);
      } else {
        this.submitUserInfo();
      }
    },
    async submitUserInfo() {
      this.$fun.loading();
      let { data } = await this.$http({
        url: this.$api.api.set_user_info,
        method: "post",
        data: {
          RealName: this.name,
          IdCard: this.id,
          Mobile: this.phone,
          ProvinceRegionName: this.picker_city[0],
          CityRegionName: this.picker_city[1],
          AreaRegionName: this.picker_city[2],
          DetailAddress: this.address,
          joinOrderOpenId: this.OpenId_,
          MemberId: 271585
        }
      });
      this.$fun.hide_loading();
      if (data.state == 1) {
        let userInfo = {
          DetailAddress: data.data.DetailAddress,
          IdCard: data.data.IdCard,
          RealName: data.data.RealName,
          Mobile: data.data.Mobile
        };
        this.$emit("nextStep", userInfo);
      }
    },
    city_change(e) {
      this.picker_city = e.target.value;
    }
  }
};
</script>
<style scoped>
.form-box {
  width: 80%;
  position: relative;
  display: inline-block;
  margin-top: -20px;
}
.popup-input {
  display: block;
  width: 100%;
  outline: none;
  border: 0;
  height: 40px;
  border-radius: 12px;
  padding: 0 15px;
  background-color: #fff;
  box-sizing: border-box;
  text-align: left;
}
.popup-input::placeholder {
  color: #a9cd8f;
}
.picker {
  height: 40px;
  line-height: 40px;
  border-radius: 12px;
}
.input-title {
  font-size: 16px;
  color: #357d54;
  font-weight: bold;
  width: 55px;
  text-align-last: justify;
  display: block;
  margin-top: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
}

button {
  outline: none;
  margin: 0;
  padding: 0;
  border: 0;
}
.btn-box {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
}
.input-btn {
  text-align: center;
  display: inline-block;
  background: #62a53b;
  width: 50%;
  line-height: 45px;
  font-size: 18px;
  color: #fff;
  border-radius: 18px;
}
</style>