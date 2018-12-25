<template>
  <div>
    <h1>条件渲染</h1>
    <br>
    <div>
      <span v-if="ok">if</span>
      <span v-else>else</span>
      <el-button @click="clickIf">if按钮</el-button>
    </div>
    <br>
    <div>
      <span v-show="ok1">show</span>
      <span v-show="!ok1">!show</span>
      <el-button @click="clickShow">show按钮</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ok: true,
      ok1: true
    }
  },
  methods: {
    clickIf () {
      this.ok = !this.ok
    },
    clickShow () {
      this.ok1 = !this.ok1
    }
  }
}
</script>
