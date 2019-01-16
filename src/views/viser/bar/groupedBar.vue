<template>
  <div>
    <grouped-bar :data="data" :transform="transform"/>
  </div>
</template>
<script>
import groupedBar from '@/components/viser/bar/groupedBar'
export default {
  data () {
    return {
      data: [],
      transform: {
        type: 'fold',
        fields: ['series1', 'series2'],
        key: 'type',
        value: 'value'
      }
    }
  },
  components: {groupedBar},
  created () {
    this.init()
  },
  methods: {
    init () {
      setTimeout(() => {
        this.data = [
          { label: 'Mon.', series1: 2800, series2: 2260 },
          { label: 'Tues.', series1: 1800, series2: 1300 },
          { label: 'Wed.', series1: 950, series2: 900 },
          { label: 'Thur.', series1: 500, series2: 390 },
          { label: 'Fri.', series1: 170, series2: 100 }
        ]
      }, 2000)
    }
  }
}
</script>
