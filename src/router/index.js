import Vue from 'vue'
import Router from 'vue-router'
import Tabletree from '@/views/tabletree'
import Dialog from '@/views/dialog'
import Detail from '@/views/formDetail'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/tabletree', name: 'tabletree', component: Tabletree },
    { path: '/dialog', name: 'dialog', component: Dialog },
    { path: '/detail', name: 'detail', component: Detail }
  ]
})
