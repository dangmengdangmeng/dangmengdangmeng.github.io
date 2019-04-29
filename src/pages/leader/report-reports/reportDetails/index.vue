<template>
  <div>
    <!-- form begin -->
    <div style="margin-bottom:150px;">
      <!-- media box -->
      <media-box :creator="reportData.creatorInfo.creator" :isOnline="reportData.isOnline" />
      <!-- 作业人信息 -->
      <span class="group-title">作业人信息</span><br>
      <div class="weui-cells">
        <div class="flex s_b_b">
          <div class="input_left_w105 size15 pl15">
            <span>填报人</span>
          </div>
          <div class="weui-cell size15 max_w">
            <div class="weui-cell__hd"></div>
            <div class="weui-cell__bd">
              <img class="report-details-avatar" v-if="reportData.isMale" src="/static/images/u169.png" alt="avatar">
              <img class="report-details-avatar" v-if="!reportData.isMale" src="/static/images/u171.png" alt="avatar">
              <input class="weui-input" style="padding-left:35px;" type="text" auto-complete="off" :placeholder="reportData.creatorInfo.creator" :readonly="reportData.creatorInfo.read">
            </div>
            <div class="weui-cell__ft"></div>
          </div>
        </div>
      </div>
      <div class="weui-cells">
        <div class="flex s_b_b">
          <div class="input_left_w105 size15 pl15">
            <span>归属信息</span>
          </div>
          <div class="weui-cell size15 max_w">
            <div class="weui-cell__hd"></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" auto-complete="off" :placeholder="reportData.creatorInfo.fromWhere" :readonly="reportData.creatorInfo.read">
            </div>
            <div class="weui-cell__ft"></div>
          </div>
        </div>
      </div>
      <!-- 作业基本信息 -->
      <span class="group-title">作业基本信息</span>
      <edit-input :edit_input="reportData.baseInfo"></edit-input>
      <!-- 今日工作 -->
      <span class="group-title">今日工作</span>
      <div style="font-size:15px;">
        <div class="report-table">
          <div class="size15 report-table-row" style="color:#999; font-weight:bold;">
            <div class="report-table-title" style="min-width:100px;"></div>
            <div class="report-table-cell" style="min-width:100px;">计划完成</div>
            <div class="report-table-cell" style="min-width:100px;">实际完成</div>
          </div>
        </div>
        <div>
          <div class="size15 report-table-row" v-for="(item, index) in reportData.workTableInfo" :key="index">
            <div class="report-table-title" style="padding-right:10px;">{{ item.v }}</div>
            <div class="report-table-cell" style="color:#999;" v-for="(value, key) in item.value" :key="key">{{ value }}</div>
          </div>
        </div>
      </div>
      <edit-input :edit_input="reportData.workInfo"></edit-input>
      <!-- 工作明细 -->
      <span class="group-title">工作明细</span>
      <template v-if="reportData.isOnline">
        <accordion 
          :title="reportData.detailInfo.operationTitle" 
          :params="reportData.detailInfo.operationInfo" 
        />
        <accordion 
          :title="reportData.detailInfo.otherTitle" 
          :params="reportData.detailInfo.otherInfo" 
        />
      </template>
      <edit-input v-else :edit_input="reportData.detailInfo"></edit-input>
      <!-- 时间信息 -->
      <span class="group-title">时间信息</span>
      <edit-input :edit_input="reportData.timeInfo"></edit-input>
    </div>
    <!-- 底部按钮 -->
    <div style="position:fixed; bottom:10px; width:90%; left:0; right:0; margin:0 auto;">
      <button class="weui-btn weui-btn_primary" @click="goTo(nextUrl)">下一条日报</button>
      <button class="weui-btn weui-btn_primary" @click="goTo('/pages/work_bench_item/main')">返回工作台</button>
    </div>
    <!-- alert begin -->
    <div v-if="isAlertShow">
      <div class="weui-mask"></div>
      <div class="weui-dialog dialog-position">
        <div class="weui-dialog__hd">
          <div class="weui-dialog__title">提示</div>
        </div>
        <div class="weui-dialog__bd">这是已最后一份报告了，是否返回工作台？</div>
        <div class="weui-dialog__ft">
          <a class="weui-dialog__btn weui-dialog__btn_default" @click="isAlertShow = false">取消</a>
          <a class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditInput from '@/components/input_item.vue'
