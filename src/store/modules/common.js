import {setLocalStorage, getLocalStotage} from '@/utils/storage'

const common = {
  state: {
    // 菜单是否置顶
    isTopMenu: getLocalStotage('isTopMenu') || true,
    // 是否显示面包屑导航
    isShowBreakCrumb: getLocalStotage('isShowBreakCrumb') || true,
    // 主题
    theme: getLocalStotage('theme') || '',
    // 是否显示tabnav
    isShowTabNav: getLocalStotage('isShowTabNav') || true
  },
  mutations: {
    // 主题
    SET_THEME: (state, themeName) => {
      state.theme = themeName
      setLocalStorage({name: 'theme', content: themeName})
    },
    // 菜单是否置顶
    SET_IS_TOP_MENU: (state, status) => {
      state.isTopMenu = status
      setLocalStorage({name: 'isTopMenu', content: status})
    },
    // 是否显示面包屑导航
    SET_IS_SHOW_BREAK_CRUMB: (state, status) => {
      state.isShowBreakCrumb = status
      setLocalStorage({name: 'isShowBreakCrumb', content: status})
    },
    // 是否显示tabnav
    SET_IS_SHOW_TAB_NAV: (state, status) => {
      state.isShowTabNav = status
      setLocalStorage({name: 'isShowTabNav', content: status})
    }
  }
}

export default common
