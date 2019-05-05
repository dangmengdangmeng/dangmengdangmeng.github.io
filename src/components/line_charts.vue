<template>
  <ve-line
    :data="charts_data.data"
    :width="charts_data.width?charts_data.width:'100%'"
    :settings="charts_data.chartSettings?charts_data.chartSettings:''"
    :colors="charts_data.charts_colors?charts_data.charts_colors:['#44b549']"
    :legend="charts_data.legend"
    :extend="charts_data.charts_extend"
  ></ve-line>
</template>
<script>
import VeLine from "v-charts/lib/line.common";
export default {
  components: { VeLine },
  props: ["charts_data"]
};
</script>