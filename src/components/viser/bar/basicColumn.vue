<!-- 基础柱状图 -->
<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-bar :position="`${transform.key}*${transform.value}`" />
    </v-chart>
  </div>
</template>
<script>
import mixin from '../mixin/index'
const scale = [{
  dataKey: 'sales',
  tickInterval: 20
}]

export default {
  name: 'basicColumn',
  mixins: [mixin],
  data () {
    return {
      scale
    }
  }
}
</script>
