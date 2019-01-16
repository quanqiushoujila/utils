<template>
  <div class="viser-wrapper">
    <basic-bar :data="data" :transform="transform"></basic-bar>
  </div>
</template>
<script>
import basicBar from '@/components/viser/bar/basicBar'
export default {
  data () {
    return {
      data: [],
      transform: {
        type: 'sort',
        key: 'country',
        value: 'population',
        callback (a, b) {
          return a.population - b.population > 0
        }
      }
    }
  },
  components: {basicBar},
  created () {
    this.init()
  },
  methods: {
    init () {
      setTimeout(() => {
        this.data = [
          { country: '中国', population: 131744 },
          { country: '印度', population: 104970 },
          { country: '美国', population: 29034 },
          { country: '印尼', population: 23489 },
          { country: '巴西', population: 18203 }
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
