<!-- https://www.kancloud.cn/wangfupeng/wangeditor3/335789 -->
<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>
<script>
import E from 'wangeditor'
export default {
  name: 'editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    menus: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    getContent () {
      this.$emit('getContent', this.content)
      return this.content
    },
    init () {
      let editor = new E(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.content = html
      }
      if (this.menus.length > 0) {
        editor.customConfig.menus = this.menus
      }
      editor.create()
      if (this.value) {
        editor.txt.html(this.value)
        this.content = this.value
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  }
}

</script>
