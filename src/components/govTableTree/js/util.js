// 設置成對應數據
export function setTableTreeData ({ data = [], level = 1, show = false, expanded = false, expandedName = '_expaneded', levelName = '_level', showName = '_show', childrenName = 'children', parentIdName = 'parentId' }) {
  let arr = []
  console.log('expanded', expanded)
  loop({arr: arr, data: data, level, show, expanded, expandedName, levelName, showName, childrenName, parentIdName})
  return arr
}

function loop ({arr = [], data = [], level, show, expanded, expandedName, levelName, showName, childrenName, parentIdName}) {
  for (let i = 0, len = data.length; i < len; i++) {
    data[i][levelName] = level
    if (expanded) {
      data[i][showName] = expanded
    } else {
      data[i][showName] = level === 1 ? true : (show || false)
    }
    data[i][expandedName] = expanded || false
    let obj = Object.assign({}, data[i])
    delete obj[childrenName]
    arr.push(obj)
    let child = data[i][childrenName]
    if (child && child.length > 0) {
      loop({arr, data: child, level: level + 1, expanded, expandedName, levelName, showName, childrenName, parentIdName})
    }
  }
}

// 判断是否是级联数据
export function isCascader ({dicData = [], childrenName = 'children'}) {
  if (dicData && dicData.length === 0) {
    return false
  }
  let is = false
  for (let i = 0, len = dicData.length; i < len; i++) {
    if (is) {
      break
    }
    for (let key in dicData[i]) {
      if (key === childrenName) {
        is = true
        break
      }
    }
  }
  return is
}
// 获取级联数据
export function getCascader ({ valueName = 'value', labelName = 'label', childrenName = 'children', val, dicData = [] }) {
  let arr = []
  if (dicData && dicData.length > 0) {
    cascaderLoop({arr, val, level: 0, dicData, valueName, labelName, childrenName})
  }
  return arr.join('/')
}

function cascaderLoop ({arr, val, level, dicData, valueName, labelName, childrenName}) {
  let data = dicData
  for (let i = 0, len = data.length; i < len; i++) {
    if (data[i][valueName] === val[level]) {
      arr.push(data[i][labelName])
      let children = data[i][childrenName]
      if (children && children.length > 0) {
        cascaderLoop({arr, val, level: level + 1, dicData: children, valueName, labelName, childrenName})
      }
    }
  }
}
// 获取除级联以外的数据
export function getSelectData ({val, dicData, valueName = 'value', labelName = 'label'}) {
  let arr = []
  if (Array.isArray(val)) {
    for (let j = 0, len1 = val.length; j < len1; j++) {
      for (let i = 0, len = dicData.length; i < len; i++) {
        if (val[j] === dicData[i][valueName]) {
          arr.push(dicData[i][labelName])
          break
        }
      }
    }
  } else {
    for (let i = 0, len = dicData.length; i < len; i++) {
      if (dicData[i][valueName] === val) {
        arr.push(dicData[i][labelName])
        break
      }
    }
  }
  return arr.join(',')
}
// 获取自定义数据
export function getTemplateData ({val, data = []}) {
  let obj = Object.assign({}, val)
  obj.dicData = data.dicData
  const prop = data.prop
  obj[`${prop}ForShow`] = realData({val, data})
  return obj
}

// 获取字典真实数据
export function realData ({val, data, valueName = 'value', labelName = 'label', childrenName = 'children'}) {
  const prop = data.prop
  if (data.type === 'dic') {
    if (data.dicData) {
      if (isCascader({dicData: data.dicData})) {
        return getCascader({val: val[prop], dicData: data.dicData, valueName, labelName, childrenName})
      } else {
        return getSelectData({val: val[prop], dicData: data.dicData, valueName, labelName})
      }
    } else {
      return val[prop]
    }
  }
  return val[prop]
}
