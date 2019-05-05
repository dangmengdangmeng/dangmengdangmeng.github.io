<template>
  <div>
    <ve-map height="450px" width="500px" :data="chartData" :settings="chartSettings" :extend="chartExtend" :legend-visible="false"></ve-map>
  </div>
</template>
<script type="text/javascript">
  import VeMap from 'v-charts/lib/map.common'
  export default {
    name: '',
    components: { VeMap },
    data () {
      this.chartSettings = {
        type: 'map',
        position: 'china',
        label: {
          normal: { show: false },
          emphasis: { show: false }
        },
        itemStyle: {
          normal: {
            areaColor: '#323c48',
            borderColor: '#fff'
          },
          emphasis: {
            areaColor: '#feb41c'
          }
        },
        zoom: 1.2,
      }
      this.chartExtend = {
        tooltip: {
          formatter: '{b}:{c}'
        },
        visualMap: {
          min: 0,
          max: 1500,
          left: 'center',
          text: ['High','Low'],
          inRange: {
            color: ['#e0ffff', '#006edd']
          },
          orient: 'horizontal'
        },
        series: {
            aspectScale: 0.75,
            showLegendSymbol: false,
            type: 'map',
            geoIndex: 0,
            data:[
                {name: '北京', value: this.randomValue()},
                {name: '天津', value: this.randomValue()},
                {name: '上海', value: this.randomValue()},
                {name: '重庆', value: this.randomValue()},
                {name: '河北', value: this.randomValue()},
                {name: '河南', value: this.randomValue()},
                {name: '云南', value: this.randomValue()},
                {name: '辽宁', value: this.randomValue()},
                {name: '黑龙江', value: this.randomValue()},
                {name: '湖南', value: this.randomValue()},
                {name: '安徽', value: this.randomValue()},
                {name: '山东', value: this.randomValue()},
                {name: '新疆', value: this.randomValue()},
                {name: '江苏', value: this.randomValue()},
                {name: '浙江', value: this.randomValue()},
                {name: '江西', value: this.randomValue()},
                {name: '湖北', value: this.randomValue()},
                {name: '广西', value: this.randomValue()},
                {name: '甘肃', value: this.randomValue()},
                {name: '山西', value: this.randomValue()},
                {name: '内蒙古', value: this.randomValue()},
                {name: '陕西', value: this.randomValue()},
                {name: '吉林', value: this.randomValue()},
                {name: '福建', value: this.randomValue()},
                {name: '贵州', value: this.randomValue()},
                {name: '广东', value: this.randomValue()},
                {name: '青海', value: this.randomValue()},
                {name: '西藏', value: this.randomValue()},
                {name: '四川', value: this.randomValue()},
                {name: '宁夏', value: this.randomValue()},
                {name: '海南', value: this.randomValue()},
                {name: '台湾', value: this.randomValue()},
                {name: '香港', value: this.randomValue()},
                {name: '澳门', value: this.randomValue()},
                {name: '南海诸岛', value: this.randomValue()}
            ]
        }
      }
      return {}
    },
    props: ['chartData'],
    computed: {},
    methods: {
      randomValue() {
        return Math.round(Math.random()*1000);
      }
    }
  }
</script>
<style>
</style>