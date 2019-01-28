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
import {mapGetters} from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
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
  computed: {
    ...mapGetters([
      'visitedTabViews'
    ])
  },
  methods: {
    // 菜单切换
    handleGotoRoute (menu) {
      this.$store.commit('SET_ACTIVED_TAB_VIEW', menu)
      this.setVisitedTabViews(menu)
      this.$router.push({path: menu.redirect || menu.path})
    },
    setVisitedTabViews (menu) {
      console.log('this.visitedTabViews', this.visitedTabViews)
      const index = this.visitedTabViews.findIndex((item) => {
        return item.name === menu.name
      })
      if (index === -1) {
        let visitedTabViews = cloneDeep(this.visitedTabViews)
        visitedTabViews.push(menu)
        this.$store.commit('SET_VISITED_TAB_VIEWS', visitedTabViews)
      }
    }
  }
}
</script>
