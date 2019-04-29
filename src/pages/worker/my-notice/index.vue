<template>
  <div>
    <search-bar :placeholder="placeholder"></search-bar>
    <media-box-text :params="noticeList"></media-box-text>
  </div>
</template>
<script type="text/javascript">
  import MediaBoxText from '@/components/mediaBoxText.vue'
  import SearchBar from '@/components/my_noticeSearch.vue'
  export default {
    name: '',
    components: {
      SearchBar,
      MediaBoxText
    },
    data () {
      return {
        noticeList: [
          {
            title: '关于上线作业人员安全注意事项的通知',
            content: '为了确保公司各项上线工作正常有序开展，严格管控恶劣天气下各项工作安全有序开展。',
            footer: '2018-11-23 19:16:30',
            isUnread: true
          },
          {
            title: '关于上线作业人员安全注意事项的通知',
            content: '为了确保公司各项上线工作正常有序开展，严格管控恶劣天气下各项工作安全有序开展。',
            footer: '2018-11-23 19:16:30',
            isUnread: false
          }
        ],
        placeholder: '请输入要搜索的通知'
      }
    },
  }
</script>
<style>
</style>