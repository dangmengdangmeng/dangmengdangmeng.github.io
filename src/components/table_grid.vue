<template>
  <div>
    <!-- table head -->
    <div class="gird-container grid-border" style="background:#ccc;">
      <div class="grid-border">序号</div>
      <div class="grid-border">产品名称</div>
      <div class="grid-border">订单数量</div>
      <div class="grid-border">发货数量</div>
    </div>
    <!-- table body -->
    <div class="gird-container grid-border">
      <div class="grid-border" :style="{height:'100%', 'grid-row': gridRowStyle}">
        <div class="vertical-align">1</div>
      </div>
      <div class="grid-border" style="grid-row:1/2;grid-column:2/5;text-align:left;">[P0092]蒙牛瑞哺恩幼儿配方奶粉800g×6罐</div>
      
      <div 
        class="grid-border" 
        style="grid-row:2/3;grid-column:2/3; color:blue;"
        @tap="isDetailShow=!isDetailShow"
      >
        点击查看箱码
      </div>
      <div class="grid-border" style="grid-row:2/3;grid-column:3/4;">2箱</div>
      <div class="grid-border" style="grid-row:2/3;grid-column:4/5;">3箱</div>
      <!-- 收起部分 -->
      <template v-if="isDetailShow">
        <div class="grid-border" style="grid-column:2/5;">55555555555555555</div>
        <div class="grid-border" style="grid-column:2/5;">55555555555555555</div>
        <div class="grid-border" style="grid-column:2/5;">55555555555555555</div>
      </template>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: '',
    components: {
    },
    data () {
      return {
        isDetailShow: false,
        count: 6
      }
    },
    computed: {
        gridRowStyle () {
          return '1/' + this.count
        }
    },
    methods: {
      onTap () {
        console.log(123)
        this.isDetailShow=true
      }
    }
  }
</script>
<style scoped>
.gird-container {
  display: grid;
  grid-template-columns: 15% 35% 25% 25%;
  grid-template-rows:auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.grid-border {
  border: 1px solid #d9d9d9;
}
.vertical-align {
  top: 50%;
  transform: translateY(-50%);
}

</style>