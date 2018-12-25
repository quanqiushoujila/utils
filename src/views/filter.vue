<template>
  <div>
    <h1>过滤器</h1>
    <div>实际：{{message}}</div>
    <div>过滤后：{{message | capitalize}}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      message: [1, 2, 3, 4, 5, 6]
    }
  },
  filters: {
    capitalize (value) {
      return value.filter(item => {
        return item % 2
      })
    }
  }
}
</script>