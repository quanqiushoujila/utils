const tags = {
  state: {
    // tabs菜单
    visitedViews: [],
    // 当前活动tabs菜单
    activedViews: []
  },
  mutations: {
    // tabs菜单
    SET_VISITED_VIEWS: (state, menu) => {
      this.state.visitedViews = menu
    },
    // 当前活动tabs菜单
    SET_ACTIVED_VIEW: (state, currentActivedMenu) => {
      this.state.activedViews = currentActivedMenu
    }
  }
}

export default tags
