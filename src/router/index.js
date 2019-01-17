import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/layout'
import Components from '@/views/components'
import componentsChildren from './components'
import Viser from '@/views/viser'
import viserChildren from './viser'
import Echarts from '@/views/echarts'
import echartsChildren from './echarts'

Vue.use(Router)

const children = [
  { path: '/components', name: 'components', component: Components, meta: {label: '组件'}, children: componentsChildren },
  { path: '/viser', name: 'viser', component: Viser, meta: {label: 'viser'}, children: viserChildren },
  { path: '/echarts', name: 'echarts', component: Echarts, meta: {label: 'echarts'}, children: echartsChildren }
]

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', redirect: '/tabletree', meta: {label: '首页'}, component: Home, children: children },
    { path: '*', redirect: '/home' }
  ]
})
