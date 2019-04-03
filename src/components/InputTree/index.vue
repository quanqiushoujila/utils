<template>
  <div v-show="options.show">
    <el-popover
    v-model="options.visible"
    placement="bottom-start"
    width="400"
    trigger="click">
    <div class="max-height">
      <el-tree
        node-key="options.tree.nodeKey"
        @current-change="((a, b) => {handleTreeCurrentChange(data, a, b)})"
        :highlight-current="true"
        :default-expand-all="true"
        :expand-on-click-node="false"
        :data="options.tree.data"
        :ref="options.prop + 'Tree'"
        :props="data.defaultProps || defaultProps"/>
    </div>
    <el-input
      v-model="model"
      readonly
      slot="reference"
      :placeholder="options.input.placeholder"></el-input>
  </el-popover>
</div>
</template>
<script>
export default {
  name: 'InputTree',
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      model: '',
      options: {
        show: true,
        visible: true,
        input: {
          placeholder: '请选择'
        },
        tree: {
          data: [],
          nodeKey: 'id',
          defaultProps: {
            children: 'children',
            label: 'label'
          }
        }
      }
    }
  },
  methods: {
    handleTreeCurrentChange (data, treeData, node) {
      console.log(data, treeData, node)
    }
  }
}
</script>