import MediaBox from '@/components/mediaBox.vue'
// import Accordion from '@/components/accordion.vue'
export default {
  components: {
    EditInput,
    MediaBox,
    // Accordion
  },
  data () {
    return {
      reportData: {},
      isAlertShow: false,
      mockData: [
        {
          id: '1',
            isMale: true,
          isOnline: false,
          creatorInfo: {
            creator: '刘华',
            avatar: '',
            fromWhere: '京广高铁工务段信阳东站',
            read: true, no_arrow: true,
          },
          baseInfo: [
            { v: '编号', value: 'EO1809231814196051', read: true, no_arrow: true },
            { v: '作业日期', value: '2019-01-12', read: true, no_arrow: true },
            { v: '录入方式', value: '新填报', read: true, no_arrow: true },
          ],
          workInfo: [
            { v: '打卡记录', value: 'M0001200121', read: true, no_arrow: true  },
          ],
          detailInfo: [
              {v: '团队人员', value: '王五', read: true, no_arrow: true},
              {v: '备注', value: '备注信息', read: true, no_arrow: true},
          ],
          timeInfo: [
            {v: '创建时间', value: '2019-01-12 09:23:12', read: true, no_arrow: true },
            {v: '最后更新', value: '2019-01-12 12:12:23', read: true, no_arrow: true }
          ],
          workTableInfo: [
            { v: '上线时间', value: ['2019-01-12 09:23:12', '2019-01-12 09:23:12'], read: true, no_arrow: true  },
            { v: '下线时间', value: ['2019-01-12 09:23:12', '2019-01-12 09:23:12'], read: true, no_arrow: true  },
            { v: '作业类型', value: ['非上线作业', '非上线作业'], read: true, no_arrow: true  },
            { v: '工作类型', value: ['办公室', '途中'], read: true, no_arrow: true  },
            { v: '工作路局', value: ['武汉', '京广'], read: true, no_arrow: true  },
            { v: '工作地点', value: ['京广高铁工务段信阳东站', '京广高铁工务段信阳东站'], read: true, no_arrow: true  },
          ],
        },
        {
          id: '2',
            isMale: false,
          isOnline: false,
          creatorInfo: {
            creator: '宋丹',
            avatar: '',
            fromWhere: '京广高铁工务段信阳东站',
            read: true, no_arrow: true,
          },
          baseInfo: [
            { v: '编号', value: 'EO1809231814196051', read: true, no_arrow: true },
            { v: '作业日期', value: '2019-01-12', read: true, no_arrow: true },
            { v: '录入方式', value: '新填报', read: true, no_arrow: true },
          ],
          workTableInfo: [
            { v: '上线时间', value: ['2019-01-12 09:23:12', '2019-01-12 09:23:12'], read: true, no_arrow: true  },
            { v: '下线时间', value: ['2019-01-12 09:23:12', '2019-01-12 09:23:12'], read: true, no_arrow: true  },
            { v: '作业类型', value: ['非上线作业', '非上线作业'], read: true, no_arrow: true  },
            { v: '工作类型', value: ['办公室', '宾馆滞留'], read: true, no_arrow: true  },
            { v: '工作路局', value: ['武汉', '京广'], read: true, no_arrow: true  },
            { v: '工作地点', value: ['京广高铁工务段信阳东站', '京广高铁工务段信阳东站'], read: true, no_arrow: true  },
          ],
          workInfo: [
            { v: '打卡记录', value: 'M0001200121', read: true, no_arrow: true  },
          ],
          detailInfo: [
              {v: '团队人员', value: '王五', read: true, no_arrow: true},
              {v: '备注', value: '备注信息', read: true, no_arrow: true},
          ],
          timeInfo: [
            {v: '创建时间', value: '2019-01-12 09:23:12', read: true, no_arrow: true },
            {v: '最后更新', value: '2019-01-12 12:12:23', read: true, no_arrow: true }
          ]
        },
        {
          id: '3',
            isMale: true,
          isOnline: true,
          creatorInfo: {
            creator: '李明',
            avatar: '',
            fromWhere: '京广高铁工务段信阳东站',
            read: true, no_arrow: true,
          },
          baseInfo: [
            { v: '编号', value: 'EO1809231814196051', read: true, no_arrow: true },
            { v: '作业日期', value: '2019-01-12', read: true, no_arrow: true },
            { v: '录入方式', value: '新填报', read: true, no_arrow: true },
          ],
          workTableInfo: [
            { v: '上线时间', value: ['2019-01-12 09:23:12', '2019-01-12 09:23:12'], read: true, no_arrow: true  },
            { v: '下线时间', value: ['2019-01-12 09:23:12', '2019-01-12 09:23:12'], read: true, no_arrow: true  },
            { v: '作业类型', value: ['上线作业', '上线作业'], read: true, no_arrow: true  },
            { v: '是否天窗', value: ['是', '是'], read: true, no_arrow: true  },
            { v: '工作类型', value: ['车轮调查', '车轮调查'], read: true, no_arrow: true  },
            { v: '工作路局', value: ['武汉', '京广'], read: true, no_arrow: true  },
            { v: '工作地点', value: ['京广高铁工务段信阳东站', '京广高铁工务段信阳东站'], read: true, no_arrow: true  },
            { v: '详细位置', value: ['站南5公里', '站南10公里'], read: true, no_arrow: true  },
          ],
          workInfo: [
            { v: '天窗命令号', value: 'M32453', read: true, no_arrow: true  },
            { v: '行别', value: '上行', read: true, no_arrow: true  },
            { v: '天气', value: '晴', read: true, no_arrow: true  },
            { v: '打卡记录', value: 'M0001200121', read: true, no_arrow: true  },
            { v: '团队人员', value: '王五', read: true, no_arrow: true  },
            { v: '配合人员', value: '赵六、刘七', read: true, no_arrow: true  },
            { v: '存在问题', value: '2019年1月10日上午在武汉路局进行跟车作业，主要工作...', read: true, no_arrow: true  },
          ],
          detailInfo: {
            operationTitle: '作业详情',
            operationInfo: [
              {v: '车轮测量个数', value: '544'},
            ] ,
            otherTitle: '其他',
            otherInfo: [
              {v: '是否夜间', value: '否'},
              {v: '夜间时长', value: '4.5'},
              {v: '徒步距离', value: '15公里'},
              {v: '是否高原作业', value: '否'},
              {v: '备注', value: '备注信息'},
            ]
          },
          timeInfo: [
            {v: '创建时间', value: '2019-01-12 09:23:12', read: true, no_arrow: true },
            {v: '最后更新', value: '2019-01-12 12:12:23', read: true, no_arrow: true }
          ]
        },
        {
          id: '4',
            isMale: true,
          isOnline: true,
          creatorInfo: {
            creator: '赵安',
            avatar: '',
            fromWhere: '京广高铁工务段信阳东站',
            read: true, no_arrow: true,
          },
          baseInfo: [
            { v: '编号', value: 'EO1809231814196051', read: true, no_arrow: true },
            { v: '作业日期', value: '2019-01-12', read: true, no_arrow: true },
            { v: '录入方式', value: '新填报', read: true, no_arrow: true },
          ],
          workTableInfo: [
            { v: '上线时间', value: ['2019-01-12 09:23:12', '2019-01-12 09:23:12'], read: true, no_arrow: true  },
            { v: '下线时间', value: ['2019-01-12 09:23:12', '2019-01-12 09:23:12'], read: true, no_arrow: true  },
            { v: '作业类型', value: ['上线作业', '上线作业'], read: true, no_arrow: true  },
            { v: '是否天窗', value: ['是', '是'], read: true, no_arrow: true  },
            { v: '工作类型', value: ['线路验收', '线验收查'], read: true, no_arrow: true  },
            { v: '工作路局', value: ['武汉', '京广'], read: true, no_arrow: true  },
            { v: '工作地点', value: ['京广高铁工务段信阳东站', '京广高铁工务段信阳东站'], read: true, no_arrow: true  },
            { v: '详细位置', value: ['站南5公里', '站南10公里'], read: true, no_arrow: true  },
          ],
          workInfo: [
            { v: '天窗命令号', value: 'M32453', read: true, no_arrow: true  },
            { v: '行别', value: '上行', read: true, no_arrow: true  },
            { v: '天气', value: '晴', read: true, no_arrow: true  },
            { v: '打卡记录', value: 'M0001200121', read: true, no_arrow: true  },
            { v: '团队人员', value: '王五', read: true, no_arrow: true  },
            { v: '配合人员', value: '赵六、刘七', read: true, no_arrow: true  },
            { v: '存在问题', value: '2019年1月10日上午在武汉路局进行跟车作业，主要工作...', read: true, no_arrow: true  },
          ],
          detailInfo: {
            operationTitle: '作业详情',
            operationInfo: [
              {v: '曲线测量个数', value: '23'},
              {v: '曲线测量点数量', value: '43'},
              {v: '直线测量个数', value: '33'},
              {v: '直线测量点个数', value: '12'},
            ] ,
            otherTitle: '其他',
            otherInfo: [
              {v: '是否夜间', value: '否'},
              {v: '夜间时长', value: '4.5'},
              {v: '徒步距离', value: '15公里'},
              {v: '是否高原作业', value: '否'},
              {v: '备注', value: '备注信息'},
            ]
          },
          timeInfo: [
            {v: '创建时间', value: '2019-01-12 09:23:12', read: true, no_arrow: true },
            {v: '最后更新', value: '2019-01-12 12:12:23', read: true, no_arrow: true }
          ]
        }
      ]
    }
  },
  computed:{
    nextUrl () {
      return '/pages/worker/report-reports/reportDetails/main?id='+ ( Number(this.reportData.id) + 1 )
    }
  },

  onLoad (options) {
    let id = options.id ? options.id : 1
    console.log(options.id)
    if (Number(options.id) <= 4) {
      this.getDataObj(id)
    } else {
      console.log('max')
      this.isAlertShow = true
    }
  },

  methods: {
    getDataObj (id) {
      this.mockData.forEach((item) => {
        if (id == item.id) {
          this.reportData = item
        }
      })
    },
    onAlertHide () {
      console.log(123)
    },

    goTo (url) {
      wx.redirectTo({url})
    }
  },
}
</script>

<style>
.group-title {
  font-size: 16px;
  margin-left: 5px;
}
.dialog-position {
  top: 40% !important;
}

.report-details-avatar {
  width:30px; 
  height: 30px;
  position:absolute; 
  top: 50%; 
  transform: translateY(-50%);
}

.report-table {

}

.report-table-row {
  display: flex;
  align-items: center;
}

.report-table-title {
  width: 20%;
  text-align: center;
}

.report-table-cell {
  width: 38%;
  text-align: center;
}
</style>
