<template>
  <div class="size15">
    <div
      class="flex p10_15 bg_white rl"
      style="overflow:hidden;"
      v-for="(item,index) in edit_input"
      :key="index"
      @click="get_input_back(index)"
    >
      <div class="s_b_b1" v-if="!item.hide_border"></div>
      <div class :class="item.class?item.class:'w105'" v-if="item.v">
        <span class="required" v-show="item.required">*</span>
        <span>{{item.v}}</span>
      </div>
      <input
        v-if="!item.value"
        :disabled="item.read?true:false"
        :type="item.type?item.type:'text'"
        :placeholder="item.placeholder?item.placeholder:''"
        class="max_w rl"
        :style="{color:item.color?item.color:''}"
      >
      <div v-if="!item.no_arrow" class="right_ft1"></div>
      <div
        :class="['max_w', 'rl', item.link ? 'link' : '']"
        v-if="item.value"
        :style="{color:item.color?item.color:''}"
        @click="goTo(item.link)"
      >{{item.value}}</div>
      <img
        class="tel_img img20"
        v-if="item.show_tel"
        @click="take_tel(item.value)"
        src="/static/images/mobile.png"
      >
    </div>
  </div>
</template>
<script>
export default {
  props: ["edit_input"],
  methods: {
    take_tel(tel) {
      wx.makePhoneCall({
        phoneNumber: tel
      });
    },
    get_input_back(idx) {
      this.$emit("cb", idx);
    },
    goTo(url) {
      if (url) {
        wx.navigateTo({ url });
      }
    }
  }
};
</script>
<style scoped>
.tel_img {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9;
}
.link {
  color: blue !important;
  text-decoration: underline;
  flex: 1 !important;
  font-size: 15px;
  padding-left: 15px;
  font-family: Arial;
}
</style>