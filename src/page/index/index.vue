<template>
  <div class="main">
    <div class="link-wrapper">
      <router-link to="/">首页</router-link>
      <router-link to="/tabletree">tabletree</router-link>
      <router-link to="/dialog">弹窗</router-link>
      <router-link to="/detail">详情</router-link>
      <router-link to="/tinymce">富文本</router-link>
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
  .main .link-wrapper {
    text-align: center;
  }
</style>
