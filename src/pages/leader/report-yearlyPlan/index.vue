<template>
  <div>
    <!-- 搜索框 -->
    <search-bar :search_basic="{placeholder: '请输入要搜索的计划'}" @filter="onShowSlidePanel"></search-bar>
    <!-- list -->
    <!-- <group style="margin-top:10px;"> -->
    <list-flex-item :list_item="cellsData"></list-flex-item>
    <!-- 右侧滑入筛选窗口 -->
    <slide-panel v-show="slidePanelObj.isPanelShow" :paramsObj="slidePanelObj"></slide-panel>
    <!-- <page-bottom-button :paramsList="buttonList"></page-bottom-button> -->
  </div>
</template>
<script>
import SearchBar from '@/components/search.vue';
import ListFlexItem from '@/components/list_item.vue';
import SlidePanel from '@/components/slide_panel.vue'
// import PageBottomButton from '@/components/page_bottom_button.vue'
export default {
  components: {
    ListFlexItem,
    SlidePanel,
    SearchBar,
    // PageBottomButton
  },
  data () {
    return {
      slidePanelObj: {
        isPanelShow: false,
        show_filter_btn: true,
        filter_btn_list: ['一周', '一个月', '三个月'],
        edit_time: [
          {
            v: '开始日期',
            placeholder: '请选择计划开始日期'
          },
          {
            v: '结束日期',
            placeholder: '请选择计划结束日期'
          },
          {
            v: '年月',
            placeholder: '请选择年月'
          }
        ],
        edit_picker: [
          {
            v: '路局',
            list: [['京广', '京沈', '京哈', '京沪']],
            val: [],
            placeholder: '请选择工作路局'
          },
          {
            v: '计划类型',
            list: [['上线计划', '非上线计划']],
            val: [],
            placeholder: '请选择计划类型'
          },
        ]
      },
      buttonList: [
        {
          type: 'weui-btn_primary',
          text: '新建计划',
          action: () => {
            wx.showActionSheet({
              itemList: ['上线计划',  '非上线计划'],
              success (res) {
                if (res.tapIndex === 0) {
                  wx.navigateTo({url: '/pages/leader/report-plan/newOnlinePlan/main'})
                } else if (res.tapIndex === 1) {
                  wx.navigateTo({url: '/pages/leader/report-plan/newOfflinePlan/main'})
                }
              }
            })
          }
        }
      ],
      cellsData: [
        {
          title: '2019年走访及培训计划',
          type: '2019年',
          time: '2018-12-29 16:47:22',
          status: '京沈',
          link: '/pages/leader/report-plan/onlinePlan/main',
          id: 1
        },
        {
          title: '2019年计划观测',
          type: '2019年',
          time: '2018-11-29 16:47:22',
          status: '成都',
          link: '/pages/leader/report-plan/onlinePlan/main',
          id: 2
        },
        {
          title: '2018年各路局年计划',
          type: '2018年',
          time: '2018-12-29 16:47:22',
          status: '京广',
          link: '/pages/leader/report-plan/onlinePlan/main',
          id: 3
        },
      ],
    }
  },
  
  methods: {
    onShowSlidePanel () {
      console.log('show')
      this.slidePanelObj.isPanelShow = true
    }
  }
  
}
</script>

<style>
.V {
  font-size: 19px; 
  margin:10px auto;
  padding: 10px 0;
  border-bottom: 1px solid black;
}
</style>
