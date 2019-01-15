<template>
  <aside class="menu-wrapper" :style="{'background-color': backgroundColor, 'height': `calc(100vh - ${+outerHeight}px)`}">
    <el-menu
      class="menu"
      v-if="data.length > 0"
      :unique-opened="uniqueOpened"
      :router="router"
      :collapse-transition="collapseTransition"
      :mode="mode"
      :collapse="isCollapse"
      :background-color="backgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      :default-active="defaultActive">
      <sub-menu
        @goto-route="handleGotoRoute"
        v-for="menu in data"
        :key="menu.id"
        :data="menu">
      </sub-menu>
    </el-menu>
  </aside>
</template>
<script>
import subMenu from './subMenu'
export default {
  name: 'menu',
  components: {subMenu},
  props: {
    // 是否只保持一个子菜单的展开
    uniqueOpened: {
      type: Boolean,
      default: false
    },
    // 是否开启折叠动画
    collapseTransition: {
      type: Boolean,
      default: true
    },
    // 模式 vertical/horizontal
    mode: {
      type: String,
      default: 'vertical'
    },
    // 是否水平折叠收起菜单
    isCollapse: {
      type: Boolean,
      default: false
    },
    // 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
    router: {
      type: Boolean,
      default: false
    },
    // 菜单数据
    data: {
      type: Array,
      default: () => []
    },
    // 当前激活菜单的 index
    defaultActive: {
      type: [String, Number],
      default: ''
    },
    // 菜单的背景色
    backgroundColor: {
      type: String,
      default: '#545c64'
    },
    // 菜单的文字颜色
    textColor: {
      type: String,
      default: '#fff'
    },
    // 当前激活菜单的文字颜色
    activeTextColor: {
      type: String,
      default: '#ffd04b'
    },
    outerHeight: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // 菜单切换
    handleGotoRoute (menu) {
      this.$emit('goto-route', menu)
    }
  }
}
</script>
<style lang="scss" scoped>
  .menu-wrapper{
    .menu {
      border-right: none !important;
    }
  }
</style>
