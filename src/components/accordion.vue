<template>
  <div style="background:#fff;">
    <!-- 下拉标题 -->
    <div title>
      <div 
        class='flex s_b_b' 
        style="padding: 10px 0; font-weight:bold;"
        @click="isAccordionShow = !isAccordionShow"
      >
        <div class='input_left_w105 size15 pl15' style="flex:1;">
          <span>{{ title }}</span>
        </div>
        <div style="padding-right:10px;">
          <i class="iconfont">&#xe601;</i>
        </div>
      </div>
    </div>
    <!-- 下拉内容 -->
      <div title v-show="isAccordionShow">
        <edit-input :edit_input="params"></edit-input>

        <!-- <div class='flex s_b_b' v-for="(item,index) in params" :key="index">
          <div class='input_left_w105 size15 pl15' :class="item.v?'':'p10_15'" v-show='item.v'>
            <span class='required' v-show="item.required">*</span>
            <span>{{item.v}}</span>
          </div>
          <input
            v-bind:placeholder="item.value"
            class="size15 max_w"
            v-bind:type="item.num?'number':'text'"
            :readonly="item.read"
            v-show='item.value'
          >
          <div class='size15 max_w scroll_box p10_15 color_6'  v-show='item.swipe'>
            {{item.swipe}}
          </div>
        </div> -->

      </div>
  </div>
</template>

<script>
import EditInput from '@/components/input_item.vue'
export default {
  components: {EditInput},
  data () {
    return {
      isAccordionShow: true
    }
  },
  props: ['title', 'params']
}
</script>

<style>
@font-face {
  font-family: 'iconfont';  /* project id 1098297 */
  src: url('//at.alicdn.com/t/font_1098297_t09xs95akb.eot');
  src: url('//at.alicdn.com/t/font_1098297_t09xs95akb.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1098297_t09xs95akb.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1098297_t09xs95akb.woff') format('woff'),
  url('//at.alicdn.com/t/font_1098297_t09xs95akb.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1098297_t09xs95akb.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
