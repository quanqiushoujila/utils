<template>
  <el-submenu
    v-if="data.children && data.children.length > 0"
    :index="data.name">
    <template slot="title">
      <i class="iconfont" :class="data.icon" v-if="data.icon"></i>
      <span>{{ data.label }}</span>
    </template>
    <sub-menu
      @goto-route="handleGotoRoute"
      v-for="menu in data.children"
      :key="menu.id"
      :data="menu">
    </sub-menu>
  </el-submenu>
  <el-menu-item v-else :index="data.name" @click="handleGotoRoute(data)">
    <i class="iconfont" :class="data.icon" v-if="data.icon"></i>
    <span>{{ data.label }}</span>
  </el-menu-item>
</template>

<script>
import subMenu from './subMenu'
export default {
  name: 'sub-menu',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: { subMenu },
  methods: {
    // 菜单切换
    handleGotoRoute (menu) {
      if (menu.isBlank) {
        window.open(menu.path, '_blank')
      }
      this.$emit('goto-route', menu)
    }
  }
}
</script>
