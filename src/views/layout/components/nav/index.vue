<template>
  <div class="tab-view-container">
    <ul class="clearfix tab-view-wrapper">
      <li
        @click="handleClickTab(menu)"
        v-for="menu in visitedTabViews"
        class="pull-left tab-item"
        :class="{'active': menu.name === activedTabViews.name}"
        :key="menu.path">
        {{menu.name}}
        <i
          class="el-icon-error"
          @click="removeTabView(menu)"
          v-if="visitedTabViews.length > 1">
        </i>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'tabNav',
  props: {
    // tab存放最大个数
    max: {
      type: [Number, Boolean],
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'visitedTabViews',
      'activedTabViews'
    ])
  },
  methods: {
    // 移除tab菜单
    removeTabView (menu) {
      const index = this.visitedTabViews.findIndex((item) => {
        return item.name === menu.name
      })
      if (index > -1) {
        let visitedTabViews = cloneDeep(this.visitedTabViews)
        visitedTabViews.splice(index, 1)
        this.$store.commit('SET_VISITED_TAB_VIEWS', visitedTabViews)
        if (this.isActiveTab) {
          this.handleClickTab(this.visitedTabViews[this.visitedTabViews.length - 1])
        }
      }
    },
    // 选中的是否是当前活动tab
    isActiveTab (menu) {
      return menu.name === this.activedTabViews.name
    },
    handleClickTab (menu) {
      this.$store.commit('SET_ACTIVED_TAB_VIEW', menu)
      this.$router.push({name: menu.name})
    }
  }
}
</script>
<style scoped lang="scss">
  .tab-view-wrapper {
    height: 40px;
    background: #f6f6f6;
    padding-right: 120px;
    .tab-item {
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      border-right: 1px solid #d7d7d7;
      cursor: pointer;
      &.active {
        background-color: #fff;
      }
      .el-icon-error {
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
</style>
