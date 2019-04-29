<template>
  <div style="height:100vh;">
    <div style="height:100vh;" v-if="!isMsgShow">
      <span class="group-title">新建报告（非上线作业）</span>
      <edit-picker :edit_picker="pickerParamsList"></edit-picker>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="input_left_w105 size15 pl15 textarea-title" >备忘</div>
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" style="height:100px" placeholder="在这里输入备忘" rows="2"></textarea>
          </div>
        </div>
      </div>
      <div class="submit-btn-box">
        <button 
          @click="isDialogShow = true"
          class="weui-btn weui-btn_primary"
        >
          提交报告
        </button>
      </div>
    </div>
    <!-- confirm dialog -->
    <confirm-dialog 
      v-if="isDialogShow" 
      @cancelSave="isDialogShow = false"
      @confirmSave="onConfirmSave"
    />
    <!-- loading toast -->
    <div v-if="isLoadingShow" style="height:100%;position:absolute;top:0;left:0;width:100%;">
      <div class="weui-mask" style="height:100vh"></div>
    </div>
    <msg-panel v-if="isMsgShow" :paramsObj="msgParamsObj"></msg-panel>
  </div>
</template>

<script>
import EditPicker from '@/components/edit_picker.vue'
import ConfirmDialog from '@/components/report-plan_confirm.vue'
import MsgPanel from '@/components/msg_panel.vue'
export default {
  components: {
    EditPicker,
    ConfirmDialog,
    MsgPanel
  },
  data () {
    return {
      isDialogShow: false,
      isLoadingShow: false,
      isMsgShow: false,
      msgParamsObj: {
        title: '报告提交成功',
        descList: ['编号为EO1809231814196051的报告提交成功。'],
        btnList: [
          {text: '重新编辑', link: false, action: function () {
            console.log(this)
          }},
          {text: '新报告', link: false, action: function () {
            wx.showActionSheet({itemList: ['上线作业报告', '非上线报作业告'], success (res) {
              console.log('success:', res)
              if (res.tapIndex === 0) {
                wx.navigateTo({url: '/pages/worker/report-reports/newOnlineReport/main'})
              } else if (res.tapIndex === 1) {
                wx.navigateTo({url: '/pages/worker/report-reports/newOfflineReport/main'})
              }
            }})
          }},
          {text: '返回工作台', link: true, default: true},
        ]
      },
      pickerParamsList: [
        {
          v: '工作类型',
          list: [['未指定', '路线调查','走访', '车轮测量','跟车', '设计','观测', '检测','验收', '添乘', '办公室作业']],
          placeholder: '请选择工作类型',
          val: [],
          required: true
        },
        {
          v: '工作路局',
          list: [['武汉']],
          placeholder: '请选择工作路局',
          val: [],
          required: true
        },
        {
          v: '工作地点',
          list: [['京广高铁工务段信阳东段']],
          placeholder: '请选择工作地点',
          val: [],
          required: true
        },
      ],
    }
  },
  methods: {
    onConfirmSave () {
      this.isLoadingShow = true
      let that = this
      wx.showLoading({
        title: '数据提交中...'
      })
      setTimeout(() => {
        that.isLoadingShow = false
        wx.hideLoading()
      },2000)
    }
  }
}
</script>

<style scoped>
.textarea-title {
  margin-top: -80px;
}
.group-title {
  display: block;
  font-size: 16px;
  margin-left: 5px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
}
.submit-btn-box {
  position: fixed;
  bottom: 30px;
  width: 90%;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.toast-size {
  width: 160px;
  min-height:160px;
  left:0;
  right:0;
  margin: 0 auto;
}
</style>
