<template>
  <div class="weui-media-box weui-media-box_appmsg" style="background:#fff;">
    <div class="weui-media-box__hd">
      <div 
        v-if="isOnline"
        class="weui-media-box__thumb" 
        style="background-color:#199ed8; border-radius:50%; color:#fff; font-size:22px;"
      >
        上
      </div>
      <div 
        v-else
        class="weui-media-box__thumb" 
        style="background-color:#008000; border-radius:50%; color:#fff; font-size:22px;"
      >
        非
      </div>
    </div>
    <div class="weui-media-box__bd">
      <div class="weui-media-box__title">{{ creator }}</div>
      <div class="weui-media-box__desc">2019-01-12 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:blue;">正常</span></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['creator', 'isOnline']
}
</script>

<style>

</style>
