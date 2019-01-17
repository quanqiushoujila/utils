<template>
  <div>
    <h1>弹窗</h1>
    <el-button @click="open">打开</el-button>
    <gov-dialog
      @handleSubmit="handleSubmit"
      :title="dialog.textMap[status]"
      ref="dialog">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
    </gov-dialog>
  </div>
</template>
<script>
import GovDialog from '@/components/GovDialog'
export default {
  components: {GovDialog},
  data () {
    return {
      form: {
        name: ''
      },
      status: 'create',
      // 弹窗
      dialog: {
        textMap: {
          create: '创建',
          update: '编辑',
          detail: '详情'
        },
        visible: false
      }
    }
  },
  methods: {
    open () {
      this.$refs.dialog.open()
    },
    handleSubmit () {
      this.$refs.dialog.close()
    }
  }
}
</script>
