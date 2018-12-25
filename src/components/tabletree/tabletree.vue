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
    table: {
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
  data () {
    tableTree: {
      // 数据
      data: [],
      // 选择框
      selection: false,
      // 是否为斑马纹
      stripe: true,
      // Table 的尺寸
      size: 'medium',
      // 是否显示表头
      showHeader: true,
      operation: {
        hasOperation: true,
        // 按钮类型
        type: 'text',
        label: '操作',
        width: 200,
        // danger-红色 warning-黄色 primary-蓝色 success-绿色 info-灰色 默认-白色
        data: [{
          label: '详情',
          fn: 'detailHandle',
          permission: ''
        }]
      },
      // 分页
      pagination: {
        hasPagination: true,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSizes: [10, 20, 30, 50]
      }
    }
  },
}
</script>
<style scoped lang="scss">

</style>
