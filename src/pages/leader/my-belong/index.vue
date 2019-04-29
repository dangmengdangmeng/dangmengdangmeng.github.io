<template>
  <div style="margin-top: 10px;">
    <edit-input :edit_input="list"></edit-input>
  </div>
</template>
<script type="text/javascript">
  import EditInput from '@/components/input_item.vue'
  export default {
    name: '',
    components: {
      EditInput
    },
    data () {
      return {
        list: [
          {
            v: '研究中心',
            value: '研究中心',
            read: true,
            no_arrow: true
          },
          {
            v: '事业部',
            value: '京广事业部',
            read: true,
            no_arrow: true
          },
          {
            v: '路局服务组',
            value: '京广',
            read: true,
            no_arrow: true
          },
          {
            v: '技术服务小组',
            value: '高铁工务段',
            read: true,
            no_arrow: true
          },
        ]
      }
    },
  }
</script>
<style>
</style>