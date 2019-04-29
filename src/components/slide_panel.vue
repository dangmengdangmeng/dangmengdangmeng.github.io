<template>
  <div>
    <!-- 遮罩层 -->
    <div
      :class="['mask', paramsObj.isPanelShow ? 'transition-fade-in' : 'transition-fade-out']"
      style="position:fixed;"
      @tap.stop="paramsObj.isPanelShow=false"
    ></div>
    <!-- 滑入面板 -->
    <div
      :class="['slide-panel', paramsObj.isPanelShow ? 'transition-slide-in' : 'transition-slide-out']"
    >
      <div class="p10_15 flex_space_between" v-if="paramsObj.show_filter_btn">
        <div
          class="filter_btn"
          :class="[index==cur_filter_idx?'cur_filter_btn':'']"
          v-for="(item,index) in paramsObj.filter_btn_list"
          :key="index"
          @click="cur_filter_idx=index"
        >{{item}}</div>
      </div>
      <edit_input :edit_input="paramsObj.edit_input" v-if="paramsObj.edit_input"></edit_input>
      <edit_time :edit_time="paramsObj.edit_time" v-if="paramsObj.edit_time"></edit_time>
      <edit_picker
        :edit_picker="paramsObj.edit_picker"
        @cb="picker_cb"
        v-if="paramsObj.edit_picker"
      ></edit_picker>
      <edit_radio :edit_radio="paramsObj.edit_radio" v-if="paramsObj.edit_radio"></edit_radio>
      <div class="button-container">
        <button
          class="weui-btn weui-btn_default button half-pixel-border"
          @tap="paramsObj.isPanelShow=false"
        >取消</button>
        <button class="weui-btn weui-btn_primary button">查询</button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import edit_input from "@/components/input_item.vue";
import edit_time from "@/components/edit_time.vue";
import edit_radio from "@/components/edit_radio.vue";
import edit_picker from "@/components/edit_picker.vue";
export default {
  components: {
    edit_input,
    edit_time,
    edit_radio,
    edit_picker
  },
  data() {
    return {
      cur_filter_idx:0,
    };
  },
  methods: {
    picker_cb(res) {
      console.log(res);
    }
  },
  props: ["paramsObj"]
};
</script>
<style scoped>
.mask {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  transition-property: opacity;
  transition-duration: 400ms;
}
.slide-panel {
  background: #fff;
  width: 80%;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1500;
  transition-property: transform;
  transition-duration: 300ms;
}
.transition-fade-in {
  opacity: 1;
  z-index: 1000;
}
.transition-fade-out {
  opacity: 0;
  z-index: -100;
}
.transition-slide-out {
  transform: translate3d(100%, 0, 0);
}
.transition-slide-in {
  transform: translate3d(0, 0, 0);
}
.button-container {
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
}
.button {
  width: 40%;
  margin-top: 0;
  height: 80rpx;
  font-size: 30rpx;
}
.half-pixel-border {
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.filter_btn{
  border-radius: 5px;
  border:1px solid #999;
  padding:4px 10px;
}
.cur_filter_btn{
  background: #1AAD19;
  color:#fff;
}
</style>