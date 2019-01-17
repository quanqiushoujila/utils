import Vue from 'vue'
import Router from 'vue-router'
import Tabletree from '@/views/tabletree'
import Dialog from '@/views/dialog'
import Detail from '@/views/formDetail'
import Tinymce from '@/views/tinymce'
// import Index from '@/page/index/index'
import Pdf from '@/views/pdf'
import Home from '@/views/home'
import Viser from '@/views/viser'
import viserChildren from './viser'
import Echarts from '@/views/echarts'
import echartsChildren from './echarts'

Vue.use(Router)

const children = [
  { path: '/tabletree', name: 'tabletree', component: Tabletree, meta: {label: 'tabletree'} },
  { path: '/dialog', name: 'dialog', component: Dialog, meta: {label: '彈窗'} },
  { path: '/detail', name: 'detail', component: Detail, meta: {label: '詳情'} },
  { path: '/tinymce', name: 'tinymce', component: Tinymce, meta: {label: '富文本'} },
  { path: '/pdf', name: 'pdf', component: Pdf, meta: {label: 'pdf'} },
  { path: '/viser', name: 'viser', component: Viser, meta: {label: 'viser'}, children: viserChildren },
  { path: '/echarts', name: 'echarts', component: Echarts, meta: {label: 'viser'}, children: echartsChildren }
]

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', redirect: '/tabletree', meta: {label: '首页'}, component: Home, children: children },
    { path: '*', redirect: '/home' }
  ]
})
