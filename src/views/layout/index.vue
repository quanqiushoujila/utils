<template>
  <div class="layout-container">
    <div class="menu-container left-container" :style="{'width': `${menuWidth}px`, top: `${vMenuTop}px`}">
      <k-menu :outerHeight="vMenuTop"/>
    </div>
    <div class="right-container" :style="{'margin-left': `${menuWidth}px`, 'margin-top': `${topHeight}px`}">
      <div class="right-top-container" :style="{'left': `${vMenuWidth}px`, 'height': `${topHeight}px`}">
        <top/>
      </div>
      <div class="right-middle-container">
        <gov-nav v-if="isShowTabNav"/>
        <gov-bread-crumb class="breadcrumb-contianer" v-if="isShowBreakCrumb"/>
      </div>
      <div class="right-bottom-container">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import KMenu from './components/sideBar/menu'
import GovBreadCrumb from '@/components/BreadCrumb'
import Top from './components/top'
import GovNav from './components/nav'
import {mapGetters} from 'vuex'
import config from '@/config'
export default {
  components: {KMenu, GovBreadCrumb, Top, GovNav},
  data () {
    return {
      vMenuWidth: 0,
      vMenuTop: 0
    }
  },
  computed: {
    ...mapGetters([
      'isTopMenu',
      'isShowBreakCrumb',
      'isShowTabNav'
    ]),
    topHeight () {
      return config.layout.topHeight
    },
    menuWidth () {
      return config.layout.menuWidth
    }
  },
  created () {
    this.vMenuWidth = this.menuWidth
  },
  watch: {
    isTopMenu: {
      handler (newVal) {
        this.vMenuTop = newVal ? this.topHeight : 0
        this.vMenuWidth = newVal ? 0 : this.menuWidth
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style scoped lang="scss">
  .left-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    z-index: 10;
  }
  .right-container {
    .right-top-container {
      position: fixed;
      height: 50px;
      right: 0;
      top: 0;
      z-index: 10;
      background-color: #fff;
      border-bottom: 1px solid #d8dce5;
      padding-left: 10px;
    }
    .right-middle-container {
      .breadcrumb-contianer {
        padding: 10px;
      }
    }
  }
</style>
