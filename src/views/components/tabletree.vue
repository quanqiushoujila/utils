<template>
  <div>
    <h1>tabletree</h1>
    <gov-table-tree
      :data="tableTreeData"
      @handleDetail="handleDetail"
      @handleUpdate="handleUpdate"
      :option="tableTree">
      <template slot-scope="scope" slot="sex">
        <el-tag>{{scope.data.sexForShow}}</el-tag>
      </template>
      </gov-table-tree>
  </div>
</template>
<script>
import GovTableTree from '@/components/GovTableTree'
import tableTreeDataLazy from '@/assets/data/tableTree'

export default {
  components: {GovTableTree},
  data () {
    return {
      tableTreeData: [],
      tableTree: {
        tree: {
          isLazyLoading: true
        },
        isSelection: true,
        props: [
          {label: 'id', prop: 'id', width: '50px'},
          {label: '姓名', prop: 'name', treeKey: true},
          {label: '性别', prop: 'sex', slot: true, type: 'dic', dicData: [{value: '1', label: '男'}, {value: '2', label: '女'}]},
          {label: '爱好', prop: 'hobby', type: 'dic', dicData: [{value: '1', label: '足球'}, {value: '2', label: '篮球'}, {value: '3', label: '舞蹈'}]},
          {label: '住址', prop: 'address', type: 'dic', dicData: [{value: '1', label: '北京', children: [{value: '11', label: '四环'}]}, {value: '2', label: '江苏', children: [{value: '21', label: '南京'}, {value: '22', label: '泰州'}]}]}
        ],
        operation: {
          props: [
            { label: '详情', fn: 'handleDetail', show: true, permission: '' },
            { label: '编辑', fn: 'handleUpdate', show: true, permission: '' }
          ]
        }
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.tableTreeData = tableTreeDataLazy
    },
    handleDetail (row) {
      console.log('详情', row)
    },
    handleUpdate (row) {
      console.log('编辑', row)
    }
  }
}
</script>
