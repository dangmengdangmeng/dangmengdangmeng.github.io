<template>
  <div class="cur_page_box size14 color_6 m_center">
    <div class="top_tit_box mb20">
      <div class="size24">产品扫码数据</div>
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
        <el-menu-item index="1">月扫码数据</el-menu-item>
      </el-menu>
    </div>
    <div class="top_info">
      <div class="top_info_tit ptb5 pl10">今日关键指标</div>
      <div class="top_info_content ptb10 flex">
        <div class="top_info_content_item max_w t_center">
          <div>新增扫码数</div>
          <div class="size20 bold">0</div>
          <div>日 --</div>
          <div>月 --</div>
          <div>日 --</div>
        </div>
        <div class="top_info_content_item max_w t_center">
          <div>新增异常扫码</div>
          <div class="size20 bold">0</div>
          <div>日 --</div>
          <div>月 --</div>
          <div>日 --</div>
        </div>
        <div class="top_info_content_item max_w t_center">
          <div>扫码用户累计</div>
          <div class="size20 bold">0</div>
          <div>日 --</div>
          <div>月 --</div>
          <div>日 --</div>
        </div>
        <div class="top_info_content_item max_w t_center">
          <div>累计扫码总数</div>
          <div class="size20 bold">0</div>
          <div>日 --</div>
          <div>月 --</div>
          <div>日 --</div>
        </div>
      </div>
    </div>
    <div class="top_tab_bar flex mtb10">
      <div
        class="top_tab_bar_item"
        v-for="(item,index) in tab_bar_info.list"
        :key="index"
        :class="[tab_bar_info.cur==index?'cur_tab_bar':'']"
        @click="switch_tab_bar(index)"
      >{{item}}</div>
    </div>
    <div class="charts_box">
      <div class="charts_tit flex">
        <el-select v-model="charts_sele_val" placeholder="请选择" @change="charts_sele_change">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
          v-model="charts_date_value"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="charts_date_change"
        ></el-date-picker>
        <el-select v-model="charts_sele_val1" placeholder="请选择" @change="charts_sele_change1">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- <div class="charts_tit_right_btn">按时间对比</div> -->
      </div>
      <div class="charts_sub_tit pt15 pl15 flex">
        <div class="charts_sub_tit_line mr5"></div>趋势图
      </div>
      <line_charts :charts_data="chartInfo"></line_charts>
    </div>
    <div class="table_box">
      <div class="table_tit pr15 flex_space_between">
        <el-date-picker
          v-model="table_date_value"
          style="border:none !important"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <div>下载表格</div>
      </div>
      <div class="table_content">
        <wx_table :table_info="table_info" ref="loading"></wx_table>
      </div>
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
      tab_bar_info: {
        cur: 0,
        list: ["新增扫码数", "新增异常扫码", "扫码用户累计", "累计扫码总数"]
      },
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
      options: [
        {
          value: "0",
          label: "最近7天"
        },
        {
          value: "1",
          label: "最近15天"
        },
        {
          value: "2",
          label: "最近30天"
        }
      ],
      options1: [
        {
          value: "0",
          label: "来源1"
        },
        {
          value: "1",
          label: "来源2"
        }
      ],
      charts_sele_val: "最近7天",
      charts_sele_val1: "全部来源",
      charts_date_value: ["2019-05-05", "2019-05-05"],
      table_date_value: ["2019-05-05", "2019-05-05"],
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
          columns: ["日期", "新增扫码数"],
          rows: [
            { 日期: "1月1日", 新增扫码数: 1 },
            { 日期: "1月2日", 新增扫码数: 2 },
            { 日期: "1月3日", 新增扫码数: 3 },
            { 日期: "1月4日", 新增扫码数: 4 },
            { 日期: "1月5日", 新增扫码数: 5 },
            { 日期: "1月6日", 新增扫码数: 6 },
            { 日期: "1月7日", 新增扫码数: 7 }
          ]
        }
      },
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
      nav_bar_val: "day"
    };
  },
  mounted() {},
  methods: {
    switch_tab_bar(idx) {
      this.tab_bar_info.cur = idx;
      this.$message({
        message: "点击tab_bar"
      });
    },
    charts_sele_change(idx) {
      var key = this.options[idx].value;
      var val = this.options[idx].label;
      //   console.log(this.options[idx].value);
      this.$message({
        message: val
      });
    },
    charts_sele_change1(idx) {
      var key = this.options1[idx].value;
      var val = this.options1[idx].label;
      //   console.log(this.options[idx].value);
      this.$message({
        message: val
      });
    },
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
.el-menu--horizontal > .el-menu-item.is-active {
  color: #44b549 !important;
  border-color: #44b549 !important;
  font-weight: bold !important;
}
</style>