<template>
  <div>
    <div class="weui-panel weui-panel_access">
      <div @click="onClick(item)" v-for="(item, index) in params" :key="index" class="weui-panel__bd">
      <div class="weui-media-box weui-media-box-text">
        <div class="weui-media-box__title" style="font-size:16px; font-weight:bold; padding-bottom:5px;">
          <span v-show="item.isUnread" class="weui-badge weui-badge_dot"></span>
          {{ item.title }}
        </div>
        <div class="weui-media-box__desc" style="color:#000; font-size:15px;">{{ item.content }}</div>
        <div class="weui-media-box__info" style="color:#999">{{ item.footer }}</div>
      </div>
    </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'mediaBoxText',
    components: {
    },
    data () {
      return {

      }
    },
    props: ['params'],
    methods: {
      onClick (item) {
        if (item.link) {
          wx.navigateTo({url: item.link})
        }
      }
    }
  }
</script>
<style>
</style>