<template>
  <div>
    <select-tree
      v-model="model"
      :treeOption="treeOption"
      @getValue="getValue"
      :tree-data="data">
    </select-tree>
    <br>
    model:{{model}}
  </div>
</template>
<script>
import selectTree from '@/components/SelectTree'
import data from '@/assets/data/tree'
export default {
  components: {selectTree},
  data () {
    return {
      data,
      model: '',
      treeOption: {}
    }
  },
  methods: {
    getValue (value) {
      this.model = value
    }
  }
}
</script>
