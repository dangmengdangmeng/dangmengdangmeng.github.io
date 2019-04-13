<template>
  <div>
    <div
      class="flex p10_15"
      :class="item.hide_border?'':'s_b_b'"
      v-for="(item,index) in edit_time"
      :key="index"
    >
      <div class="w105">{{item.v}}</div>
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
      date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDay();
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