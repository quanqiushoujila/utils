<template>
  <el-breadcrumb separator="/">
    <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
    <el-breadcrumb-item v-for="item in links" :key="item.path">{{item.meta.label}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: 'breadCrumb',
  data () {
    return {
      links: []
    }
  },
  created () {
    this.getBreadcrumb()
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb () {
      this.links = this.$route.matched
      console.log('matched', this.links)
    }
  }
}
</script>
