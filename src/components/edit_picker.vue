<template>
  <div>
    <div class="flex p10_15 bg_white" style="overflow:hidden;" v-for="(item,index) in edit_picker" :key="index">
      <div class="s_b_b1" v-if="!item.hide_border"></div>
      <div :class="item.class?item.class:'w105'" v-if="item.v">
        <span class="required" v-show="item.required">*</span>
        <span>{{item.v}}</span>
      </div>
    <div v-if="!item.no_arrow" class="right_ft1"></div>
      <picker
        class="max_w"
        mode="multiSelector"
        :range="item.list"
        @click="get_date_idx(index)"
        @change="change($event,index)"
      >
        <view class="picker">{{item.placeholder}}</view>
      </picker>
    </div>
  </div>
</template>
<script>
export default {
  props: ["edit_picker"],
  data() {
    return {
      cur_select_idx: 0
    };
  },
  created() {},
  methods: {
    get_date_idx(idx) {
      this.cur_select_idx = idx;
    },
    change(e,index) {
      this.$emit("cb", {
        idx: this.cur_select_idx,
        value: e.mp.detail.value
      });
      let idx = Number(e.mp.detail.value)
      this.edit_picker[index].placeholder = this.edit_picker[index].list[0][idx]
    }
  }
};
</script>



