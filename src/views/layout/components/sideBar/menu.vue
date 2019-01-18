<template>
  <k-menu
    :outerHeight="outerHeight"
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
  props: {
    outerHeight: {
      type: Number,
      default: 0
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
