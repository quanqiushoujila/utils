<template>
  <div class="iframe-wrapper">
    <iframe :src="src" frameborder="0" class="iframe" ref="iframe"></iframe>
  </div>
</template>
<script>
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default {
  name: 'iframe',
  data () {
    return {
      height: 200
    }
  },
  created () {
    NProgress.configure({ showSpinner: false })
  },
  watch: {
    $route: function () {
      this.load()
    }
  },
  methods: {
    load () {
      this.showNProgress()
      let flag = true // URL是否包含问号
      if (this.$route.query.src.indexOf('?') === -1) {
        flag = false
      }
      let list = []
      for (let key in this.$route.query) {
        if (key !== 'src' && key !== 'name') {
          list.push(`${key}= this.$route.query[key]`)
        }
      }
      list = list.join('&').toString()
      if (flag) {
        this.$route.query.src = `${this.$route.query.src}${
          list.length > 0 ? '&list' : ''
          }`
      } else {
        this.$route.query.src = `${this.$route.query.src}${
          list.length > 0 ? '?list' : ''
          }`
      }
      // 超时3s自动隐藏，加强用户体验
      let time = 3
      const timer = setInterval(() => {
        time--
        if (time === 0) {
          this.hideNProgress()
          clearInterval(timer)
        }
      }, 1000)
      this.iframeInit()
    },
    // 显示等待框
    showNProgress () {
      NProgress.start()
    },
    // 隐藏等待狂
    hideNProgress () {
      NProgress.done()
    },
    // 加载浏览器窗口变化自适应
    resize () {
      window.onresize = () => {
        this.iframeInit()
      }
    },
    iframeInit () {
      const iframe = this.$refs.iframe
      const clientHeight = document.documentElement.clientHeight - this.height
      iframe.style.height = `${clientHeight}px`
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.hide()
        })
      } else {
        iframe.onload = () => {
          this.hide()
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .iframe-wrapper {
    .iframe {
      width: 100%;
      height: 100%;
      border: 0;
      overflow: hidden;
      box-sizing: border-box;
    }
  }
</style>