<!-- 基础柱状图 -->
<template>
  <div class="viser-wrapper">
    <basic-column :data="data" :transform="transform"></basic-column>
  </div>
</template>
<script>
import BasicColumn from '@/components/Viser/Bar/basicColumn'
export default {
  data () {
    return {
      data: [],
      transform: {
        key: 'year',
        value: 'sales'
      }
    }
  },
  components: {BasicColumn},
  mounted () {
    this.init()
  },
  methods: {
    init () {
      setTimeout(() => {
        this.data = [
          { year: '1951 年', sales: 38 },
          { year: '1952 年', sales: 52 },
          { year: '1956 年', sales: 61 },
          { year: '1957 年', sales: 145 },
          { year: '1958 年', sales: 48 },
          { year: '1959 年', sales: 38 },
          { year: '1960 年', sales: 38 },
          { year: '1962 年', sales: 38 }
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
