<template>
  <ve-pie :data="chartData"></ve-pie>
</template>

<script>
  import VePie from 'v-charts/lib/pie.common'
  export default {
    components: {},
    data () {
      return {
      }
    },
    props: ['chartData']
  }
</script>