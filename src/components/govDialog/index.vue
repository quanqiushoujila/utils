<template>
  <el-dialog
    @open="handleOpenDialog"
    @close="handleCloseDialog"
    @closed="handleClosedDialog"
    :append-to-body="appendToBody"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :title="title"
    :lock-scroll="lockScroll"
    :fullscreen="fullscreen"
    :visible.sync="visible"
    :top="top"
    :width="width">
    <div class="dialog-layout" :style="style">
      <div ref="dialogBody">
        <slot></slot>
      </div>
    </div>
    <div slot="footer" class="dialog-footer" v-if="isBtnGroup">
      <template v-for="(item, index) in btnGroups">
        <el-button
          v-if="item.show == null ? true : item.show"
          :key="item.label"
          :loading="item.loading"
          :type="item.type || btnTypes[index]"
          :disabled="item.disabled == null ? false : item.disabled"
          @click="clickHandle(item.fn, item.loading)">
          {{item.label}}
        </el-button>
      </template>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'govDialog',
  data () {
    return {
      visible: false,
      btnTypes: ['', 'primary', 'warning', 'info', 'success', 'danger'],
      style: {},
      clientHeight: 250,
    }
  },
  computed: {
    btnGroups () {
      if (this.btnGroup.length > 0) {
        return this.btnGroup
      }
      return [
        {
          label: '取 消',
          fn: 'handleCancel',
        },
        {
          label: '确 定',
          fn: 'handleSubmit',
        },
      ]
    },
  },
  props: {
    top: {
      type: String,
      default: '15vh',
    },
    // 是否在 Dialog 出现时将 body 滚动锁定
    lockScroll: {
      type: Boolean,
      default: true,
    },
    // 是否全屏
    fullscreen: {
      type: Boolean,
      default: false,
    },
    // 是否显示按钮组
    isBtnGroup: {
      type: Boolean,
      default: true,
    },
    /**
      [{
        label: '确认',
        fn: 'confirmHandle',
        show: true,
        type: 'primary',
        disabled: false,
        loading: false,
      }]
    */
    btnGroup: {
      type: Array,
      default () {
        return []
      },
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      dafault: '50%',
    },
    title: {
      type: String,
      default: '标题',
    },
  },
  methods: {
    // 打开弹窗
    open () {
      this.visible = true
    },
    // 关闭弹窗
    close () {
      this.visible = false
    },
    // 按钮事件
    clickHandle (fn, loading) {
      if (fn === 'handleCancel') {
        this.$emit(fn, loading)
        this.close()
      } else {
        this.$emit(fn, loading)
      }
    },
    // 关闭后动画过后操作
    handleClosedDialog () {
      this.$emit('closed')
    },
    // 关闭后操作
    handleCloseDialog () {
      this.$emit('close')
    },
    // 打开后操作
    handleOpenDialog () {
      this.$nextTick(() => {
        this.resetDocumentClientHeight()
      })
      this.$emit('open')
    },
    // 设置body高度
    setDialogHeight () {
      const documentClientHeight = document.documentElement['clientHeight']
      // const height = this.$refs.dialogBody['clientHeight']
      const otherHeight = 150 + this.top.replace('vh', '') * documentClientHeight / 100
      const bodyHeight = this.$refs.dialogBody.clientHeight
      if (documentClientHeight - otherHeight <= bodyHeight ) {
        this.style = {
          height: documentClientHeight - otherHeight + 'px',
          overflow: 'auto',
        }
      } else {
        this.style = {}
      }
    },
    // 重置窗口可视高度
    resetDocumentClientHeight () {
      this.setDialogHeight()
      window.onresize = () => {
        this.setDialogHeight()
      }
    },
  },
}
</script>
<!-- <style lang="scss" scoped>
.dialog-layout {
  margin: -30px -20px;
  padding: 0px 20px;
}
</style> -->
