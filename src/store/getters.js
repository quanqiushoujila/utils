const getters = {
  // 主题
  theme: state => state.common.theme,
  // 菜单是否置顶
  isTopMenu: state => state.common.isTopMenu,
  // 是否显示面包屑导航
  isShowBreakCrumb: state => state.common.isShowBreakCrumb,

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
  // 部门
  department: state => state.user.department,

  // tabs菜单
  visitedViews: state => state.tags.visitedViews,
  // 当前活动tabs菜单
  activedViews: state => state.tags.activedViews

}
export default getters
