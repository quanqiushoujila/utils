export function setTableTreeData ({data = [], expanded = '_expaneded', level = '_level', show = '_show', children = 'children', parentId = 'parentId'}) {
  let arr = []
  loop({arr: arr, data: data, index: 1, expanded, level, show, children})
  return arr
}

function loop ({arr = [], data = [], index, expanded, level, show, children, parentId}) {
  for (let i = 0, len = data.length; i < len; i++) {
    data[i][level] = index
    data[i][show] = index === 1 ? !!1 : !!0
    data[i][expanded] = false
    let obj = Object.assign({}, data[i])
    delete obj.children
    arr.push(obj)
    let child = data[i][children]
    if (child && child.length > 0) {
      loop({arr, data: child, index: index + 1, expanded, level, show, children, parentId})
    }
  }
}
