import {
  setLocalStorage,
  setSessionStorage,
  getSessionStorage,
  getLocalStorage
} from '@/utils/storage'

import menu from '@/assets/data/menu'

const user = {
  state: {
    // 字典
    dictionary: getSessionStorage({name: 'dictionary'}) || {},
    // token
    access_token: getSessionStorage({name: 'access_token'}) || '',
    // token
    refresh_token: getLocalStorage({name: 'refresh_token'}) || '',
    // 用户信息
    userInformation: getSessionStorage({name: 'userInformation'}) || {},
    // 权限
    permissions: getSessionStorage({name: 'permissions'}) || {},
    // 当前菜单
    currentMenu: getSessionStorage({name: 'currentMenu'}) || [],
    // 所有菜单
    menu: getSessionStorage({name: 'menu'}) || [],
    // 部门
    department: getSessionStorage({name: 'department'}) || []
  },
  mutations: {
    // 字典
    SET_DICTIONARY (state, data) {
      this.state.dictionary = data
      setSessionStorage({name: 'dictionary', content: data})
    },
    // token
    SET_ACCESS_TOKEN (state, token) {
      this.state.access_token = token
      setSessionStorage({name: 'access_token', content: token})
    },
    // token
    SET_REFRESH_TOKEN (state, token) {
      this.state.refresh_token = token
      setLocalStorage({name: 'refresh_token', content: token})
    },
    // 用户信息
    SET_USER_INFORMATION (state, user) {
      this.state.userInformation = user
      setSessionStorage({name: 'userInformation', content: user})
    },
    // 权限
    SET_PERMISSIONS (state, permissions) {
      this.state.permissions = permissions
      setSessionStorage({name: 'permissions', content: permissions})
    },
    // 所有菜单
    SET_MENU (state, menu) {
      this.state.menu = menu
      setSessionStorage({name: 'menu', content: menu})
    },
    // 当前菜单
    SET_CURRENT_MENU (state, currentMenu) {
      this.state.currentMenu = currentMenu
      setSessionStorage({name: 'currentMenu', content: currentMenu})
    },
    // 部门
    SET_DEPARTMENT: (state, data) => {
      state.department = data
      setSessionStorage({name: 'department', content: data})
    }
  },
  actions: {
    GetMenu ({commit}) {
      commit('SET_MENU', menu)
    }
  }
}

export default user
