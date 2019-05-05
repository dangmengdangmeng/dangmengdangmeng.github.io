<template>
  <div class="cur_page_box dealer_count size14 color_6 m_center pt20">
    <div class="top_tit_box mb20">
      <div class="size24">经销商库存数据</div>
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
        <el-menu-item index="1">当前库存数据</el-menu-item>
      </el-menu>
    </div>
    <div class="w_100 table_header_top flex_space_between mb10">
      <div class="w_100 flex">
        <div class="size14 mr50">日期</div>
        <el-date-picker
          class="w_30"
          v-model="search_date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <div class="flex" style="color:#5b74b2;">
          <div class="plr10 b_r">最近三天</div>
          <div class="plr10 b_r">最近一周</div>
          <div class="plr10">最近一月</div>
        </div>
        <el-button
          type="primary"
          style="background:#44b549;border-color:#44b549;"
          @click="search_tabel"
        >查询</el-button>
        <div class="ml30" @click="more_search" style="color:#5b74b2;">高级查询</div>
        <!-- <el-button size="small" @click="more_search"></el-button> -->
        <!-- <el-button size="small" @click="clear_search">清空</el-button> -->
      </div>
    </div>
    <div class="w_70 table_header_center flex mb10" v-if="show_more_search">
      <div class="size14 mr5">编码</div>
      <el-input
        class="max_w mr10"
        v-model="search_num"
        prefix-icon="el-icon-search"
        placeholder="编码"
      ></el-input>
    </div>
    <div class="charts_sub_tit pt15 pl15 flex mb20 size16">
      <div class="charts_sub_tit_line mr5"></div>累计数据和趋势
    </div>
    <div class="charts_box">
      <div class="flex switch_box">
        <div
          class="switch_item p10 b_r"
          :class="[cur_switch_idx==0?'cur_switch_idx':'']"
          @click="cur_switch_idx=0"
        >
          <div>库存总数(个)</div>
          <div class="size24 ptb5">0.00</div>
          <div>对比2019-04-21至2019-04-27</div>
          <div class="switch_item_arrow" v-if="cur_switch_idx==0"></div>
        </div>
        <div
          class="switch_item p10 b_r"
          :class="[cur_switch_idx==1?'cur_switch_idx':'']"
          @click="cur_switch_idx=1"
        >
          <div>库存经销商(个)</div>
          <div class="size24 ptb5">0</div>
          <div>对比2019-04-21至2019-04-27</div>
          <div class="switch_item_arrow" v-if="cur_switch_idx==1"></div>
        </div>
        <div
          class="switch_item p10 b_r"
          :class="[cur_switch_idx==2?'cur_switch_idx':'']"
          @click="cur_switch_idx=2"
        >
          <div>库存单品数(个)</div>
          <div class="size24 ptb5">0.00</div>
          <div>对比2019-04-21至2019-04-27</div>
          <div class="switch_item_arrow" v-if="cur_switch_idx==2"></div>
        </div>
      </div>
      <line_charts :charts_data="chartInfo"></line_charts>
    </div>
    <div class="charts_sub_tit pt15 pl15 flex_space_between mb20 size16">
      <div class="flex">
        <div class="charts_sub_tit_line mr5"></div>详细数据
      </div>
      <div class="flex size14">
        下载账单：
        <div class="pr10 b_r" style="color:#5b74b2;">Excel格式</div>
        <div class="pl10" style="color:#5b74b2;">Txt格式</div>
      </div>
    </div>
    <div class="table_content">
      <wx_table :table_info="table_info" ref="loading"></wx_table>
    </div>
  </div>
</template>

