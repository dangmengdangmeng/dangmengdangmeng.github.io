<template>
  <div>
    <div class="weui-cells">
      <div 
        class="weui-cell weui-cell_access"
        v-for="(item, index) in list_item_access"
        :key="index"
      >
        <div class="weui-cell__hd"></div>
        <div class="weui-cell__bd">
          <div class="weui-flex justify-content">
            <div class="weui-flex__item" style="flex:1;padding-bottom:30rpx;">{{ index + 1 }}. {{ item.rowOneLeft }}</div>
            <div class="weui-flex__item" style="flex:0.5;text-align:right;">{{ item.rowOneRight }}</div>
          </div>
          <div class="weui-flex">
            <div class="weui-flex__item" style="flex:1;padding-bottom:30rpx;">{{ item.rowTwoLeft }}</div>
            <div class="weui-flex__item" style="flex:0.3;text-align:right;">{{ item.rowTwoRight }}</div>
          </div>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
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

      }
    },
    props: ['list_item_access']
  }
</script>
<style>
.flex-end {
  justify-content: flex-end;
}
</style>