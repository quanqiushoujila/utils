<template>
  <div class="main">
    <div>
      <router-link to="/">首页</router-link>
      <router-link to="/tabletree">tabletree</router-link>
      <router-link to="/dialog">dialog</router-link>
      <router-link to="/detail">detail</router-link>
    </div>
    <gov-bread-crumb></gov-bread-crumb>
    <router-view/>
  </div>
</template>
<script>
import govBreadCrumb from '@/components/govBreadCrumb/index'
export default {
  components: {govBreadCrumb}
}
</script>
<style scoped lang="scss">
  .main {
    text-align: center;
  }
</style>
