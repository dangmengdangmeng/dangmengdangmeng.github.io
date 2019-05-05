<template>
  <div>
    <div class="top_info">
      <div class="top_info_tit ptb5 pl10">今日关键指标</div>
      <div class="top_info_content ptb10 flex">
        <div class="top_info_content_item max_w t_center">
          <div>新增新客数</div>
          <div class="size20 bold">0</div>
          <div>日 --</div>
          <div>月 --</div>
          <div>日 --</div>
        </div>
        <div class="top_info_content_item max_w t_center">
          <div>新增会员数</div>
          <div class="size20 bold">0</div>
          <div>日 --</div>
          <div>月 --</div>
          <div>日 --</div>
        </div>
        <div class="top_info_content_item max_w t_center">
          <div>累计微信绑定数</div>
          <div class="size20 bold">0</div>
          <div>日 --</div>
          <div>月 --</div>
          <div>日 --</div>
        </div>
        <div class="top_info_content_item max_w t_center">
          <div>累计会员总数</div>
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
<script type="text/javascript">
import line_charts from "@/components/line_charts";
import wx_table from "@/components/wx_table";
  export default {
    name: '',
    components: { line_charts, wx_table },
    data () {
      return {
        tab_bar_info: {
          cur: 0,
          list: ["新增新客数", "新增会员数", "累计绑定数", "累计会员总数"]
        },
        table_info: {
          table_config: {
            border: true, //是否显示边框
            stripe: true, //是否显示隔行色
            "highlight-current-row": true, //是否高亮显示当前点击行
            data: [], //数据
            pageCount: 1, //总页数
            pageTotal: 1, //总条数
            pageIndex: 1, //当前页
            pageSize: 50 //每次展示几条
          },
          table_tit_arr: [
            {
              name: "序号",
              prop: "Index",
              sort: true
            },
            {
              name: "事业部",
              prop: "BusinessUnitName",
              sort: true
            },
            {
              name: "名字",
              prop: "LoginName",
              sort: true
            },
            {
              name: "手机号",
              prop: "Mobile",
              sort: true
            },
            {
              name: "角色",
              prop: "PassageUserType",
              sort: true
            },
            {
              name: "更新时间",
              prop: "UpdateOn",
              sort: true
            }
          ],
          loading: false
        },
        charts_sele_val: "最近7天",
        charts_sele_val1: "全部来源",
        charts_date_value: ["2019-05-05", "2019-05-05"],
        table_date_value: ["2019-05-05", "2019-05-05"],
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
            columns: ["日期", "新增会员数"],
            rows: [
              { 日期: "1月1日", 新增会员数: 1 },
              { 日期: "1月2日", 新增会员数: 2 },
              { 日期: "1月3日", 新增会员数: 3 },
              { 日期: "1月4日", 新增会员数: 4 },
              { 日期: "1月5日", 新增会员数: 5 },
              { 日期: "1月6日", 新增会员数: 6 },
              { 日期: "1月7日", 新增会员数: 7 }
            ]
          }
        },
      }
    },
    props: [],
    computed: {},
    mounted() {
      this.$refs.loading.$emit("loading", true);
      this.table_info.loading = true;
      this.get_table_info(
        this.table_info.table_config.pageIndex,
        this.table_info.table_config.pageSize
      );
    },
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
      },
      get_table_info(index, size) {
        this.$http({
          url: this.$api.api.table + "?PageSize=" + size + "&PageIndex=" + index
        }).then(res => {
          this.$refs.loading.$emit("loading", false);
          this.table_info.loading = false;
          this.table_info.table_config.data = res.data.data.rows;
          this.table_info.table_config.pageCount = res.data.data.page.TotalPages;
          this.table_info.table_config.pageTotal = res.data.data.page.TotalItems;
        });
      },

    }
  }
</script>
<style>
</style>