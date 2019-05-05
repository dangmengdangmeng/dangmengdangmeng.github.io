<template>
  <div class="admin-bg">
    <div class="admin-board">
      <div class="admin-table">
        <div class="admin-table-header">用户属性</div>
        <div class="admin-table-title">性别分布</div>
        <bar-chart class="admin-table-item" :chartData="barChartData1"></bar-chart>
        <div class="admin-table-title">会员分布</div>
        <bar-chart class="admin-table-item" :chartData="barChartData2"></bar-chart>
        <div class="admin-table-title">省份分布</div>
        <map-chart class="admin-table-item" :chartData="mapChartData" style="display:inline-block;margin-right:50px;"></map-chart>
        <table-inline class="admin-table-item" style="width:650px;" :tableData="tableData1" :displayInline="true"></table-inline>
        <div>
          <div class="admin-table-title" style="display:inline-block">城市分布</div>
          <el-select v-model="selectValue" placeholder="请选择" style="width:120px;">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <table-inline class="admin-table-item" :tableData="tableData2"></table-inline>
      </div>
      <div class="admin-table" style="margin-top:50px;">
        <div class="admin-table-header">
          <span style="float:left;height:50px;line-height:50px;clear:both;">用户属性分布表</span>
          <div class="admin-table-tab">
            <a :class="[activeTab==0 ? 'admin-table-item-active': 'admin-table_tab-item']" @click="switchTab(0)">性别</a>
            <a :class="[activeTab==1 ? 'admin-table-item-active': 'admin-table_tab-item']" @click="switchTab(1)">省份</a>
            <a :class="[activeTab==2 ? 'admin-table-item-active': 'admin-table_tab-item']" @click="switchTab(2)">城市</a>
            <a :class="[activeTab==3 ? 'admin-table-item-active': 'admin-table_tab-item']" @click="switchTab(3)">类型</a>
          </div>
        </div>
        <div class="admin-table-title">详细数据</div>
        <table-inline class="admin-table-item" :tableData="tableDataSelect" :showPercentage="true" :hidePagination="true"></table-inline>
      </div>
    </div>
    <!-- 
    <pie-chart :chartData="pieChartData"></pie-chart> -->
  </div>
</template>
<script type="text/javascript">
  import BarChart from '@/components/chart_bar.vue'
  import MapChart from '@/components/chart_map.vue'
  import PieChart from '@/components/chart_pie.vue'
  import TableInline from '@/components/table_inline.vue'
  export default {
    name: '',
    components: { BarChart, MapChart, PieChart, TableInline },
    data () {
      return {
        activeTab: 0,
        selectValue: '',
        barChartData1: {
          columns: ['日期', '未知', '男', '女'],
          rows: [
            { '日期': '05-04', '未知': 3 , '男': 529, '女': 631 },
          ]
        },
        barChartData2: {
          columns: ['日期', '自主注册', '未知', '帮注册会员'],
          rows: [
            { '日期': '05-04', '自主注册': 30, '未知': 93, '帮注册会员': 1022 },
          ]
        },
        mapChartData: { columns: ['位置', '人数'] },
        pieChartData: {
          columns: ['机型', '用户数'],
          rows: [
            { '机型': '未知', '用户数': 861 },
            { '机型': '苹果iPhone 7 Plus', '用户数': 45 },
            { '机型': '苹果iPhone 7', '用户数': 38 },
            { '机型': '苹果iPhone 6S Plus', '用户数': 37 },
            { '机型': '苹果iPhone X', '用户数': 37 },
            { '机型': 'OPPO R9S', '用户数': 32 },
          ]
        },
        tableData0: [{
            col1: '未知',
            col2: '3',
            col3: ''
          }, {
            col1: '男',
            col2: '529',
            col3: ''
          }, {
            col1: '女',
            col2: '631',
            col3: ''
          }],
        tableData1: [{
            col1: '河南省',
            col2: '341',
            col3: ''
          }, {
            col1: '广东省',
            col2: '294',
            col3: ''
          }, {
            col1: '山东省',
            col2: '127',
            col3: ''
          }, {
            col1: '北京省',
            col2: '68',
            col3: ''
          }, {
            col1: '四川省',
            col2: '47',
            col3: ''
          }, {
            col1: '安徽省',
            col2: '42',
            col3: ''
          }, {
            col1: '江西省',
            col2: '29',
            col3: ''
          }, {
            col1: '湖北省',
            col2: '28',
            col3: ''
          }, {
            col1: '吉林省',
            col2: '26',
            col3: ''
          }, {
            col1: '河北省',
            col2: '23',
            col3: ''
                      }, {
            col1: '湖南省',
            col2: '17',
            col3: ''
          }, {
            col1: '江苏省',
            col2: '14',
            col3: ''
          }, {
            col1: '山西省',
            col2: '12',
            col3: ''
          }, {
            col1: '贵州省',
            col2: '11',
            col3: ''
          }, {
            col1: '山西省',
            col2: '10',
            col3: ''
          }, {
            col1: '广西',
            col2: '9',
            col3: ''
          }, {
            col1: '宁夏',
            col2: '9',
            col3: ''
        }],
        tableData2: [{
            col1: '肇庆',
            col2: '218',
            col3: ''
          }, {
            col1: '商丘',
            col2: '131',
            col3: ''
          }, {
            col1: '北京',
            col2: '68',
            col3: ''
          }, {
            col1: '安阳',
            col2: '57',
            col3: ''
          }, {
            col1: '广州',
            col2: '34',
            col3: ''
          }, {
            col1: '新乡',
            col2: '34',
            col3: ''
          }, {
            col1: '聊城',
            col2: '24',
            col3: ''
          }, {
            col1: '郑州',
            col2: '17',
            col3: ''
          }, {
            col1: '驻马店',
            col2: '17',
            col3: ''
          }, {
            col1: '潍坊',
            col2: '16',
            col3: ''
          }, {
              col1: '青岛',
            col2: '16',
            col3: ''
          }, {
            col1: '烟台',
            col2: '14',
            col3: ''
          }, {
            col1: '滨州',
            col2: '14',
            col3: ''
          }, {
            col1: '济宁',
            col2: '14',
            col3: ''
          }, {
            col1: '开封',
            col2: '14',
            col3: ''
          }, {
            col1: '佛山',
            col2: '13',
            col3: ''
          }, {
            col1: '洛阳',
            col2: '13',
            col3: ''
          }, {
            col1: '焦作',
            col2: '17',
            col3: ''
          }, {
            col1: '濮阳',
            col2: '12',
            col3: ''
          }, {
            col1: '长春',
            col2: '11',
            col3: ''
        }],
        tableData3: [{
            col1: '帮注册会员',
            col2: '1022',
            col3: ''
          }, {
            col1: '未知',
            col2: '93',
            col3: ''
          }, {
            col1: '自主注册',
            col2: '30',
            col3: ''
        }],
        tableDataSelect: []
      }
    },
    props: [],
    computed: {
      selectOptions () {
        return this.tableData2.map(item => {
          return { label: item.col1, value: item.col1 }
        })
      }
    },
    created () {
      this.tableDataSelect = this.tableData0
    },

    methods: {
      switchTab (idx) {
        this.activeTab = idx
        this.tableDataSelect = this['tableData'+idx]
      }
    }
  }
</script>
<style>
</style>