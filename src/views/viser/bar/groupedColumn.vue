<!-- 基础柱状图 -->
<template>
  <div class="viser-wrapper">
    <grouped-column :data="data" :transform="transform"></grouped-column>
  </div>
</template>
<script>
import groupedColumn from '@/components/viser/bar/groupedColumn'

export default {
  data () {
    return {
      data: [],
      transform: {
        type: 'fold',
        fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'],
        key: '月份',
        value: '月均降雨量'
      }
    }
  },
  components: {groupedColumn},
  created () {
    this.loading()
  },
  methods: {
    loading () {
      setTimeout(() => {
        this.data = [
          { name: 'London', 'Jan.': 18.9, 'Feb.': 28.8, 'Mar.': 39.3, 'Apr.': 81.4, 'May': 47, 'Jun.': 20.3, 'Jul.': 24, 'Aug.': 35.6 },
          { name: 'Berlin', 'Jan.': 12.4, 'Feb.': 23.2, 'Mar.': 34.5, 'Apr.': 99.7, 'May': 52.6, 'Jun.': 35.5, 'Jul.': 37.4, 'Aug.': 42.4 }
        ]
      }, 2000)
    }
  }
}
</script>
<style scoped>
  .viser-wrapper {
    width: 500px;
  }
</style>
