<template>
  <div>
    <my-media-box :paramsObj="mediaBoxInfo"></my-media-box>
    <edit-input edit_input=""></edit-input>
    <div class="group-title">基本信息</div>
    <edit-input :edit_input="baseInfoList"></edit-input>
    <div class="group-title">联系信息</div>
    <edit-input :edit_input="contactInfoList"></edit-input>
    <div class="group-title">学历</div>
    <edit-input :edit_input="educationInfoList"></edit-input>
    <div class="group-title">部门</div>
    <edit-input :edit_input="departmentInfoList"></edit-input>
    <div class="group-title">岗位</div>
    <edit-input :edit_input="titleInfoList"></edit-input>
  </div>
</template>
<script type="text/javascript">
  import MyMediaBox from '@/components/mediaBox2.vue' 
  import EditInput from '@/components/input_item.vue'
  export default {
    name: '',
    components: {
      MyMediaBox,
      EditInput
    },
    data () {
      return {
        mediaBoxInfo: {
          name: '张三',
          workPlace: '京广高铁工务段信阳南站',
          group: '打磨组',
          title: '组长',
          isMale: true
        },
        baseInfoList: [
          {
            v: '编号',
            value: 'M00001',
            read: true,
            no_arrow: true
          },
          {
            v: '姓名',
            value: '姜权',
            read: true,
            no_arrow: true
          },
          {
            v: '性别',
            value: '男',
            read: true,
            no_arrow: true
          },
          {
            v: '出生日期',
            value: '1997-01-21',
            read: true,
            no_arrow: true
          },
        ],
        contactInfoList: [
          {
            v: '手机号码',
            value: '13321223212',
            read: true,
            no_arrow: true
          },
          {
            v: '邮箱',
            value: '13321223212@qq.com',
            read: true,
            no_arrow: true
          },
          {
            v: '微信号',
            value: '13321223212',
            read: true,
            no_arrow: true
          },
          {
            v: '籍贯',
            value: '北京市大兴区',
            read: true,
            no_arrow: true
          },
        ],
        educationInfoList: [
          {
            v: '毕业学校',
            value: '北京交大',
            read: true,
            no_arrow: true
          },
          {
            v: '专业',
            value: '土木工程',
            read: true,
            no_arrow: true
          },
          {
            v: '学历',
            value: '本科',
            read: true,
            no_arrow: true
          },
        ],
        departmentInfoList: [
          {
            v: '研究中心',
            value: '研究中心',
            read: true,
            no_arrow: true
          },
          {
            v: '事业部',
            value: '京广事业部',
            read: true,
            no_arrow: true
          },
        ],
        titleInfoList: [
          {
            v: '职务类型',
            value: '上线作业人员',
            read: true,
            no_arrow: true
          },
          {
            v: '职务',
            value: '班组长',
            read: true,
            no_arrow: true
          },
          {
            v: '业务方向',
            value: '哈，沈',
            read: true,
            no_arrow: true
          },
          {
            v: '岗位安全培训合格证书编号',
            value: 'GWZS0199212',
            read: true,
            no_arrow: true
          },
          {
            v: '考试记录',
            value: '5',
            read: true,
            no_arrow: true,
            link: '/pages/leader/my-test/main?isMale=true'
          },
          {
            v: '下属人员',
            value: '5',
            read: true,
            no_arrow: true
          },
          {
            v: '是否在岗',
            value: '是',
            read: true,
            no_arrow: true
          },
          {
            v: '备注',
            value: '备注信息',
            read: true,
            no_arrow: true
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
</style>