export default function setTableTreeData ({data = [],
                                          level = 1,
                                          show = false,
                                          expandedName = '_expaneded',
                                          levelName = '_level',
                                          showName = '_show',
                                          childrenName = 'children',
                                          parentIdName = 'parentId'}) {
  let arr = []
  loop({arr: arr, data: data, level, show, expandedName, levelName, showName, childrenName, parentIdName})
  return arr
}

function loop ({arr = [], data = [], level, show, expandedName, levelName, showName, childrenName, parentIdName}) {
  for (let i = 0, len = data.length; i < len; i++) {
    data[i][levelName] = level
    data[i][showName] = level === 1 ? true : (show || false)
    data[i][expandedName] = false
    let obj = Object.assign({}, data[i])
    delete obj[childrenName]
    arr.push(obj)
    let child = data[i][childrenName]
    if (child && child.length > 0) {
      loop({arr, data: child, level: level + 1, expandedName, levelName, showName, childrenName, parentIdName})
    }
  }
}
