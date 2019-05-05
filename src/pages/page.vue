<template>
  <div class="t_center pt50">
    <el-row>
      <el-button @click="go_page('/index')">首页表格页面</el-button>
      <el-button @click="go_page('/user_charts')">会员分析</el-button>
      <el-button @click="go_page('/store_sales')">门店实销</el-button>
      <el-button @click="go_page('/dealer_sales')">经销商实销</el-button>
      <el-button @click="go_page('/store_count')">门店库存</el-button>
      <el-button @click="go_page('/dealer_count')">经销商库存</el-button>
      <el-button @click="go_page('/goods_scan_charts')">产品扫码</el-button>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    go_page(url) {
      this.$router.push(url);
    }
  }
};
</script>