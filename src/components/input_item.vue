<template>
  <div>
    <div
      class="flex p10_15 bg_white rl"
      v-for="(item,index) in edit_input"
      :key="index"
      :class="item.hide_border?'':'s_b_b'"
    >
      <div class :class="item.class?item.class:'w105'">{{item.v}}</div>
      <input
        :disabled="item.read?true:false"
        :type="item.type?item.type:'text'"
        :placeholder="item.placeholder?item.placeholder:''"
        :value="item.value?item.value:''"
        class="max_w rl"
        :class="item.no_arrow?'':'right_ft'"
        :style="{color:item.color?item.color:''}"
      >
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
</style>