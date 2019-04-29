<template>
  <div>
    <div class="flex p10_15 bg_white" v-for="(item,index) in edit_time" :key="index">
      <div class="s_b_b1" v-if="!item.hide_border"></div>
      <div :class="item.class?item.class:'w105'">
        <span class="required" v-show="item.required">*</span>
        <span>{{item.v}}</span>
      </div>
      <div v-if="!item.no_arrow" class="right_ft1"></div>

      <picker
        class="max_w"
        mode="date"
        :value="today"
        start="2000-01-01"
        end="2119-01-01"
        @click="get_date_idx(index)"
        @change="get_date_change"
      >
        <view class="picker">{{item.placeholder}}</view>
      </picker>
    </div>
  </div>
</template>
<script>
export default {
  props: ["edit_time"],
  data() {
    return {
      today: "",
      cur_select_idx: 0
    };
  },
  created() {
    var date = new Date();
    this.today =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    // console.log(this.today);
  },
  methods: {
    get_date_change(e) {
      this.edit_time[this.cur_select_idx].placeholder = e.mp.detail.value;
    },
    get_date_idx(idx) {
      this.cur_select_idx = idx;
    }
  }
};
</script>