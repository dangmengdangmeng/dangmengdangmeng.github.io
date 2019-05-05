<template>
  <ve-bar :data="chartData" :settings="chartSettings" :extend="chartExtend" height="280px"></ve-bar>
</template>

<script>
  import VeBar from 'v-charts/lib/bar.common'
  export default {
    components: { VeBar },
    data () {
        this.chartSettings =  {
          stack: {
            'xxx': this.chartData.columns.slice(1)
          },
        }
        this.chartExtend = {
          barWidth: 70,
          legend: {bottom: 20},
          xAxis: {maxInterval: 200}
        }
        return {
        }
    },
    props: ['chartData']
  }
</script>