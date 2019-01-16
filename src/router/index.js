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
import Bar from '@/views/viser/bar'
import BasicColumn from '@/views/viser/bar/basicColumn'
import GroupedColumn from '@/views/viser/bar/groupedColumn'
import GroupedBar from '@/views/viser/bar/groupedBar'
import BasicBar from '@/views/viser/bar/basicBar'

Vue.use(Router)

const barChildren = [
  { path: 'basicColumn', name: 'basicColumn', component: BasicColumn, meta: {label: '基础柱状图'} },
  { path: 'groupedColumn', name: 'groupedColumn', component: GroupedColumn, meta: {label: '分组柱状图'} },
  { path: 'basicBar', name: 'basicBar', component: BasicBar, meta: {label: '基础条形图'} },
  { path: 'groupedBar', name: 'groupedBar', component: GroupedBar, meta: {label: '分组条形图'} }
]
const viserChildren = [
  { path: 'bar', name: 'bar', meta: {label: '柱状图'}, component: Bar, children: barChildren }
]
const children = [
  { path: '/tabletree', name: 'tabletree', component: Tabletree, meta: {label: 'tabletree'} },
  { path: '/dialog', name: 'dialog', component: Dialog, meta: {label: '彈窗'} },
  { path: '/detail', name: 'detail', component: Detail, meta: {label: '詳情'} },
  { path: '/tinymce', name: 'tinymce', component: Tinymce, meta: {label: '富文本'} },
  { path: '/pdf', name: 'pdf', component: Pdf, meta: {label: 'pdf'} },
  { path: '/viser', name: 'viser', component: Viser, meta: {label: 'viser'}, children: viserChildren }
]

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', redirect: '/tabletree', meta: {label: '首页'}, component: Home, children: children },
    { path: '*', redirect: '/home' }
  ]
})
