<template>
  <div class="gov-table-tree">
    <el-table
      ref="tableTree"
      :data="data"
      @row-click="handleRowClick"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
      @cell-click="handleCellClick"
      :span-method="spanMethodHandle"
      v-loading="table.loading"
      style="width: 100%"
      :row-style="tableRowStyle"
      :row-class-name="tableRowClassName"
      :stripe="table.stripe ? table.stripe : true"
      :size="table.size ? table.size : 'medium'"
      :show-header="table.showHeader">
      <el-table-column
        v-if="table.isSelection"
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
              <span :style="childStyles(scope.row)"></span>
              <template v-if="scope.row[table.defaultProps.hasChild]">
                <i
                  @click.prevent="toggleHandle(scope.row, scope.$index)"
                  v-if="!loading"
                  class="icon-toggle"
                  :class="iconClasses(scope.row)"></i>
                <i :class="icon.loading" v-else></i>
              </template>
              {{ scope.row[item.prop] }}
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
              <slot :name="item.prop" :data="templateData(item, scope.row)"></slot>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column
            v-if="item.show !== false ? true : false"
            show-overflow-tooltip
            :key="item.prop"
            :width="item.width ? item.width : ''"
            :label="item.label">
            <template slot-scope="scope">
              {{ item.type === 'dic' ? getDicValue(item, scope.row[item.prop]) : scope.row[item.prop] }}
            </template>
          </el-table-column>
        </template>
      </template>
      <el-table-column
        v-if="table.operation && (table.operation.isOperation == null ? true : table.operation.isOperation)"
        fixed="right"
        :label="table.operation.label"
        :width="table.operation.width ? table.operation.width : ''">
        <template slot-scope="scope">
          <template v-for="item in table.operation.props">
            <el-button
               v-if="(item.show == null ? true : item.show)"
              :key="item.label"
              size="small"
              :type="table.operation.type ? table.operation.type : 'text'"
              @click="handleOperation(item, scope.row, scope.$index)">
              {{item.label}}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination" v-show="data.length > 0" v-if="table.pagination.isPagination">
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
import {mergeWith, isBoolean, isString, isNumber} from 'lodash'
export default {
  name: 'govTableTree',
  props: {
    // 是否懒加载
    isLazyLoading: {
      type: Boolean,
      default: false,
    },
    // 数据
    tableTree: {
      type: Object,
      default () {
        return {}
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      loading: false,
      icon: {
        right: 'el-icon-caret-right',
        bottom: 'el-icon-caret-bottom',
        loading: 'el-icon-loading'
      },
      table: {
        defaultProps: {
          expaneded: '_expaneded',
          level: '_level',
          show: '_show',
          children: 'children',
          parentId: 'parentId',
          hasChild: 'hasChild'
        },
        tree: {
          // 是否懒加载
          isLazyLoading: false,
          url: '',
          type: 'get'
        },
        // 加载中
        loading: false,
        // 字典props
        dicDataProps: {
          value: 'value',
          label: 'label'
        },
        // 表头参数
        props: [],
        // 选择框
        isSelection: false,
        // 是否为斑马纹
        stripe: true,
        // Table 的尺寸
        size: 'medium',
        // 是否显示表头
        showHeader: true,
        operation: {
          isOperation: true,
          // 按钮类型
          // danger-红色 warning-黄色 primary-蓝色 success-绿色 info-灰色 默认-白色
          type: 'text',
          label: '操作',
          width: 200,
          props: [
            { label: '详情', fn: 'handleDetail', show: true, permission: '' },
            { label: '编辑', fn: 'handleUpdate', show: true, permission: '' },
            { label: '删除', fn: 'handleDelete', show: true, permission: '' },
          ]
        },
        // 分页
        pagination: {
          isPagination: true,
          total: 0,
          currentPage: 1,
          pageSize: 10,
          layout: 'total, sizes, prev, pager, next, jumper',
          pageSizes: [10, 20, 30, 50]
        }
      }
    }
  },
  watch: {
    tableTree: {
      handler (newVal) {
        this.table = mergeWith(this.table, newVal)
        const props = newVal.operation.props && Array.isArray(newVal.operation.props) ? newVal.operation.props : this.table.operation.props
        this.$set(this.table.operation, 'props', props)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getDefaultPropsName (name) {
      return this.table.defaultProps[name]
    },
    childStyles (row) {
      const level = this.getDefaultPropsName('level')
      return { 'padding-left': (row[level] > 1 ? row[level] * 14 : 0) + 'px' }
    },
    iconClasses (row) {
      return !row[this.getDefaultPropsName('expaneded')] ? this.icon.right : this.icon.bottom
    },
    // 自定义数据
    templateData (data, row) {
      let result = Object.assign({}, row)
      if (data.type === 'dic') {
        result[`${data.prop}ForShow`] = this.getDicValue(data, row[data.prop])
      }
      return result
    },
    // 按钮是否拥有权限
    hasPermission (val) {
      if (val && this.permissions && this.permissions.length) {
        return this.permissions.findIndex(item => item === val) > -1
      }
      return true
    },
    // 通过字典获取值
    getDicValue (data, row) {
      let values = ''
      if (data.inputType === 'cascader') {

      } else {
        if (Array.isArray(row)) {
          values = this.filterData(data.dicData, row)
        } else if (isString(row) || isNumber(row)) {
          values = this.filterData(data.dicData, [row])
        }
      }
      return values
    },
    // 过滤数据
    filterData (data, row) {
      let values = []
      for (let i = 0, len = data.length; i < len; i++) {
        for (let j = 0, len1 = row.length; j < len1; j++) {
          if (data[i][this.table.dicDataProps.value] === row[j]) {
            values.push(data[i])
          }
        }
      }
      let result = values.map(item => {
        return item[this.table.dicDataProps.label]
      })
      return result.toString()
    },
    // 按钮是否显示
    isShow (status = true) {
      if (isBoolean(status) && status) {
        return true
      } else {
        return false
      }
    },
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
      // console.log(row)
      let show = this.getDefaultPropsName('show')
      return row[show] ? '' : 'display:none;'
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
      let isLazyLoading = this.table.tree.isLazyLoading
      let expaneded = this.getDefaultPropsName('expaneded')
      if (isLazyLoading) {
        // let exist = this.hasData(row.id)

      } else {
        if (!row[expaneded]) {
          this.tableTreeChildrenOpen(row.id)
        } else {
          this.tableTreeChildrenClose(row.id)
        }
      }
    },
    // 判断数据是否已经存在
    hasData (id) {
      let data = this.data
      let parentId = this.getDefaultPropsName('parentId')
      let exist = data.findIndex(item => {
        return item[parentId] === id
      })
      return !!exist
    },
    // 打开子级
    tableTreeChildrenOpen (id) {
      let data = this.data
      let parentId = this.getDefaultPropsName('parentId')
      let expaneded = this.getDefaultPropsName('expaneded')
      let show = this.getDefaultPropsName('show')
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].id === id) {
          this.$set(data[i], expaneded, true)
        }
        if (data[i][parentId] === id) {
          this.$set(data[i], show, true)
        }
      }
    },
    // 关闭子级
    tableTreeChildrenClose (id) {
      let arr = []
      let parentId = this.getDefaultPropsName('parentId')
      let hasChild = this.getDefaultPropsName('hasChild')
      let expaneded = this.getDefaultPropsName('expaneded')
      let show = this.getDefaultPropsName('show')
      arr.push(id)
      let data = this.data
      for (let i = 0, len = data.length; i < len; i++) {
        if (id === data[i].id) {
          this.$set(data[i], expaneded, false)
        }
        if (arr.indexOf(data[i][parentId]) > -1) {
          this.$set(data[i], expaneded, false)
          this.$set(data[i], show, false)
          if (data[i][hasChild]) {
            if (arr.indexOf(data[i].id) === -1) {
              arr.push(data[i].id)
            }
          }
        }
      }
    },
    // 按钮事件
    handleOperation (item, row, index) {
      this.$emit(item.fn, row, index)
    }
  }
}
</script>
<style scoped>
.pagination {
  margin-top: 10px;
  text-align: right;
}
.icon-toggle {
  cursor: pointer;
}
</style>
