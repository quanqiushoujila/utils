<template>
  <div>
    <div class="menu-container">
      <k-menu
        @goto-route="handleGotoRoute"
        :data="data">
      </k-menu>
    </div>
    <div class="main-container">
      <gov-bread-crumb></gov-bread-crumb>
      <router-view/>
    </div>
  </div>
</template>
<script>
import menuData from './model/menu'
import kMenu from '@/components/menu'
import govBreadCrumb from '@/components/govBreadCrumb/index'
export default {
  name: 'home',
  components: {kMenu, govBreadCrumb},
  data () {
    return {
      data: menuData
    }
  },
  methods: {
    // 菜单切换
    handleGotoRoute (menu) {
      this.$router.push({path: menu.redirect || menu.path})
    }
  }
}
</script>
<style scoped lang="scss">
  .menu-container {
    width: 250px;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }
  .main-container {
    margin-left: 250px;

  }
</style>
