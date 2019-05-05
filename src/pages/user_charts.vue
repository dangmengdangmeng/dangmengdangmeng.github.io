<template>
  <div class="cur_page_box size14 color_6 m_center">
    <div class="top_tit_box mb20">
      <div class="size24">会员分析</div>
      <div class="flex top_tit_nav_box ptb20">
        <div
          class="top_tit_nav_item"
          :class="[cur_top_tit_nav==0?'cur_top_tit_nav':'']"
          @click="cur_top_tit_nav=0"
        >1.基于品牌统计</div>
        <div
          class="top_tit_nav_item"
          :class="[cur_top_tit_nav==1?'cur_top_tit_nav':'']"
          @click="cur_top_tit_nav=1"
        >2.基于门店统计</div>
        <div
          class="top_tit_nav_item"
          :class="[cur_top_tit_nav==2?'cur_top_tit_nav':'']"
          @click="cur_top_tit_nav=2"
        >3.基于经销商统计</div>
        <div
          class="top_tit_nav_item"
          :class="[cur_top_tit_nav==3?'cur_top_tit_nav':'']"
          @click="cur_top_tit_nav=3"
        >4.基于销售通路统计</div>
      </div>
      <div class="flex">
        <div class="pr20">指定品牌</div>
        <el-select v-model="top_tit_select_val" placeholder="请选择品牌">
          <el-option
            v-for="item in top_tit_select_arr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="nav_bar_box mb20">
      <el-menu default-active="1" mode="horizontal">
        <el-menu-item index="1">会员增长</el-menu-item>
        <el-menu-item index="2">会员属性</el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      cur_top_tit_nav: 0,
      top_tit_select_val: "全部",
      top_tit_select_arr: [
        {
          value: "0",
          label: "雅士利"
        },
        {
          value: "1",
          label: "多美滋"
        },
        {
          value: "2",
          label: "Arla"
        },
        {
          value: "3",
          label: "瑞哺恩"
        },
        {
          value: "4",
          label: "朵拉小羊"
        }
      ],
      nav_bar_val: "day"
    };
  },
  methods: {
    navigateTo(tab) {
      let url;
      if (tab.index == 0) {
        url = "/user_charts";
      } else if (tab.index == 1) {
        url = "/user_charts/memberStats";
      }
      this.$router.push({ path: url });
    }
  }
};
</script>
<style>
.top_tit_nav_box {
  justify-content: center;
}
.top_tit_nav_item {
  border-radius: 4px;
  border: 1px solid #333;
  padding: 8px 20px;
}
.cur_top_tit_nav {
  background: #44b549;
  border-color: #44b549;
  color: #fff;
}
.cur_page_box {
  width: 90vw;
  min-height: 100vh;
}
.top_info {
  border: 1px solid #e7e7eb;
}
.top_info_tit {
  background: #f4f5f9;
  border-bottom: 1px solid #e7e7eb;
}
.top_info_content_item {
  border-right: 1px solid #e7e7eb;
}
.top_info_content_item:last-child {
  border-right: none;
}
.top_tab_bar {
}
.top_tab_bar_item {
  padding: 2px 10px;
  border: 1px solid #e7e7eb;
  border-right: none;
}

.top_tab_bar_item:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.top_tab_bar_item:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-right: 1px solid #e7e7eb;
}
.cur_tab_bar {
  background: #44b549;
  color: #fff;
  border-color: transparent;
}
.charts_box {
  border: 1px solid #e7e7eb;
}
.charts_tit {
  background: #f4f5f9;
  border-bottom: 1px solid #e7e7eb;
}

.charts_tit .el-select {
  width: 110px !important;
  border-right: 1px solid #e7e7eb !important;
}
.charts_tit .el-range__icon {
  display: none !important;
}
.charts_tit .el-input__inner {
  background: none !important;
  border: none !important;
}
.charts_tit .el-date-editor--daterange {
  border-right: 1px solid #e7e7eb !important;
}
.charts_tit .el-date-editor--daterange.el-input,
.charts_tit .el-date-editor--daterange.el-input__inner {
  width: 225px !important;
}
.charts_tit .el-date-editor .el-range-input {
  background: none !important;
}
input::-webkit-input-placeholder {
  color: #333 !important;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #333 !important;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #333 !important;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #333 !important;
}
.charts_tit .el-range-separator {
  padding: 0 !important;
  width: auto !important;
  margin: 0 4px !important;
  font-size: 13px !important;
  line-height: 34px !important;
}
.charts_tit_right_btn {
  background: #44b549;
  color: #fff;
  padding: 4px 10px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.charts_sub_tit_line {
  width: 4px;
  height: 15px;
  background: #000;
}
.table_box {
  /* border: 1px solid #e7e7eb; */
}
.table_tit {
  background: #f4f5f9;
  border-bottom: 1px solid #e7e7eb;
}
.table_tit .el-input__inner {
  background: none !important;
  border: none !important;
}
.table_tit .el-date-editor .el-range-input {
  background: none !important;
}
.table_tit .el-range__icon {
  display: none !important;
}
.table_tit .el-date-editor--daterange.el-input,
.table_tit .el-date-editor--daterange.el-input__inner {
  width: 225px !important;
  border-right: 1px solid #e7e7eb !important;
}
.table_tit .el-range-separator {
  padding: 0 !important;
  width: auto !important;
  margin: 0 4px !important;
  font-size: 13px !important;
  line-height: 34px !important;
}

.el-select .el-input.is-focus .el-input__inner {
  border-color: #44b549 !important;
}
.el-select .el-input__inner:focus {
  border-color: #44b549 !important;
}
.el-select-dropdown__item.selected {
  color: #44b549 !important;
}
.el-select-dropdown__item.selected {
  color: #44b549 !important;
}

.el-menu--horizontal > .el-menu-item {
  height: 40px !important;
  line-height: 40px !important;
  font-size: 16px !important;
}
.el-menu-item {
  font-size: 16px !important;
}
.el-menu--horizontal > .el-menu-item.is-active {
  color: #44b549 !important;
  border-color: #44b549 !important;
  font-weight: bold !important;
}
</style>