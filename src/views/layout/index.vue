<template>
  <div class="layout-container">
    <div class="menu-container left-container">
      <k-menu/>
    </div>
    <div class="right-container">
      <div class="right-top-container">
        <top/>
      </div>
      <div class="right-middle-container">
        <gov-bread-crumb class="breadcrumb-contianer"/>
      </div>
      <div class="right-bottom-container">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import KMenu from './components/sideBar/menu'
import GovBreadCrumb from '@/components/govBreadCrumb'
import Top from './components/top'
export default {
  components: {KMenu, GovBreadCrumb, Top},
  data () {
    return {
      width: 250
    }
  }
}
</script>
<style scoped lang="scss">
  .left-container {
    width: 250px;
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
      left: 250px;
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
    margin: 50px 0 0 250px;
  }
</style>
