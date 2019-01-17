import {setLocalStorage, setSessionStorag, getSessionStotage, getLocalStotage} from '@/utils/storage'

const user = {
  state: {
    // 字典
    dictionary: getSessionStotage('dictionary') || {},
    // token
    access_token: getSessionStotage('access_token') || '',
    // token
    refresh_token: getLocalStotage('refresh_token') || '',
    // 用户信息
    userInformation: getSessionStotage('userInformation') || {},
    // 权限
    permissions: getSessionStotage('permissions') || {},
    // 当前菜单
    currentMenu: getSessionStotage('currentMenu') || [],
    // 所有菜单
    menu: getSessionStotage('menu') || [],
    // 部门
    department: getSessionStotage('department') || []
  },
  mutations: {
    // 字典
    SET_DICTIONARY (state, data) {
      this.state.dictionary = data
      setSessionStorag({name: 'dictionary', content: data})
    },
    // token
    SET_ACCESS_TOKEN (state, token) {
      this.state.access_token = token
      setSessionStorag({name: 'access_token', content: token})
    },
    // token
    SET_REFRESH_TOKEN (state, token) {
      this.state.refresh_token = token
      setLocalStorage({name: 'refresh_token', content: token})
    },
    // 用户信息
    SET_USER_INFORMATION (state, user) {
      this.state.userInformation = user
      setSessionStorag({name: 'userInformation', content: user})
    },
    // 权限
    SET_PERMISSIONS (state, permissions) {
      this.state.permissions = permissions
      setSessionStorag({name: 'permissions', content: permissions})
    },
    // 所有菜单
    SET_MENU (state, menu) {
      this.state.menu = menu
      setSessionStorag({name: 'menu', content: menu})
    },
    // 当前菜单
    SET_CURRENT_MENU (state, currentMenu) {
      this.state.currentMenu = currentMenu
      setSessionStorag({name: 'currentMenu', content: currentMenu})
    },
    // 部门
    SET_DEPARTMENT: (state, data) => {
      state.department = data
      setSessionStorag({name: 'department', content: data})
    }
  }
}

export default user
