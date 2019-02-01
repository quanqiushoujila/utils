<template>
  <div class="detail-form-wrapper">
    <template v-for="(options, index) in option.option">
      <h3
        class="detail-form-title"
        v-if="options.label"
        :key="index">
        {{options.label}}
      </h3>
      <el-row :key="index + 1">
        <el-col
          :span="24 / (+option.column || 1)"
          v-for="item in options.column"
          :key="item.prop">
          <div class="detail-form-item">
            <div
              class="detail-form-label"
              :class="option.textAlign ? `text-${options.textAlign}` : 'text-right'"
              :style="{'width': getLabelWidth(item)}">
              <template v-if="item.slotLabel">
                <slot :row="item" :name="`${item.prop}Label`"></slot>
              </template>
              <template v-else>
                {{item.label}}
              </template>
              <el-tooltip class="item" effect="dark"  v-if="item.font" :content="item.content || ''" placement="bottom">
                <i class="iconfont" :class="item.font" v-if="item.font"></i>
              </el-tooltip>
            </div>
            <div
              class="detail-form-content"
              :style="{'margin-left': getLabelWidth(item)}">
              <template v-if="item.slot">
                <span class="text-wrapper ellipsis">
                  <slot :row="getTemplateData(data, item)" :name="item.prop"></slot>
                </span>
              </template>
              <template v-else>
                <span class="text-wrapper ellipsis">{{realData(data, item)}}</span>
              </template>
            </div>
          </div>
        </el-col>
      </el-row>
    </template>
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
      textAlign: 'right',
      option: [
        {
          label: '退款申请',
          slot: false,
          column: [
            {
              label: '姓名',
              prop: 'name',
              slotLabel: false,
              slot: false,
              dicData: data / 'name',
              labelWidth: '100px',
              type:'dic',
              show: true,
              font: 'icon-iconfontquestion',
              content: '提示',
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
      let result = this.realData(val, data, '')
      obj[`${prop}ForShow`] = result.arr
      if (result.list) {
        obj[`${prop}Data`] = result.list
      }
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
    realData (val, data, type = 'arr') {
      const prop = data.prop
      if (data.type === 'dic') {
        if (data.dicData) {
          if (this.isCascader(val, data)) {
            return this.getCascader(val[prop], data)
          } else {
            let result = this.getSelectData(val[prop], data)
            return type === 'arr' ? result[type] : result
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
      let list = []
      let isArray = Array.isArray(val)
      if (isArray) {
        for (let j = 0, len1 = val.length; j < len1; j++) {
          for (let i = 0, len = dicData.length; i < len; i++) {
            if (val[j] === dicData[i][value]) {
              arr.push(dicData[i][label])
              list.push(dicData[i])
              break
            }
          }
        }
      } else {
        for (let i = 0, len = dicData.length; i < len; i++) {
          if (dicData[i][value] === val) {
            arr.push(dicData[i][label])
            list.push(dicData[i])
            break
          }
        }
      }
      return {arr: arr.join(','), list: isArray ? list : list[0]}
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
    .detail-form-title {
      line-height: 40px;
      margin: 20px 0 10px;
      font-weight: 500;
      padding-left: 20px;
      // border-top: 1px solid #d7d7d7;
    }
    .detail-form-item {
      line-height: 40px;
      color: #606266;
      margin-bottom: 20px;
      .detail-form-label {
        float: left;
        padding-right: 10px;
        &.text-left {
          text-align: left;
        }
        &.text-center {
          text-align: center;
        }
        &.text-right {
          text-align: right;
        }
      }
      .detail-form-content {
        box-sizing: border-box;
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
