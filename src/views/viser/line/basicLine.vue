<!-- 基础折线图 -->
<template>
  <div>
    <basic-line :data="data" :transform="transform"/>
  </div>
</template>
<script>
import basicLine from '@/components/viser/line/basicLine'
export default {
  data () {
    return {
      data: [],
      transform: {
        key: 'value',
        value: 'year'
      }
    }
  },
  components: {basicLine},
  created () {
    this.init()
  },
  methods: {
    init () {
      setTimeout(() => {
        this.data = [
          { year: '1991', value: 3 },
          { year: '1992', value: 4 },
          { year: '1993', value: 3.5 },
          { year: '1994', value: 5 },
          { year: '1995', value: 4.9 },
          { year: '1996', value: 6 },
          { year: '1997', value: 7 },
          { year: '1998', value: 9 },
          { year: '1999', value: 13 }
        ]
      }, 1000)
    }
  }
}
</script>
