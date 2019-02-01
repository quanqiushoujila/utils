// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Avue from '@smallwei/avue/lib/index.js'
import ElementUI from 'element-ui'
import store from './store'
import viserVue from 'viser-vue'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/tinymce4.7.5/tinymce.min.js'
import '../static/tinymce4.7.5/langs/zh_CN.js'
import '../static/tinymce4.7.5/skins/lightgray/skin.min.css'
import '../static/tinymce4.7.5/skins/lightgray/content.min.css'
import '../static/tinymce4.7.5/plugins/codesample/css/prism.css'
import '@smallwei/avue/lib/theme-chalk/index.css'
import '@/style/common.scss'
import '@/config/font'
Vue.use(viserVue)
// require('@/mock')
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Avue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