<script>
import line_charts from "@/components/line_charts";
import wx_table from "@/components/wx_table";
export default {
  components: { line_charts, wx_table },
  data() {
    return {
      table_date_value: "",
      chartInfo: {
        chartSettings: {
          area: false
        },
        legend: {
          bottom: 20
        },
        charts_extend: {
          xAxis: {
            axisLine: {
              lineStyle: {
                color: "#44b549"
              }
            }
          }
        },
        data: {
          columns: ["日期", "实销数量"],
          rows: [
            { 日期: "2019-04-28", 实销数量: 1 },
            { 日期: "2019-04-29", 实销数量: 2 },
            { 日期: "2019-04-30", 实销数量: 3 },
            { 日期: "2019-05-01", 实销数量: 4 },
            { 日期: "2019-05-02", 实销数量: 5 },
            { 日期: "2019-05-03", 实销数量: 6 },
            { 日期: "2019-05-04", 实销数量: 7 }
          ]
        }
      },
      search_name: "",
      search_num: "",
      search_birthday: "",
      show_more_search: false,
      search_date: ["2019-05-05", "2019-05-06"],
      search_sele: "",
      search_sele_arr: ["类型1", "类型2"],
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
      table_info: {
        table_config: {
          height: 400,
          border: true, //是否显示边框
          stripe: true, //是否显示隔行色
          "highlight-current-row": true, //是否高亮显示当前点击行
          data: [
            {
              date: "2019-04-28",
              num: "0.00",
              store_num: 0,
              sales_num: "0.00"
            },
            {
              date: "2019-04-29",
              num: "0.00",
              store_num: 0,
              sales_num: "0.00"
            },
            {
              date: "2019-04-30",
              num: "0.00",
              store_num: 0,
              sales_num: "0.00"
            },
            {
              date: "2019-05-01",
              num: "0.00",
              store_num: 0,
              sales_num: "0.00"
            },
            {
              date: "2019-05-02",
              num: "0.00",
              store_num: 0,
              sales_num: "0.00"
            },
            {
              date: "2019-05-03",
              num: "0.00",
              store_num: 0,
              sales_num: "0.00"
            },
            {
              date: "2019-05-04",
              num: "0.00",
              store_num: 0,
              sales_num: "0.00"
            }
          ], //数据
          pageCount: 1, //总页数
          pageTotal: 1, //总条数
          pageIndex: 1, //当前页
          pageSize: 50 //每次展示几条
        },
        table_tit_arr: [
          {
            name: "日期",
            prop: "date"
          },
          {
            name: "实效数量(个)",
            prop: "num"
          },
          {
            name: "实销门店数(个)",
            prop: "store_num"
          },
          {
            name: "实销单品数(个)",
            prop: "sales_num"
          }
        ],
        show_operation: true,
        loading: false
      },
      nav_bar_val: "day",
      cur_switch_idx: 0
    };
  },
  mounted() {},
  methods: {
    charts_date_change(res) {
      //折线图的日期选择
      console.log(res);
      this.$message({
        message: res
      });
      if (res) {
        var start_date = res[0];
        var end_date = res[1];
      }
    },
    search_tabel() {
      this.$message({
        message: "搜索"
      });
    },
    more_search() {
      this.show_more_search = !this.show_more_search;
    },
    clear_search() {
      this.search_name = "";
      this.search_num = "";
      this.search_birthday = "";
      this.search_sele = "";
      this.search_date = "";
    }
  }
};
</script>
<style>
.cur_page_box {
  width: 90vw;
  min-height: 100vh;
}
.table_header_center .el-date-editor.el-input,
.table_header_center .el-date-editor.el-input__inner {
  width: 50% !important;
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

.charts_tit .el-date-editor--daterange.el-input,
.charts_tit .el-date-editor--daterange.el-input__inner,
.charts_tit .el-date-editor--timerange.el-input,
.charts_tit .el-date-editor--timerange.el-input__inner {
  width: 225px !important;
  border-right: 1px solid #e7e7eb !important;
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
  height: 18px;
  background: #44b549;
}
.table_box {
  border: 1px solid #e7e7eb;
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

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #44b549;
}
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
.switch_item_arrow {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -18px;
  width: 0;
  height: 0;
  border: 10px solid #44b549;
  border-color: #44b549 transparent transparent transparent;
}
.switch_item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  background: #fafbfc;
}
.cur_switch_idx {
  background: #44b549;
  color: #fff;
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
.el-menu--horizontal > .el-menu-item.is-active {
  color: #44b549 !important;
  border-color: #44b549 !important;
  font-weight: bold !important;
}
</style>