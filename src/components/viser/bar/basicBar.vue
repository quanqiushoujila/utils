<!-- 基础条形图 -->
<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="sourceData">
      <v-coord type="rect" direction="LB" />
      <v-tooltip />
      <v-axis dataKey="country" :label="label" />
      <v-bar :position="`${transform.key}*${transform.value}`" />
    </v-chart>
  </div>
</template>

<script>
import mixin from '../mixin/index'
const DataSet = require('@antv/data-set')

export default {
  name: 'basicBar',
  mixins: [mixin],
  data () {
    return {
      vtransform: {
        type: 'sort',
        callback (a, b) {
          return a.population - b.population > 0
        }
      }
    }
  },
  props: {
    label: {
      type: Object,
      default: () => {
        return { offset: 12 }
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
