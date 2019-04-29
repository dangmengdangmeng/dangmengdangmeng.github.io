<template>
  <div class="weui-media-box weui-media-box_appmsg">
    <div class="weui-media-box__hd" style="width:100px; height:100px;">
      <img class="weui-media-box__thumb" v-if="paramsObj.isMale" src="/static/images/u169.png" alt="avatar">
      <img class="weui-media-box__thumb" v-else src="/static/images/u171.png" alt="avatar">
    </div>
    <div class="weui-media-box__bd">
      <div class="weui-media-box__title" style="font-size:18px;">{{ paramsObj.name }}</div>
      <div class="weui-media-box__desc" style="font-size:15px; color:#000; line-height:25px;">
        <span>{{ paramsObj.workPlace }}</span><br>
        <span>{{ paramsObj.group }} &nbsp;&nbsp;{{ paramsObj.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['paramsObj']
}
</script>

<style>

</style>
