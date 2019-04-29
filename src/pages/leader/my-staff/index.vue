<template>
  <div>
    <search-bar :search_basic="{placeholder: '请输入要搜索的计划'}" @filter="onShowSlidePanel"></search-bar>
    <!-- list -->
    <list-flex-item :list_item="cellsData"></list-flex-item>
    <!-- 右侧滑入筛选窗口 -->
    <slide-panel v-show="slidePanelObj.isPanelShow" :paramsObj="slidePanelObj"></slide-panel>
  </div>
</template>
<script type="text/javascript">
  import SearchBar from '@/components/search.vue';
  import ListFlexItem from '@/components/list_item.vue';
  import SlidePanel from '@/components/slide_panel.vue'
  export default {
    name: '',
    components: {
      ListFlexItem,
      SlidePanel,
      SearchBar,
    },
    data () {
      return {
        cellsData: [
          {
            title: '刘华',
            type: '员工',
            time: '13321221231',
            status: '信阳南站',
            gender: 'male',
            link: '/pages/leader/my-staffDetails/main?id=1',
            id: 1,
          },
          {
            title: '宋丹',
            type: '员工',
            time: '13312223332',
            status: '信阳南站',
            gender: 'female',
            link: '/pages/leader/my-staffDetails/main?id=2',
            id: 2
          },
          {
            title: '李明',
            type: '员工',
            time: '13321221231',
            status: '信阳南站',
            gender: 'male',
            link: '/pages/leader/my-staffDetails/main?id=3',
            id: 3
          },
        ],
        slidePanelObj: {
          isPanelShow: false,
          show_filter_btn: true,
          edit_picker: [
            {
              v: '性别',
              list: [['男', '女']],
              val: [],
              placeholder: '请选择性别'
            },
            {
              v: '职务',
              list: [['员工', '班组长']],
              val: [],
              placeholder: '请选择职务'
            },
            {
              v: '所属机构',
              list: [['信阳南站', '京广']],
              val: [],
              placeholder: '请选择所属机构'
            },
            {
              v: '状态',
              list: [['上班 ', '休假']],
              val: [],
              placeholder: '请选择状态'
            },
          ]
        },
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
</style>