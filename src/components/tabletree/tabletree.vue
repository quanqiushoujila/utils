<template>
  <div class="gov-table-tree">
    <el-table
      ref="tableTree"
      :data="table.data"
      @row-click="handleRowClick"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
      @cell-click="handleCellClick"
      :span-method="spanMethodHandle"
      v-loading="table.loading ? table.loading : false"
      style="width: 100%"
      :row-style="tableRowStyle"
      :row-class-name="tableRowClassName"
      :stripe="table.stripe ? table.stripe : true"
      :size="table.size ? table.size : 'medium'"
      :show-header="table.showHeader ? table.showHeader : true"
      @selection-change="handleSelectionChange">
      <el-table-column
        v-if="table.selection == null ? true : table.selection"
        type="selection"
        width="55">
      </el-table-column>
      <template v-for="item in table.props">
        <template v-if="item.treeKey">
          <el-table-column
            :label="item.label"
            :width="item.width ? item.width : ''"
            :prop="item.prop || ''">
            <template slot-scope="scope">
              <span
                @click.prevent="toggleHandle(scope.row, scope.$index)"
                :style="childStyles(scope.row)">
                <i
                  :class="iconClasses(scope.row)"
                  :style="iconStyles(scope.row)"></i>
                {{ scope.row[item.prop] }}
              </span>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.template">
          <el-table-column
            show-overflow-tooltip
            :prop="item.prop || ''"
            :key="item.prop"
            :label="item.label"
            v-if="item.show !== false ? true : false"
            :min-width="item.minWidth ? item.minWidth : ''"
            :width="item.width ? item.width : ''">
            <template slot-scope="scope">
              <slot :name="item.prop" :data="scope"></slot>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <table-column
            @tableCellHandle="tableCellHandle"
            :key="item.prop"
            :data="item">
          </table-column>
        </template>
      </template>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="table.pagination.currentPage ? table.pagination.currentPage : 1"
        :page-sizes="table.pagination.pageSizes ? table.pagination.pageSizes : [10, 20, 30, 50]"
        :page-size="table.pagination.pageSize ? table.pagination.pageSize : 10"
        :layout="table.pagination.layout ? table.pagination.layout : 'total, sizes, prev, pager, next, jumper'"
        background
        :total="table.pagination.total ? table.pagination.total : 0">
      </el-pagination>
    </div>
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
    return {
      tableTree: {
        // 数据
        data: [],
        // 加载中
        loading: false,
        // 表头参数
        props: {},
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
    }
  },
  computed: {
    childStyles (row) {
      return { 'padding-left': (row[this.level] > 1 ? row[this.level] * 7 : 0) + 'px' }
    },
    iconClasses (row) {
      return !row[this.expanded] ? 'el-icon-caret-right' : 'el-icon-caret-bottom'
    },
    iconStyles (row) {
      return { 'visibility': this.hasChild(row) ? 'visible' : 'hidden' }
    },
    hasChild (row) {
      return (isArray(row[this.childKey]) && row[this.childKey].length >= 1) || false
    }
  },
  methods: {
    // 当某一行被点击时会触发该事件
    handleRowClick (row, event, column) {
      this.$emit('rowClickHandle', row, event, column)
    },
    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    handleSelect (val, row) {

    },
    // 当全选时发生变化时会触发该事件
    handleSelectAll (val) {
      this.$emit('handleSelectAll', val)
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange (val) {
      let ids = val.map((item) => {
        return item.id
      })
      this.$emit('handleSelectionChange', ids, val)
    },
    // 当某个单元格被点击时会触发该事件
    handleCellClick (row, column, cell, event) {
      this.$emit('handleCellClick', row, column, cell, event)
    },
    // 合并单元格
    spanMethodHandle ({ row, column, rowIndex, columnIndex }) {
      this.$emit('spanMethodHandle', row, column, rowIndex, columnIndex)
    },
    // 行的 style 的回调方法，
    tableRowStyle ({row, rowIndex}) {
      if (this.table.tree || (this.table.tree && this.table.tree.hasTree)) {
        let show = !isBoolean(row[this.show]) ? 1 : (row[this.show] ? 1 : 0)
        row[this.show] = !!show
        return show ? '' : 'display:none;'
      }
    },
    // 为 Table 中的某一行添加 classname
    tableRowClassName ({row, rowIndex}) {
      this.$emit('tableRowClassNameHandle', rowIndex, row)
    },
    // 每页条数改变时会触发
    handleSizeChange (val) {
      this.$emit('sizeChangeHandle', val)
    },
    // 当前页改变时会触发
    handleCurrentChange (val) {
      this.$emit('currentChangeHandle', val)
    },
    // 切换子级
    toggleHandle (row, index) {

    }
  }
}
</script>
<style scoped lang="scss">

</style>
