import Vue from 'vue'
import Router from 'vue-router'
import Tabletree from '@/views/tabletree'
import Dialog from '@/views/dialog'
import Detail from '@/views/formDetail'
import Index from '@/page/index/index'

Vue.use(Router)

const children = [
  { path: '/tabletree', name: 'tabletree', component: Tabletree, meta: {label: 'tabletree'} },
  { path: '/dialog', name: 'dialog', component: Dialog, meta: {label: '彈窗'} },
  { path: '/detail', name: 'detail', component: Detail, meta: {label: '詳情'} }
]

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/tabletree' },
    { path: '/index', name: 'index', redirect: '/tabletree', meta: {label: '首页'}, component: Index, children: children },
    { path: '*', redirect: '/' }
  ]
})
