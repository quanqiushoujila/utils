<template>
  <div>
    <fm-making-form
      style="height: 500px;"
      ref="formMarking"
      preview>
      <template slot="action">
        <span class="making-form-name" @click="getJSON">保存到申请表</span>
      </template>
      <template slot="blank" slot-scope="scope">
        宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
        高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
      </template>
    </fm-making-form>
    实例：
    <fm-generate-form :data="jsonData" ref="generateForm">
      <template slot="blank" slot-scope="scope">
         宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
         高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
       </template>
    </fm-generate-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      jsonData: {
        'list': [],
        'config': {
          'labelWidth': 100,
          'labelPosition': 'top',
          'size': 'small'
        }
      }
    }
  },
  methods: {
    getJSON () {
      this.jsonData = this.$refs.formMarking.getJSON()
    }
  }
}
</script>
<style scoped lang="scss">
  .making-form-name {
    font-size: 14px;
    margin-right: 10px;
    color: #409EFF;
    cursor: pointer;
  }
</style>
