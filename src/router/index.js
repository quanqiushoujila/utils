import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Component from '@/views/component'
import Life from '@/views/life'
import Filter from '@/views/filter'
import Class from '@/views/class'
import Event from '@/views/event'
import For from '@/views/for'
import Form from '@/views/form'
import Style from '@/views/style'
import If from '@/views/if'
import Slot from '@/views/slot'
import Mixin from '@/views/mixin'
import Prop from '@/views/prop'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'HelloWorld', component: HelloWorld },
    { path: '/component', name: 'component', component: Component },
    { path: '/life', name: 'life', component: Life },
    { path: '/class', name: 'class', component: Class },
    { path: '/filter', name: 'filter', component: Filter },
    { path: '/event', name: 'event', component: Event },
    { path: '/for', name: 'for', component: For },
    { path: '/form', name: 'form', component: Form },
    { path: '/style', name: 'style', component: Style },
    { path: '/if', name: 'if', component: If },
    { path: '/slot', name: 'slot', component: Slot },
    { path: '/mixin', name: 'mixin', component: Mixin },
    { path: '/prop', name: 'prop', component: Prop },
  ]
})
