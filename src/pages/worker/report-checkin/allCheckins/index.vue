<template>
  <div>
    <!-- 搜索框 -->
    <search-bar :search_basic="{placeholder: '请输入要搜索的计划'}" @filter="onShowSlidePanel"></search-bar>
    <!-- list -->
    <!-- <group style="margin-top:10px;"> -->
    <list-flex-item :list_item="cellsData"></list-flex-item>
    <!-- 右侧滑入筛选窗口 -->
    <slide-panel v-show="slidePanelObj.isPanelShow" :paramsObj="slidePanelObj"></slide-panel>

  </div>
</template>

<script>
import SearchBar from '@/components/search.vue';
import ListFlexItem from '@/components/list_item.vue';
import SlidePanel from '@/components/slide_panel.vue'
// import EditTime from '@/components/edit_time.vue';
// import EditSelect2 from '@/components/edit_select2.vue';

export default {
  components: {
    ListFlexItem,
    SlidePanel,
    SearchBar
    // EditTime,
    // EditSelect2,
  },
  data () {
    return {
      inputValue: '',
      isInputFocused: false,
      isResultShow: false,
      slidePanelObj: {
        isPanelShow: false,
        show_filter_btn: true,
        filter_btn_list: ['一周', '一个月', '三个月'],
        edit_time: [
          {
            v: '开始日期',
            placeholder: '请选择打卡开始日期'
          },
          {
            v: '结束日期',
            placeholder: '请选择打卡结束日期'
          }
        ],
        edit_picker: [
          {
            v: '工作路局',
            list: [['北京铁路局', '上海铁路局', '山西铁路局']],
            val: [],
            placeholder: '请选择工作路局'
          },
          {
            v: '打卡状态',
            list: [['未完成', '已完成']],
            val: [],
            placeholder: '请选择打卡状态'
          }
        ]
      },
      filterParams: {
        period: '',
        StartTime: '',
        EndTime: '',
        operationType: '',
        workType: '',
        planStatus: '',
        railwayBureau: ''
      },
      cellsData: [
        {
          title: '01月12日作业',
          type: '信阳东站',
          time: '09:32:12-13:32:12 4:12:21',
          status: '未完成',
          'status_color': '#f00',
          link: '/pages/worker/report-checkin/checkinDetails/main?id='+1,
          id: 1
        },
        {
          title: '01月12日作业',
          type: '信阳东站',
          time: '09:32:12-13:32:12  4:12:21',
          status: '已完成',
          'status_color': '#00f',
          link: '/pages/worker/report-checkin/checkinDetails/main?id='+2,
          id: 2
        },
        {
          title: '01月12日作业',
          type: '信阳东站',
          time: '09:32:12-13:32:12  4:12:21',
          status: '已完成',
          'status_color': '#00f',
          link: '/pages/worker/report-checkin/checkinDetails/main?id='+2,
          id: 3
        }
      ],
      inputParams2: [
        {
          v: '作业类型',
          list: [['打磨作业', '焊接作业', '组装作业']],
          val: [],
          placeholder: '请选择作业类型'
        },
        {
          v: '工作类型',
          list: [['巡视', '清点', '巡查']],
          val: [],
          placeholder: '请选择工作类型'
        },
        {
          v: '计划状态',
          list: [['未完成', '已完成']],
          val: [],
          placeholder: '请选择计划状态'
        },
        {
          v: '工作路局',
          list: [['北京铁路局', '上海铁路局', '山西铁路局']],
          val: [],
          placeholder: '请选择工作路局'
        }
      ],
    }
  },
  methods: {
    resetForm () {
      this.inputParams2.forEach(item => {
        item.val = []
      })
      this.inputParams1[0].default_time = '请选择计划开始日期'
      this.inputParams1[1].default_time = '请选择计划结束日期'
      this.filterParams.period = ''
    },

    onShowSlidePanel () {
      console.log('show')
      this.slidePanelObj.isPanelShow = true
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
