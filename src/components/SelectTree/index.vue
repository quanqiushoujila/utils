<template>
  <div v-show="show">
    <el-popover
    v-model="visible"
    placement="bottom-start"
    width="400"
    trigger="click">
    <div class="max-height">
      <el-tree
        :check-strictly="tree.checkStrictly"
        empty-text="emptyText"
        :showCheckbox="showCheckbox"
        :default-checked-keys="defaultCheckedKeys"
        node-key="tree.nodeKey"
        @current-change="((a, b) => {handleTreeCurrentChange(treeData, a, b)})"
        :highlight-current="tree.highlightCurrent"
        :default-expand-all="tree.defaultExpandAll"
        :expand-on-click-node="false"
        :data="treeData"
        :props="tree.defaultProps"/>
    </div>
    <template v-if="!multiple">
      <el-input
        v-model="model"
        readonly
        :disabled="disabled"
        slot="reference"
        :placeholder="placeholder">
      </el-input>
    </template>
    <template v-else>
      <div
        slot="reference">
        多选
      </div>
    </template>
  </el-popover>
</div>
</template>
<script>
import {mergeWith} from 'lodash'
export default {
  name: 'SelectTree',
  props: {
    value: [String, Number, Array],
    show: {
      type: Boolean,
      default: true
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 单选时是否可以清空选项
    clearable: {
      type: Boolean,
      default: false
    },
    // 占位符
    placeholder: {
      type: String,
      default: '请选择'
    },
    treeOption: {
      type: Object,
      default: () => {}
    },
    treeData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      model: '',
      emptyText: '数据为空',
      visible: false
    }
  },
  computed: {
    tree () {
      return mergeWith({
        nodeKey: 'id',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        defaultExpandAll: false,
        highlightCurrent: false,
        checkStrictly: false,
        lastKey: true,
        selected: 'id'
      }, this.treeOption)
    },
    showCheckbox () {
      return this.multiple
    },
    defaultCheckedKeys () {
      if (Array.isArray(this.value)) {
        return this.value
      }
      return []
    }
  },
  methods: {
    init () {},
    handleTreeCurrentChange (data, treeData, node) {
      if (this.multiple) {

      } else {
        if (this.tree.lastKey) {
          if (!(treeData[this.tree.defaultProps.children] && treeData[this.tree.defaultProps.children].length > 0)) {
            this._setValue(treeData)
          }
        } else {
          this._setValue(treeData)
        }
      }
    },
    _setValue (treeData) {
      this.model = treeData[this.tree.defaultProps.label]
      this.$emit('getValue', treeData[this.tree.nodeKey])
      this.visible = false
    },
    _findKey (data, id) {
      let childrenName = this.tree.defaultProps.children
      let key = this.tree.nodeKey
      for (let i = 0, len = data.length; i < len; i++) {
        let children = data[i][childrenName]
        if (data[i][key] === id) {
          return data[i]
        }
        if (children && children.length > 0) {
          this._findKey(children, id)
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .max-height {
    height: 250px;
    overflow: auto;
    margin: -10px -13px -10px 0;
  }
</style>
