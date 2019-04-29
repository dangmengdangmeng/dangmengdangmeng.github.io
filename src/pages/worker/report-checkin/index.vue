<template>
  <div class="color_f6 w_h100">
    <div class="bg_white">
      <div
        class="top_nav w_90 m_center b_b size16 flex_space_between ptb5 "
        style="border-color:#000;"
      >
        <div>打卡列表</div>
        <div @click="goTo">全部打卡</div>
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
            text: '新建打卡',
            action: () => {
              wx.navigateTo({url: "/pages/worker/clock_in/add_clock_in/main"})
            }
          }
        ],
        workerList: {
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
        }
      }
    },
    props: [],
    computed: {},
    methods: {
      goTo () {
        wx.navigateTo({url:'/pages/worker/report-checkin/allCheckins/main'})
      }
    }
  }
</script>
<style>
</style>