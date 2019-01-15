const getters = {
  // 主题
  theme: state => state.common.theme,
  // 部门
  department:  state => state.common.department,
  // 字典
  dictionary: state => state.user.dictionary,
  access_token: state => state.user.access_token,
  refresh_token: state => state.user.refresh_token,
  // 用户信息
  userInformation: state => state.user.userInformation,
  // 权限
  permissions: state => state.user.permissions,
  // 当前菜单
  currentMenu: state => state.user.currentMenu,
  // 所有菜单
  menu: state => state.user.menu,
  // 当前活动的菜单
  activeMenu: state => state.user.activeMenu,
  // 当前活动的主菜单
  activeMainMenu: state => state.user.activeMainMenu
}
export default getters
