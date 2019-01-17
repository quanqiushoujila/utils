<template>
  <k-menu
    @goto-route="handleGotoRoute"
    :data="data">
  </k-menu>
</template>
<script>
import menuData from '@/assets/data/menu'
import kMenu from '@/components/menu'
export default {
  components: {kMenu},
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
