<template>
  <div class="slide">
    <div class="slide-container" :style="{'width': width}">
      <div class="slide-item" :style="{'background-color': color, 'width': data}"></div>
    </div>
    <span class="slide-text" v-if="showData">{{data}}</span>
  </div>
</template>
<script>
export default {
  name: 'Slide',
  props: {
    width: {
      type: String,
      default: '80px'
    },
    color: {
      type: String,
      default: '#66cb68'
    },
    data: {
      type: String,
      default: '50%'
    },
    showData: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
  .slide {
    display: inline-block;
    .slide-container {
      display: inline-block;
      height: 7px;
      border-radius: 7px;
      overflow: hidden;
      background-color: #d8d8d8;
      .slide-item {
        height: 7px;
        border-radius: 7px;
      }
    }
    .slide-text {
      margin-left: 10px;
      vertical-align: middle;
      font-size: 14px;
      color: #333;
    }
  }
</style>
