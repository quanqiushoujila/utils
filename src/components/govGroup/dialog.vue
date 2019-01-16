<template>
  <gov-dialog
    ref="dialog"
    @open="handleOpenDialog"
    @closed="handleClosedDialog"
    @close="handleCloseDialog"
    width="70%"
    @handleSubmit="handleSubmit"
    :isBtnGroup="false"
    :title="dialog.textMap[status]">
    <form-layout>
      <template v-if="status === 'detail'">
        <div class="detail-wrapper">
          <avue-form-detail v-model="formData" :option="column.detailOption"></avue-form-detail>
        </div>
      </template>
      <template v-else>
        <avue-form ref="form" :option="formOption" v-model="form">
        </avue-form>
      </template>
    </form-layout>
  </gov-dialog>
</template>
<script>
import govDialog from '@/components/govDialog'
export default {
  name: 'dialog',
  components: {govDialog},
  data () {
    return {
      avueOption: {},
      // 弹框状态
      dialogStatus: '',
      // 弹窗
      dialog: {
        textMap: {
          create: '创建',
          update: '编辑',
          detail: '详情',
        },
        textName: {
          create: 'create',
          update: 'update',
          detail: 'detail',
        },
      },
    }
  },
  props: {
    // 弹窗状态
    status: {
      type: String,
      default: 'create',
    },
    column: {
      type: Object,
      default () {
        return {
          detailOption: [],
          formOption: [],
        }
      },
    },
    // form参数
    form: {
      type: Object,
      default () {
        return {}
      },
    },
    // 字典参数
    options: {
      type: Object,
      default () {
        return {}
      },
    },
    // 数据
    data: {
      type: Array,
      default () {
        return []
      },
    }
  },
  methods: {
    getData () {
      this.avueOption = setAvueData({data: this.data})
    },
    // 打开
    openDialog () {
      this.$refs.dialog.open()
    },
    // 关闭
    closeDialog () {
      this.$refs.dialog.close()
    },
    // 提交
    handleSubmit () {
      this.$refs.lineForm.validate().then(() => {
        this.$emit('submit')
      })
    },
    // 关闭后动画结束后操作
    handleClosedDialog () {
      this.$emit('closed')
    },
    // 关闭后操作
    handleCloseDialog () {
      this.$emit('close')
    },
    // 打开后操作
    handleOpenDialog () {
      this.$emit('open')
    },
  },
}
</script>
<style lang="scss" scoped>

</style>
