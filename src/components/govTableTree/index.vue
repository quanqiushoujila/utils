<template>
  <div class="gov-table-tree">
    <el-table
      ref="tableTree"
      :data="tableData"
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
                  v-if="!scope.row[getDefaultPropsName('loading')]"
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
              <slot :name="item.prop" :data="templateData(scope.row, item)"></slot>
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
              {{getDicValue(scope.row, item)}}
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
    <div class="pagination" v-show="tableData.length > 0" v-if="table.pagination.isPagination">
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
import $axios from './js/ajax'
import {setTableTreeData, realData, getTemplateData} from './js/util'
export default {
  name: 'govTableTree',
  props: {
    // 数据
    option: {
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
      tableData: [],
      loading: false,
      icon: {
        right: 'el-icon-caret-right',
        bottom: 'el-icon-caret-bottom',
        loading: 'el-icon-loading'
      },
      table: {
        tableParam: {
          total: 'total',
          data: 'data'
        },
        defaultProps: {
          expaneded: '_expaneded',
          level: '_level',
          show: '_show',
          loading: '_loading',
          children: 'children',
          parentId: 'parentId',
          hasChild: 'hasChild'
        },
        tree: {
          // 是否懒加载
          isLazyLoading: false,
          url: '',
          method: 'get'
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
    data: {
      handler (newVal) {
        this.tableData = setTableTreeData({data: newVal})
      },
      deep: true,
      immediate: true
    },
    option: {
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
    templateData (val, data) {
      return getTemplateData({val, data: data || []})
    },
    // 按钮是否拥有权限
    hasPermission (val) {
      if (val && this.permissions && this.permissions.length) {
        return this.permissions.findIndex(item => item === val) > -1
      }
      return true
    },
    // 通过字典获取值
    getDicValue (val, data) {
      return realData({val, data: data || []})
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
      this.$emit('handleSelect', val, row)
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
      let loading = this.getDefaultPropsName('loading')
      let expaneded = this.getDefaultPropsName('expaneded')
      if (isLazyLoading) {
        if (this.hasData(row.id)) {
          // console.log('true')
          this.dataExist(row)
        } else {
          // console.log('false')
          this.$set(row, loading, true)
          this.$set(row, expaneded, true)
          this.getData(row, index)
        }
      } else {
        this.dataExist(row)
      }
    },
    // 数据已存在操作
    dataExist (row) {
      let expaneded = this.getDefaultPropsName('expaneded')
      if (!row[expaneded]) {
        this.tableTreeChildrenOpen(row.id)
      } else {
        this.tableTreeChildrenClose(row.id)
      }
    },
    // 判断数据是否已经存在
    hasData (id) {
      let data = this.tableData
      let parentId = this.getDefaultPropsName('parentId')
      let exist = data.findIndex(item => {
        return item[parentId] === id
      })
      return exist > -1
    },
    // 打开子级
    tableTreeChildrenOpen (id) {
      let data = this.tableData
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
      let data = this.tableData
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
    },
    // 获取ajax数据
    getData (row, index) {
      let dataName = this.table.tableParam.data
      let loading = this.getDefaultPropsName('loading')
      let level = this.getDefaultPropsName('level')
      this.handleAjax({id: row.id}).then(({data}) => {
        if (data.code === 0) {
          let res = setTableTreeData({data: data[dataName], level: row[level] + 1, show: true})
          let len = res.length
          for (let i = len - 1; i >= 0; i--) {
            this.tableData.splice(1 + index, 0, res[i])
          }
        }
        row[loading] = false
      })
    },
    // 请求
    handleAjax (params) {
      // const data1 = {
      //   code: 0,
      //   data: [
      //     { id: 10, parentId: 1, name: '张小黄', sex: '2', address: '北京', hasChild: false, hobby: ['1'] },
      //     { id: 11, name: '张小三', parentId: 1, sex: '1', address: '北京', hobby: ['1', '2'], hasChild: true },
      //     { id: 12, parentId: 1, name: '张小笑', sex: '2', address: '北京', hobby: ['3'], hasChild: false }
      //   ]
      // }
      // const data2 = {
      //   code: 0,
      //   data: [{ id: 21, parentId: 2, name: '小小红', sex: '2', address: '北京', hobby: ['3'], hasChild: false}]
      // }
      // const data11 = {
      //   code: 0,
      //   data: [{ id: 111, parentId: 11, name: '张小小三', sex: '1', address: '北京', hobby: ['1', '2'], hasChild: false}]
      // }
      // return new Promise((resolve, reject) => {
      //   let data = []
      //   if (`data${params.id}` === 'data1') {
      //     data = data1
      //   } else if (`data${params.id}` === 'data2') {
      //     data = data2
      //   } else if (`data${params.id}` === 'data11') {
      //     data = data11
      //   }
      //   resolve({data})
      // })

      return $axios({
        url: this.table.tree.url,
        method: this.table.tree.method || 'get',
        params: params
      })
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
