<template>
  <div>
    <div v-for="(item, index) in paramsList" :key="index">
      <div class="weui-cells__title">{{item.title}}</div>
      <picker :range="item.list">
        <div class="weui-cells">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">{{item.placeholder}}</div>
            <div class="weui-cell__ft"></div>
          </div>
        </div>
      </picker>
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
    props: ['paramsList']
  }
</script>
<style>
</style>