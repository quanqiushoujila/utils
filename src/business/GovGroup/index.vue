<template>
  <div>
    <avue-crud
      :table-loading="tableLoading"
      @size-change="sizeChange"
      @current-change="currentChange"
      :page="pagination"
      :data="data"
      :option="column.tableProps">
      <template slot-scope="scope" slot="menu">
        <div class="table-btn-group">
          <slot name="menu" :data="scope.row"></slot>
        </div>
      </template>
    </avue-crud>
    <gov-dialog
      @closed="handleClosedDialog"
      @open="handleOpenDialog"
      @close="handleCloseDialog"
      @submit="handleSubmit"
      ref="govDialog">
    </gov-dialog>
  </div>
</template>
<script>
import govDialog from './dialog'
import {mergeWith} from 'lodash'
export default {
  name: 'govGroup',
  components: {govDialog},
  props: {
    // 分页
    pagination: {
      type: Object,
      default: () => {}
    },
    // 列表数据
    data: {
      type: Array,
      default: () => []
    },
    // 搜索参数
    listQuery: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      // 分页
      govPagination: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 显示多少条
        total: 0, // 总条数
        pageSizes: [10, 20, 30, 40, 50],
      },
      // 列表加载状态
      tableLoading: false,
    }
  },
  watch: {
    pagination: {
      handler (newVal) {
        this.govPagination = mergeWith(this.govPagination, newVal)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    dicList () {
      return getDicAll()
    },
  },
  props: {
    // 列表数据
    tableData: {
      type: Array,
      default () {
        return []
      },
    },
    column: {
      type: Object,
      default () {
        return {
          tableProps: [],
          detailOption: [],
          formOption: [],
        }
      },
    },
    // 表单
    form: {
      type: Object,
      default () {
        return {}
      },
    },
    // 字典数据
    options: {
      type: Object,
      detault () {
        return {}
      },
    },
  },
  watch: {
    options: {
      handler (newVal) {
        this.dicList = mergeWith(this.dicList, newVal)
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 打开
    openDialog () {
      this.$refs.kdialog.openDialog()
    },
    // 关闭
    closeDialog () {
      this.$refs.kdialog.closeDialog()
    },
    // 提交
    handleSubmit () {
      this.$emit('handleSubmit')
    },
    // 关闭后动画结束后操作
    handleClosedDialog () {
      this.$emit('handleClosedDialog')
    },
    // 打开后操作
    handleOpenDialog () {
      this.$emit('handleOpenDialog')
    },
    // 关闭后操作
    handleCloseDialog () {
      this.$emit('handleCloseDialog')
    },
  },
}
</script>
<style lang="scss" scoped>

</style>
