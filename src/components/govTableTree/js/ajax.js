import axios from 'axios'
import Cookies from 'js-cookie'
// import { Message } from 'element-ui'

const TokenKey = 'x-access-token'

axios.defaults.timeout = 30000
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
  config.headers['Authorization'] = 'Bearer ' + Cookies.get(TokenKey)
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(new Error(error))
})

export default axios
