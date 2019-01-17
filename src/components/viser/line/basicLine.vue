<!-- 基础折线图 -->
<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-line :position="`${transform.key}*${transform.value}`" />
      <v-point :position="`${transform.key}*${transform.value}`" shape="circle" />
    </v-chart>
  </div>
</template>

<script>
import mixin from '../mixin/index'

export default {
  name: 'basicLine',
  mixins: [mixin],
  props: {
    scale: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    vScale () {
      if (this.scale.length > 0) {
        return this.scale
      }
      return [
        {
          dataKey: this.transform.key,
          min: 0
        },
        {
          dataKey: this.transform.value,
          min: 0,
          max: 1
        }
      ]
    }
  }
}
</script>
