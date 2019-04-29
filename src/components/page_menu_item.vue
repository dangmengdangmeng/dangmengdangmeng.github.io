<template>
  <div style="background:#fff;">
    <div class="weui-flex" style="padding: 20rpx 20rpx;">
      <div class="weui-flex__item">{{paramsObj.leftText}}</div>
      <div
        style="text-align:right;"
        @tap="showMenu"
      >
        <img :src="paramsObj.iconUrl" alt="menu icon" class="menu-icon">
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
    props: ['paramsObj'],
    methods: {
      showMenu () {
        console.log('clicked')
        this.$emit('showMenu')
      }
    }
  }
</script>
<style>
.menu-icon {
  width: 40rpx;
  height: 40rpx;
}
</style>