import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'prodection'
const store = new Vuex.Store({
  getters,
  strict: debug,
})

export default store
