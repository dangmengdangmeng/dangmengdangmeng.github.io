<template>
  <div>
    <msg 
      title="计划提交成功" 
      description="编号为EO1809231814196051的次日计划提交成功。"
      :buttons="buttons"
    />
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      actionsheetObj: {
        isActionSheetShow: false,
        menus: { online: '上线计划', offline: '非上线计划' },
        urls: { online: '/newOnlinePlan', offline: '/newOfflinePlan' }
      },
      buttons: [
        {
          type: 'primary',
          text: '重新编辑',
          link: '/report'
        },
        {
          type: 'primary',
          text: '新计划',
          onClick: () => {
            wx.showActionSheet({
              itemList: ['上线计划', '非上线计划'],
              success (res) {
                if (res.tapIndex === 0) {
                  wx.navigateTo({url: '/pages/worker/report-plan/newOnlinePlan/main'})
                } else if (res.tapIndex === 1) {
                  wx.navigateTo({url: '/pages/worker/report-plan/newOfflinePlan/main'})
                }
              }
            })
            this.actionsheetObj.isActionSheetShow = true
          }
        },
        {
          type: 'default',
          text: '返回工作台',
          link: '/'
        }
      ]
    }
  }
}
</script>

<style>

</style>
