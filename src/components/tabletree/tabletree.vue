<template>
  <div class="gov-table-tree">

  </div>
</template>
<script>
export default {
  name: 'govTableTree',
  props: {
    // 是否懒加载
    isLazyLoading: {
      type: Boolean,
      default: false,
    },
    // 数据
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    id: {
      type: String,
      default: ''
    },
  },
}
</script>
<style scoped lang="scss">

</style>
