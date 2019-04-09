<template>
  <div>
    <div class="pull-right">
      <screenfull class="pull-left"/>
      <top-setting class="pull-left"/>
    </div>
  </div>
</template>
<script>
import TopSetting from './topSetting'
import Screenfull from './screenfull'
export default {
  name: 'Top',
  components: {
    TopSetting,
    Screenfull
  }
}
</script>
<style scoped lang="scss">

</style>
