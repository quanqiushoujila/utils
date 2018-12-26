<template>
  <div>
    <h1>tabletree</h1>
    <gov-table-tree
      @handleDetail="handleDetail"
      @handleUpdate="handleUpdate"
      :tableTree="tableTree">
      <template slot-scope="scope" slot="sex">
        <el-tag>{{scope.data.sexForShow}}</el-tag>
      </template>
      </gov-table-tree>
  </div>
</template>
<script>
import govTableTree from '@/components/govTableTree'
export default {
  components: {govTableTree},
  data () {
    return {
      tableTree: {
        data: [
          {id: 1, name: '张三', sex: '1', address: '北京', hobby: ['1', '2']},
          {id: 2, name: '小红', sex: '2', address: '北京', hobby: ['3']},
        ],
        props: [
          {label: '姓名', prop: 'name', treeKey: true},
          {label: '性别', prop: 'sex', template: true, type: 'dic', dicData: [{value: '1', label: '男'}, {value: '2', label: '女'}]},
          {label: '爱好', prop: 'hobby', type: 'dic', dicData: [{value: '1', label: '足球'}, {value: '2', label: '篮球'}, {value: '3', label: '舞蹈'}]},
          {label: '住址', prop: 'address'}
        ],
        operation: {
          props: [
            { label: '详情', fn: 'handleDetail', show: true, permission: '' },
            { label: '编辑', fn: 'handleUpdate', show: true, permission: '' },
          ]
        }
      }
    }
  },
  methods: {
    handleDetail (row) {
      console.log('详情', row)
    },
    handleUpdate (row) {
      console.log('编辑', row)
    },
  }
}
</script>
