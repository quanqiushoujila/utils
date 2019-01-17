import {validateNull} from './validate'
/**
 * 获取sessionStorage
 */
export const getSessionStotage = ({name}) => {
  getStorage({name, type: 'sessionStorage'})
}
/**
 * 获取LocalStorage
 */
export const getLocalStotage = ({name}) => {
  getStorage({name, type: 'localStorage'})
}
/**
 * 获取storage
 */
export const getStorage = ({name, type}) => {
  let obj = {}
  let content
  if (type) {
    if (type === 'sessionStorage') {
      obj = window.sessionStorage.getItem(name)
    } else {
      obj = window.localStorage.getItem(name)
    }
  } else {
    obj = window.localStorage.getItem(name)
    if (validateNull(obj)) {
      obj = window.sessionStorage.getItem(name)
    }
  }
  if (validateNull(obj)) return
  obj = JSON.parse(obj)
  if (obj.dataType === 'string') {
    content = obj.content
  } else if (obj.dataType === 'number') {
    content = Number(obj.content)
  } else if (obj.dataType === 'boolean') {
    content = !!obj.content
  } else if (obj.dataType === 'object') {
    content = obj.content
  }
  return JSON.parse(content)
}
/**
 * 存储LocalStorage
 */
export const setLocalStorage = ({name, content}) => {
  setStorage({name, type: 'localStorage', content})
}
/**
 * 存储sessionstorage
 */
export const setSessionStorag = ({name, content}) => {
  setStorage({name, type: 'sessionStorage', content})
}
/**
 * 存储storage
 */
export const setStorage = (params) => {
  const {
    name,
    content,
    type
  } = params
  const obj = {
    dataType: typeof (content),
    content: content,
    type: type,
    datetime: +new Date()
  }
  if (type) window.sessionStorage.setItem(name, JSON.stringify(obj))
  else window.localStorage.setItem(name, JSON.stringify(obj))
}
/**
 * 清空全部sessionstorage
 */
export const clearLocalStorage = () => {
  clearStorage('localStorage')
}
/**
 * 清空全部sessionstorage
 */
export const clearSessionStorage = () => {
  clearStorage()
}
/**
 * 清空全部storage
 */
export const clearStorage = ({type = 'sessionStorage'}) => {
  if (type === 'sessionStorage') {
    window.sessionStorage.clear()
    return
  }
  window.localStorage.clear()
}
