const tags = {
  state: {
    // tabs菜单
    visitedTabViews: [],
    // 当前活动tabs菜单
    activedTabViews: {}
  },
  mutations: {
    // tabs菜单
    SET_VISITED_TAB_VIEWS: (state, menu) => {
      state.visitedTabViews = menu
    },
    // 当前活动tabs菜单
    SET_ACTIVED_TAB_VIEW: (state, currentActivedMenu) => {
      state.activedTabViews = currentActivedMenu
    }
  }
}

export default tags
