<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="sourceData">
      <v-tooltip />
      <v-axis />
      <v-legend />
      <v-bar :position="`${transform.key}*${transform.value}`" color="name" :adjust="adjust" />
    </v-chart>
  </div>
</template>

<script>
import mixin from '../mixin/index'
const DataSet = require('@antv/data-set')

export default {
  name: 'groupedColumn',
  mixins: [mixin],
  data () {
    return {
      adjust: [{
        type: 'dodge',
        marginRatio: 1 / 32
      }]
    }
  },
  computed: {
    sourceData () {
      let data = {}
      const dv = new DataSet.View().source(this.data)
      dv.transform(this.transform)
      data = dv.rows
      return data
    }
  }
}
</script>
