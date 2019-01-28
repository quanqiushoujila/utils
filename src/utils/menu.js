import {getSessionStorage} from './storage'
// 获取当前活动菜单
export function activedMenu ({menu = {}, key = 'name', childrenName = 'children'}) {
  const data = getSessionStorage({name: 'menu'})
  if (Object.keys(menu).length === 0) {
    return {}
  }
  return findMenu({menu, data, childrenName, key})
}

// 递归获取菜单
function findMenu ({menu, data, childrenName, key}) {
  for (let i = 0, len = data.length; i < len; i++) {
    let currentData = data[i]
    if (currentData[key] === menu[key]) {
      return currentData
    } else {
      let children = currentData[childrenName]
      if (children && children.length > 0) {
        let result = findMenu({menu, data: children, childrenName, key})
        if (result) {
          return findMenu({menu, data: children, childrenName, key})
        } else {
          findMenu({menu, data: children, childrenName, key})
        }
      }
    }
  }
  return null
}
