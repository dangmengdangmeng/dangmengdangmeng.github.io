<template>
  <div>
    <my-media-box :paramsObj="staffDataObj.mediaBoxInfo"></my-media-box>
    <div class="group-title">基本信息</div>
    <edit-input :edit_input="staffDataObj.baseInfoList"></edit-input>
    <div class="group-title">联系信息</div>
    <edit-input :edit_input="staffDataObj.contactInfoList"></edit-input>
    <div class="group-title">学历</div>
    <edit-input :edit_input="staffDataObj.educationInfoList"></edit-input>
    <div class="group-title">部门</div>
    <edit-input :edit_input="staffDataObj.departmentInfoList"></edit-input>
    <div class="group-title">岗位</div>
    <edit-input :edit_input="staffDataObj.titleInfoList"></edit-input>
  </div>
</template>
<script type="text/javascript">
  import MyMediaBox from '@/components/mediaBox2.vue' 
  import EditInput from '@/components/input_item.vue'
  export default {
    name: '',
    components: {
      EditInput,
      MyMediaBox
    },
    onLoad (options) {
      let id = options.id ? options.id : 1
      this.mockData.forEach(item => {
        if (id == item.id) this.staffDataObj = item
      })
      console.log(this.staffDataObj)
    },
    data () {
      return {
        staffDataObj: {},
        mockData: [
          {
            id: 1,
            mediaBoxInfo: {
              name: '刘华',
              workPlace: '京广高铁工务段信阳南站',
              group: '打磨组',
              title: '员工',
              avatar: '/static/images/u169.png',
              isMale: true
            },
            baseInfoList: [
              {
                v: '编号',
                value: 'M00001',
                read: true,
              },
              {
                v: '姓名',
                value: '刘华',
                read: true,
              },
              {
                v: '性别',
                value: '男',
                read: true,
              },
              {
                v: '出生日期',
                value: '1997-01-21',
                read: true,
              },
            ],
            contactInfoList: [
              {
                v: '手机号码',
                value: '13321223212',
                read: true,
              },
              {
                v: '邮箱',
                value: '13321223212@qq.com',
                read: true,
              },
              {
                v: '微信号',
                value: '13321223212',
                read: true,
              },
              {
                v: '籍贯',
                value: '北京市大兴区',
                read: true,
              },
            ],
            educationInfoList: [
              {
                v: '毕业学校',
                value: '北京交大',
                read: true,
              },
              {
                v: '专业',
                value: '土木工程',
                read: true,
              },
              {
                v: '学历',
                value: '本科',
                read: true,
              },
            ],
            departmentInfoList: [
              {
                v: '研究中心',
                value: '研究中心',
                read: true,
              },
              {
                v: '事业部',
                value: '京广事业部',
                read: true,
              },
            ],
            titleInfoList: [
              {
                v: '职务类型',
                value: '上线作业人员',
                read: true,
              },
              {
                v: '职务',
                value: '班组长',
                read: true,
              },
              {
                v: '业务方向',
                value: '哈，沈',
                read: true,
              },
              {
                v: '岗位安全培训合格证书编号',
                value: 'GWZS0199212',
                read: true,
              },
              {
                v: '考试记录',
                value: '5',
                read: true,
                link: '/pages/leader/my-test/main?isMale=true'
              },
              {
                v: '下属人员',
                value: '5',
                read: true,
              },
              {
                v: '是否在岗',
                value: '是',
                read: true,
              },
              {
                v: '备注',
                value: '备注信息',
                read: true,
              },
            ]
          },
          {
            id: 2,
            mediaBoxInfo: {
              name: '宋丹',
              workPlace: '京广高铁工务段信阳南站',
              group: '打磨组',
              title: '组长',
              avatar: '/static/images/u170.png',
              isMale: false
            },
            baseInfoList: [
              {
                v: '编号',
                value: 'M00002',
                read: true,
              },
              {
                v: '姓名',
                value: '宋丹',
                read: true,
              },
              {
                v: '性别',
                value: '女',
                read: true,
              },
              {
                v: '出生日期',
                value: '2000-01-21',
                read: true,
              },
            ],
            contactInfoList: [
              {
                v: '手机号码',
                value: '1321221231',
                read: true,
              },
              {
                v: '邮箱',
                value: '1321221231@qq.com',
                read: true,
              },
              {
                v: '微信号',
                value: '1321221231',
                read: true,
              },
              {
                v: '籍贯',
                value: '天津市',
                read: true,
              },
            ],
            educationInfoList: [
              {
                v: '毕业学校',
                value: '复旦大学',
                read: true,
              },
              {
                v: '专业',
                value: '工程管理',
                read: true,
              },
              {
                v: '学历',
                value: '硕士',
                read: true,
              },
            ],
            departmentInfoList: [
              {
                v: '研究中心',
                value: '研究中心',
                read: true,
              },
              {
                v: '事业部',
                value: '京广事业部',
                read: true,
              },
            ],
            titleInfoList: [
              {
                v: '职务类型',
                value: '上线作业人员',
                read: true,
              },
              {
                v: '职务',
                value: '班组长',
                read: true,
              },
              {
                v: '业务方向',
                value: '哈，沈',
                read: true,
              },
              {
                v: '岗位安全培训合格证书编号',
                value: 'GWZS0199213',
                read: true,
              },
              {
                v: '考试记录',
                value: '5',
                read: true,
                link: '/pages/leader/my-test/main?isMale=false'
              },
              {
                v: '下属人员',
                value: '5',
                read: true,
              },
              {
                v: '是否在岗',
                value: '是',
                read: true,
              },
              {
                v: '备注',
                value: '备注信息',
                read: true,
              },
            ]
          },
          {
            id: 3,
            mediaBoxInfo: {
              name: '李明',
              workPlace: '京广高铁工务段信阳南站',
              group: '打磨组',
              title: '员工',
              avatar: '/static/images/u169.png',
              isMale: true
            },
            baseInfoList: [
              {
                v: '编号',
                value: 'M00003',
                read: true,
              },
              {
                v: '姓名',
                value: '李明',
                read: true,
              },
              {
                v: '性别',
                value: '男',
                read: true,
              },
              {
                v: '出生日期',
                value: '1997-01-21',
                read: true,
              },
            ],
            contactInfoList: [
              {
                v: '手机号码',
                value: '13321223212',
                read: true,
              },
              {
                v: '邮箱',
                value: '13321223212@qq.com',
                read: true,
              },
              {
                v: '微信号',
                value: '13321223212',
                read: true,
              },
              {
                v: '籍贯',
                value: '北京市大兴区',
                read: true,
              },
            ],
            educationInfoList: [
              {
                v: '毕业学校',
                value: '北京交大',
                read: true,
              },
              {
                v: '专业',
                value: '土木工程',
                read: true,
              },
              {
                v: '学历',
                value: '本科',
                read: true,
              },
            ],
            departmentInfoList: [
              {
                v: '研究中心',
                value: '研究中心',
                read: true,
              },
              {
                v: '事业部',
                value: '京广事业部',
                read: true,
              },
            ],
            titleInfoList: [
              {
                v: '职务类型',
                value: '上线作业人员',
                read: true,
              },
              {
                v: '职务',
                value: '班组长',
                read: true,
              },
              {
                v: '业务方向',
                value: '哈，沈',
                read: true,
              },
              {
                v: '岗位安全培训合格证书编号',
                value: 'GWZS0199212',
                read: true,
              },
              {
                v: '考试记录',
                value: '5',
                read: true,
                link: '/pages/leader/my-test/main?isMale=true'
              },
              {
                v: '下属人员',
                value: '5',
                read: true,
              },
              {
                v: '是否在岗',
                value: '是',
                read: true,
              },
              {
                v: '备注',
                value: '备注信息',
                read: true,
              },
            ]
          },
        ],
        
      }
    },
    
  }
</script>
<style>
</style>