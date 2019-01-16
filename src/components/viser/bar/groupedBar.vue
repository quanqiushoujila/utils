<!-- 分组条形图 -->
<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="sourceData">
      <v-coord type="rect" direction="LT" />
      <v-tooltip />
      <v-legend />
      <v-axis dataKey="value" position="right" />
      <v-axis dataKey="label" :label="label" />
      <v-bar position="label*value" color="type" :adjust="adjust" />
    </v-chart>
  </div>
</template>

<script>
import mixin from '../mixin/index'
const DataSet = require('@antv/data-set')

export default {
  name: 'groupedBar',
  mixins: [mixin],
  props: {
    label: {
      type: Object,
      default: () => {
        return { offset: 12 }
      }
    },
    adjust: {
      type: Array,
      default: () => {
        return [{ type: 'dodge', marginRatio: 1 / 32 }]
      }
    }
  },
  computed: {
    sourceData () {
      const dv = new DataSet.View().source(this.data)
      dv.transform(this.transform || this.vtransform)
      return dv.rows
    }
  }
}
</script>
