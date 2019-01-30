<template>
  <div class="detail-form-wrapper">
    <el-row>
      <template v-for="data in option.option">
        <h4 v-if="data.label">{{data.label}}</h4>
        <el-col :span="24 / option.column">
          <template v-for="item in data.column">
            <div class="detail-form-item">
              <div class="detail-form-label" :style="{'width': getLabelWidth(item)"></div>
              <div class="detail-form-content">
                <template v-if="item.slot">
                  <span class="text-wrapper ellipsis">
                    <slot :data="getTemplateData(data, item)" :name="item.prop"></slot>
                  </span>
                </template>
                <template v-else>
                  <span class="text-wrapper ellipsis">{{realData(data, item)}}</span>
                </template>
              </div>
            </div>
          </template>
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'DetailForm',
  props: {
    /**
    {
      labelWidth: '100px',
      dicData: {},
      column: 2,
      option: [
        {
          label: '退款申请',
          slot: false,
          column: [
            {
              label: '姓名',
              prop: 'name',
              labelSlot: false,
              slot: false,
              dicData: data / 'name',
              labelWidth: '100px',
              type:'dic',
              show: true,
              props: {
                label: 'name',
                value: 'code'
              },
            }
          ]
        }
      ]
    }
    */
    option: {
      type: Object,
      default: () => {}
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
    /**
     * 设置label宽度
     * data: 当前条数据
     */
    getLabelWidth (data) {
      let labelWidth = '100px'
      if (this.option.labelWidth) {
        labelWidth = this.option.labelWidth
      }
      if (data.labelWidth) {
        labelWidth = data.labelWidth
      }
      return labelWidth
    },
    /**
     * 获取自定义数据
     * val:
     * data:
     */
    getTemplateData (val, data) {
      let obj = Object.assign({}, val)
      obj.dicData = data.dicData
      const prop = data.prop
      obj[`${prop}ForShow`] = this.realData(val, data)
      return obj
    },
    /**
     * 获取默认props
     * data:
     * name:
     */
    getPropsName (data, name) {
      return (data.props && data.props[name]) || this.defaultProps[name]
    },
    /**
     * 获取字典真实数据
     * val:
     * data:
     */
    realData (val, data) {
      const prop = data.prop
      if (data.type === 'dic') {
        if (data.dicData) {
          if (this.isCascader(val, data)) {
            return this.getCascader(val[prop], data)
          } else {
            return this.getSelectData(val[prop], data)
          }
        } else {
          return val[prop]
        }
      }
      return val[prop]
    },
    /**
     * 获取除级联以外的数据
     * val:
     * data:
     */
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
    /**
     * 获取级联数据
     * val:
     * data:
     */
    getCascader (val, data) {
      let arr = []
      const value = this.getPropsName(data, 'value')
      const label = this.getPropsName(data, 'label')
      const children = this.getPropsName(data, 'children')
      this.getCascaderLoop({arr, val, level: 0, data: data.dicData, value, label, children})
      return arr.join('/')
    },
    getCascaderLoop ({arr, val, level, data, value, label, children}) {
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i][value] === val[level]) {
          arr.push(data[i][label])
          if (data[i][children] && data[i][children].length > 0) {
            this.getCascaderLoop({arr, val, level: level + 1, data: data[i][children], value, label, children})
          }
        }
      }
    },
    /**
     * 判断是否是级联数据
     * val:
     * data:
     */
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
<style scoped lang="scss">
  .detail-form-wrapper {
    .detail-form-item {
      .detail-form-label {

      }
      .detail-form-content {
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
    }
  }
</style>
