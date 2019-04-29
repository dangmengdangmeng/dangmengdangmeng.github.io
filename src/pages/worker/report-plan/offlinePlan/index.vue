<template>
  <div>
    <div style="margin-bottom:80px;">
      <span class="group-title">填报人信息</span>
      <br>
      <div class="weui-cells">
        <div class="flex s_b_b">
          <div class="input_left_w105 size15 pl15 color_6">
            <span>创建人</span>
          </div>
          <div class="weui-cell size15 max_w">
            <div class="weui-cell__hd"></div>
            <div class="weui-cell__bd">
              <img class="offline-plan-avatar" src="/static/images/u169.png" alt="avatar">
              <input class="weui-input" style="padding-left:35px;" type="text" auto-complete="off" :placeholder="planData.creatorInfo.creator" :readonly="planData.creatorInfo.read">
            </div>
            <div class="weui-cell__ft"></div>
          </div>
        </div>
      </div>
      <div class="weui-cells">
        <div class="flex s_b_b">
          <div class="input_left_w105 size15 pl15 color_6">
            <span>归属信息</span>
          </div>
          <div class="weui-cell size15 max_w">
            <div class="weui-cell__hd"></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" auto-complete="off" :placeholder="planData.creatorInfo.fromWhere" :readonly="planData.creatorInfo.read">
            </div>
            <div class="weui-cell__ft"></div>
          </div>
        </div>
      </div>
      <span class="group-title">次日计划信息</span>
      <edit-input :edit_input="planData.planInfo"></edit-input>
      <span class="group-title">工作内容</span>
      <edit-input :edit_input="planData.workInfo"></edit-input>
      <div v-if="isEdit">
        <span class="group-title">关联信息</span>
        <edit-input :edit_input="planData.bindInfo"></edit-input>
      </div>
      <span class="group-title">其他</span>
      <edit-input :edit_input="planData.otherInfo"></edit-input>
    </div>
    <div v-if="!isEdit" style="position:fixed; bottom:10px; width:90%; left:0; right:0; margin:0 auto;">
      <button class="weui-btn weui-btn_primary" @click="isEdit=true">编辑计划</button>
    </div>
    <div v-if="isEdit" style="position:fixed; bottom:10px; width:90%; left:0; right:0; margin:0 auto; display:flex; justify-content:space-around; align-items:center;">
      <div style="width:45%;">
        <button class="weui-btn weui-btn_warn" @click="isEdit=false">取消</button>
      </div>
      <div style="width:45%;">
        <button class="weui-btn weui-btn_primary" @click="isEdit=false">完成</button>
      </div>
    </div>
  </div>
</template>

<script>
import EditInput from '@/components/input_item.vue'
export default {
  components: { EditInput },
  
  onLoad (options) {
    let id = options.id ? options.id : 1
    this.mockData.forEach(item => {
      if (id == item.id) this.planData = item
    })
    console.log(this.planData)
  },

  data () {
    return {
      isEdit: false,
      planData: {},
      mockData: [
        {
          id: '1',
          creatorInfo: {
            creator: '张三',
            avatar: '',
            fromWhere: '京广高铁工务段信阳东站',
            read: true
          },
          planInfo: [
            { v: '编号', value: 'EO1809231814196051', read: true, no_arrow: true },
            { v: '上线时间', value: '2019-01-13', read: true, no_arrow: true },
            { v: '下线时间', value: '2019-01-13', read: true, no_arrow: true }
          ],
          workInfo: [
            { v: '作业类型', value: '非上线计划', read: true, no_arrow: true  },
            { v: '工作类型', value: '办公室作业', read: true, no_arrow: true  },
            { v: '工作路局', value: '武汉', read: true, no_arrow: true },
            { v: '工作地点', value: '京广高铁工务段信阳东站', read: true, no_arrow: true  },
            { v: '备注', value: '京广高铁工务段信阳东站', read: true, no_arrow: true  },
          ],
          otherInfo: [
            { v: '创建时间', value: '2019-01-12 16:47:22', read: true, no_arrow: true  },
            { v: '最后更新', value: '2019-01-12 16:47:22', read: true, no_arrow: true  },
          ],
          bindInfo: [
            {v: '编号', value: 'EO1809231814196051', read: true, no_arrow: true },
            {v: '日报日期', value: '2019-01-12', read: true, no_arrow: true },
            {v: '关联时间', value: '2019-01-12 12:12:23', read: true, no_arrow: true }
          ]
        },
        {
          id: '2',
          creatorInfo: {
            creator: '李四',
            avatar: '',
            fromWhere: '京广高铁工务段信阳东站',
          },
          planInfo: [
            { v: '编号', value: 'EO1809231814196051', read: true, no_arrow: true },
            { v: '上线时间', value: '2019-01-13', read: true, no_arrow: true },
            { v: '下线时间', value: '2019-01-13', read: true, no_arrow: true }
          ],
          workInfo: [
            { v: '作业类型', value: '非上线计划', read: true, no_arrow: true  },
            { v: '工作类型', value: '办公室作业', read: true, no_arrow: true  },
            { v: '工作路局', value: '武汉', read: true, no_arrow: true  },
            { v: '工作地点', value: '京广高铁工务段信阳东站', read: true, no_arrow: true  },
            { v: '备注', value: '京广高铁工务段信阳东站', read: true, no_arrow: true  },
          ],
          otherInfo: [
            { v: '创建时间', value: '2019-01-12 16:47:22', read: true, no_arrow: true  },
            { v: '最后更新', value: '2019-01-12 16:47:22', read: true, no_arrow: true  },
          ],
          bindInfo: [
            {v: '编号', value: 'EO1809231814196051', read: true, no_arrow: true },
            {v: '日报日期', value: '2019-01-12', read: true, no_arrow: true },
            {v: '关联时间', value: '2019-01-12 12:12:23', read: true, no_arrow: true }
          ]
        },
        {
          id: '3',
          creatorInfo: {
            creator: '王五',
            avatar: '',
            fromWhere: '京广高铁工务段信阳东站',
          },
          planInfo: [
            { v: '编号', value: 'EO1809231814196051', read: true, no_arrow: true },
            { v: '上线时间', value: '2019-01-13', read: true, no_arrow: true },
            { v: '下线时间', value: '2019-01-13', read: true, no_arrow: true }
          ],
          workInfo: [
            { v: '作业类型', value: '非上线计划', read: true, no_arrow: true  },
            { v: '工作类型', value: '办公室作业', read: true, no_arrow: true  },
            { v: '工作路局', value: '武汉', read: true, no_arrow: true  },
            { v: '工作地点', value: '京广高铁工务段信阳东站', read: true, no_arrow: true  },
            { v: '备注', value: '京广高铁工务段信阳东站', read: true, no_arrow: true  },
          ],
          otherInfo: [
            { v: '创建时间', value: '2019-01-12 16:47:22', read: true, no_arrow: true  },
            { v: '最后更新', value: '2019-01-12 16:47:22', read: true, no_arrow: true  },
          ],
          bindInfo: [
            {v: '编号', value: 'EO1809231814196051', read: true, no_arrow: true },
            {v: '日报日期', value: '2019-01-12', read: true, no_arrow: true },
            {v: '关联时间', value: '2019-01-12 12:12:23', read: true, no_arrow: true }
          ]
        },
      ]
    }
  },
}
</script>

<style>
.group-title {
  font-size: 16px;
  margin-left: 5px;
}
.offline-plan-avatar {
  width:30px; 
  height: 30px;
  position:absolute; 
  top:50%; 
  transform: translateY(-50%);
}
</style>
