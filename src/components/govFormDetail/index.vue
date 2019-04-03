<template>
  <el-form
    ref="form"
    class="detail-container"
    :label-width="option.labelWidth || '100px'">
    <el-row>
      <template v-for="item in option.column">
        <el-col
          :span="24 / (option.span || 1)"
          v-if="item.show == null ? true : item.show"
          :key="item.prop">
          <el-form-item :label="item.label">
            <template v-if="item.slot">
              <span class="text-wrapper ellipsis">
                <slot :row="getTemplateData(data, item)" :name="item.prop"></slot>
              </span>
            </template>
            <template v-else>
              <span class="text-wrapper ellipsis">{{realData(data, item)}}</span>
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>
<script>
export default {
  name: 'govFormDetail',
  props: {
    // 参数
    option: {
      type: Object,
      default () {
        return {}
      }
    },
    // 数据
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      defaultProps: {
        label: 'label',
        value: 'value',
        children: 'children'
      }
    }
  },
  methods: {
    // 获取自定义数据
    getTemplateData (val, data) {
      let obj = Object.assign({}, val)
      obj.dicData = data.dicData
      const prop = data.prop
      obj[`${prop}ForShow`] = this.realData(val, data)
      return obj
    },
    // 获取默认props
    getPropsName (data, name) {
      return (data.props && data.props[name]) || this.defaultProps[name]
    },
    // 获取字典真实数据
    realData (val, data) {
      const prop = data.prop
      if (data.type === 'dic') {
        if (data.dicData) {
          if (this.isCascader(val, data)) {
            console.log(111, val, prop, data)
            return this.getCascader({val: val[prop], data})
          } else {
            return this.getSelectData(val[prop], data)
          }
        } else {
          return val[prop]
        }
      }
      return val[prop]
    },
    // 获取除级联以外的数据
    getSelectData (val, data) {
      const dicData = data.dicData
      const value = this.getPropsName(data, 'value')
      const label = this.getPropsName(data, 'label')
      let arr = []
      if (Array.isArray(val)) {
        for (let j = 0, len1 = val.length; j < len1; j++) {
          for (let i = 0, len = dicData.length; i < len; i++) {
            if (val[j] === dicData[i][value]) {
              arr.push(dicData[i][label])
              break
            }
          }
        }
      } else {
        for (let i = 0, len = dicData.length; i < len; i++) {
          if (dicData[i][value] === val) {
            arr.push(dicData[i][label])
            break
          }
        }
      }
      return arr.join(',')
    },
    // 获取级联数据
    getCascader ({val, data}) {
      let arr = []
      const value = this.getPropsName(data, 'value')
      const label = this.getPropsName(data, 'label')
      const children = this.getPropsName(data, 'children')
      this.getCascaderLoop({arr, val, level: 0, data: data.dicData, value, label, children})
      return arr.join('/')
    },
    getCascaderLoop ({arr, val, level, data, value, label, children}) {
      console.log('val', val)
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i][value] === val[level]) {
          arr.push(data[i][label])
          if (data[i][children] && data[i][children].length > 0) {
            this.getCascaderLoop({arr, val, level: level + 1, data: data[i][children], value, label, children})
          }
        }
      }
    },
    // 判断是否是级联数据
    isCascader (val, data) {
      let is = false
      const dicData = data.dicData
      const children = this.getPropsName(data, 'children')
      for (let i = 0, len = dicData.length; i < len; i++) {
        if (is) {
          break
        }
        for (let key in dicData[i]) {
          if (key === children) {
            is = true
            break
          }
        }
      }
      return is
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-container {
  .text-wrapper {
    display: block;
    border: 1px solid #ddd;
    padding: 0 10px;
    height: 40px;
    color: #666;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
</style>
