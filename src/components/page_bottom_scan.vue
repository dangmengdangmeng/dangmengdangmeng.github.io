<template>
  <div :class="['scan-container', scanClass]">
    <!-- 箭头 -->
    <div style="text-align:center; padding: 20rpx;" @tap="switchScan">
      <img src="/static/images/5_11.png" class="icon-arrow" alt="arrow image" v-if="isScanShow">
      <img src="/static/images/5_19.png" class="icon-arrow" alt="arrow image" v-else>
    </div>
    <!-- 按钮区 -->
    <div class="weui-flex" style="padding: 0 20rpx;">
      <div class="button weui-flex__item">
        <button v-if="paramsObj.btnLeft" class="weui-btn weui-btn_primary" @tap="onTapBtnLeft">上一步</button>
      </div>
      <div class="weui-flex__item" style="text-align:center;">
        <img 
          src="/static/images/5_15.png" 
          class="icon-scan" 
          alt="scan image"
          @tap="scanCode"
        >
        <div style="text-align:center; margin-top:-25rpx;">
          <span>{{paramsObj.descList[0]}}</span><br>
          <span>{{paramsObj.descList[1]}}</span>
        </div>
      </div>
      <div class="button weui-flex__item">
        <button class="weui-btn weui-btn_primary" @tap="onTapBtnRight">提交</button>
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
        isScanShow: true
      }
    },
    props: ['paramsObj'],
    computed: {
      scanClass () {
        switch (this.isScanShow) {
          case true:
          return 'transition-slide-in';
          break;
          case false:
          return 'transition-slide-out'
        }
      }
    },
    methods: {
      scanCode () {
        mpvue.scanCode()
      },
      switchScan () {
        this.isScanShow = !this.isScanShow
      },
      onTapBtnLeft () {
        this.paramsObj.btnLeft.action()
      },
      onTapBtnRight () {
        this.paramsObj.btnRight.action()
      }
    },
    onUnload () {
      this.isScanShow = true
    }
  }
</script>
<style scoped>
.icon-arrow {
  width: 40rpx;
  height: 38rpx;
}
.icon-scan {
  width: 180rpx;
  height: 180rpx;
}
.button {
  width: 250rpx;
  padding-top: 170rpx;
}
.scan-container {
  position: fixed;
  bottom: 20rpx;
  left: 0;
  right: 0;
  margin: auto;
  background: #fff;
}
.transition-slide-in {
  transform: translate(0, 0);
  transition-property: transform;
  transition-duration: 300ms;
}
.transition-slide-out {
  transition-property: transform;
  transition-duration: 300ms;
  transform: translate(0, 80%);
}
</style>