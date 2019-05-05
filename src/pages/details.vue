<template>
  <!-- <div class="page_box m_center pt50">
    <div class="w_95 m_center flex size24 pb10 b_b">
      <i class="el-icon-edit size30 mt5"></i>
      <div class="bold ml10">用户信息详情</div>
    </div>
    <div
      class="w_95 m_center info_details_box ptb30 size18"
      v-for="(item,index) in info_arr"
      :key="index"
    >
      <div class="item_details flex mb20" v-for="(item_,index_) in item" :key="index_">
        <div class="w_15 t_right bold">{{item_.v}}</div>
        <div class="w_75 pl40">{{item_.k}}</div>
      </div>
    </div>
  </div> -->
  <div style="padding:40px;">
    <div class="admin-details-title">用户信息详情</div>
    <div style="margin-bottom:50px;">
      <details-table :tableData="info_arr[0]" :title="title1"></details-table>
      <details-table :tableData="info_arr[1]"  :title="title2"></details-table>
    </div>
  </div>
</template>


<script>
import DetailsTable from '@/components/detailsTable.vue'
export default {
  components: { DetailsTable },
  data() {
    return {
      title1: '基本信息',
      title2: '个人信息',
      info_arr: [
        [
          [{
            v: "系统编码:",
            k: "510065454"
          },
          {
            v: "员工编号:",
            k: "123123"
          }],
          [{
            v: "名称:",
            k: "454"
          },
          {
            v: "手机号:",
            k: "13645618520"
          }],
          [{
            v: "身份证号:",
            k: "16471212873612387"
          }],
          [{
            v: "登录账号:",
            k: "1874354353"
          },
          {
            v: "分配角色名:",
            k: ""
          }],
          [{
            v: "用户组名:",
            k: "454"
          },
          {
            v: "超级管理员:",
            k: "否"
          }],
          [{
            v: "绑定微信:",
            k: "否"
          }]
        ],
        [
          [{
            v: "绑定通路人员:",
            k: "否"
          },
          {
            v: "通路人员名称:",
            k: "[U012837]cesds"
          }],
          [{
            v: "通路人员名称:",
            k: "经销商老板"
          }],
          [{
            v: "上次登录时间:",
            k: "000-00-00 00:00:00"
          },
          {
            v: "状态:",
            k: "启用"
          }],
          [{
            v: "排序码:",
            k: "0"
          },
          {
            v: "备注信息:",
            k: ""
          }],
          [{
            v: "创建人:",
            k: "内部专用"
          },
          {
            v: "创建时间:",
            k: "2019-04-24 13:24:24"
          }],
          [{
            v: "最后更新:",
            k: "2019-04-24 13:24:24"
          }]
        ]
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.page_box {
  width: 90vw;
  min-height: 100vh;
  margin: 0 auto;
  border-left: 1px solid #999;
  border-right: 1px solid #999;
  box-sizing: border-box;
}
.info_details_box {
  border-bottom: 1px dashed #999;
}
.info_details_box:last-child {
  border-bottom: none;
}
</style>