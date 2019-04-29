<template>
  <div class="color_f6 w_h100">
    <div class="bg_white">
      <div
        class="top_nav w_90 m_center b_b size16 flex_space_between ptb5 "
        style="border-color:#000;"
      >
        <div>计划列表</div>
        <div @click="goTo">全部计划</div>
      </div>
    </div>
    <list-item :list_item="workerList.cellsData"></list-item>
    <page-bottom-button :paramsList="buttonList"></page-bottom-button>
  </div>
</template>
<script type="text/javascript">
  import ListItem from '@/components/list_item.vue'
  import PageBottomButton from '@/components/page_bottom_button.vue'
  export default {
    name: '',
    components: { ListItem, PageBottomButton },
    data () {
      return {
        buttonList: [
          {
            type: 'weui-btn_primary',
            text: '新建计划',
            action: () => {
              wx.showActionSheet({
                itemList: ['上线计划',  '非上线计划'],
                success (res) {
                  if (res.tapIndex === 0) {
                    wx.navigateTo({url: '/pages/worker/report-plan/newOnlinePlan/main'})
                  } else if (res.tapIndex === 1) {
                    wx.navigateTo({url: '/pages/worker/report-plan/newOfflinePlan/main'})
                  }
                }
              })
            }
          }
        ],
        workerList: {
          cellsData: [
            {
              title: '01月12日计划',
              'plan_text': '上',
              'plan_color': '#199ed8',
              type: '跟车作业',
              time: '2018-11-29 16:47:22',
              status: '未完成',
              'status_color': '#f00',
              link: '/pages/worker/report-plan/onlinePlan/main?id='+1,
              id: 1
            },
            {
              title: '01月12日计划',
              'plan_text': '上',
              'plan_color': '#199ed8',
              type: '调查作业',
              time: '2018-11-29 16:47:22',
              status: '未完成',
              'status_color': '#f00',
              link: '/pages/worker/report-plan/onlinePlan/main?id='+2,
              id: 2
            },
            {
              title: '01月12日计划',
              'plan_text': '非',
              'plan_color': '#008000',
              type: '走访',
              time: '2018-11-29 16:47:22',
              status: '已完成',
              'status_color': '#00f',
              link: '/pages/worker/report-plan/offlinePlan/main?id='+3,
              id: 3
            }
          ],
        }
      }
    },
    props: [],
    computed: {},
    methods: {
      goTo () {
        wx.navigateTo({url:'/pages/worker/report-plan/allPlans/main'})
      }
    }
  }
</script>
<style>
</style>