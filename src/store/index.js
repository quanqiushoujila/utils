import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import common from './modules/common'
import tags from './modules/tags'
import user from './modules/user'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'prodection'
const store = new Vuex.Store({
  modules: {
    common,
    tags,
    user
  },
  getters,
  strict: debug
})

export default store
