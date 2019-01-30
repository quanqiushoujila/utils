<template>
  <div class="tab-view-container">
    <ul class="clearfix tab-view-wrapper">
      <li
        @click="handleClickTab(menu)"
        v-for="menu in visitedTabViews"
        class="pull-left tab-item"
        :class="{'active': menu.name === activedTabView.name}"
        :key="menu.path">
        {{menu.label}}
        <i
          class="el-icon-error"
          @click.prevent.stop="removeTabView(menu)"
          v-if="visitedTabViews.length > 1">
        </i>
      </li>
    </ul>
    <div class="tab-close-container">
      <el-dropdown class="tab-close-wrapper">
        <span class="el-dropdown-link">
          更多<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleCloseOther">关闭其他</el-dropdown-item>
          <el-dropdown-item @click.native="handleCloseCurrent">关闭当前页</el-dropdown-item>
          <el-dropdown-item @click.native="handleFreshen">刷新</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
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
      type: Number,
      default: 7
    }
  },
  computed: {
    ...mapGetters([
      'visitedTabViews',
      'activedTabView'
    ])
  },
  watch: {
    visitedTabViews: {
      handler (newVal) {
        if (newVal.length > this.max) {
          let visitedTabViews = cloneDeep(this.visitedTabViews)
          visitedTabViews.splice(0, 1)
          this.$store.commit('SET_VISITED_TAB_VIEWS', visitedTabViews)
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 移除tab菜单
    removeTabView (menu) {
      const index = this.findTabViewIndex(menu)
      if (index > -1) {
        // this.setVisitedTabViews(index)
        let visitedTabViews = cloneDeep(this.visitedTabViews)
        visitedTabViews.splice(index, 1)
        this.$store.commit('SET_VISITED_TAB_VIEWS', visitedTabViews)
        if (this.isActiveTab(menu)) {
          this.handleClickTab(this.visitedTabViews[this.visitedTabViews.length - 1])
        }
      }
    },
    // 找到当前打开tab下标
    findTabViewIndex (menu) {
      const index = this.visitedTabViews.findIndex((item) => {
        return item.name === menu.name
      })
      return index
    },
    // 重新设置打开tab的数据
    setVisitedTabViews (index) {
      let visitedTabViews = cloneDeep(this.visitedTabViews)
      visitedTabViews.splice(index, 1)
      this.$store.commit('SET_VISITED_TAB_VIEWS', visitedTabViews)
    },
    // 选中的是否是当前活动tab
    isActiveTab (menu) {
      return menu.name === this.activedTabView.name
    },
    handleClickTab (menu) {
      this.$store.commit('SET_ACTIVED_TAB_VIEW', menu)
      this.$router.push({name: menu.name})
    },
    // 关闭其他
    handleCloseOther () {
      if (this.visitedTabViews.length > 1) {
        this.$store.commit('SET_VISITED_TAB_VIEWS', [this.activedTabView])
      }
    },
    // 刷新页面
    handleFreshen () {
      this.$router.push({name: this.activedTabView.name})
    },
    // 关闭当前页
    handleCloseCurrent () {
      if (this.visitedTabViews.length > 1) {
        // const index = this.findTabViewIndex(this.activedTabView)

      }
    }
  }
}
</script>
<style scoped lang="scss">
  .tab-view-container {
    position: relative;
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
    .tab-close-container {
      position: absolute;
      right: 0;
      top: 0;
      height: 40px;
      background-color: #fff;
      width: 80px;
      .tab-close-wrapper {
        line-height: 40px;
        .el-dropdown-link {
          text-align: center;
          display: block;
          width: 80px;
          cursor: pointer;
        }
      }
    }
  }
</style>
