import Mock from 'mockjs'

/**
 * 创建mock模拟数据
 * @param {*} mod 模块
 * @param {*} isOpen 是否开启?
 */
function fnCreate (mod, isOpen = true) {
  for (let key in mod) {
    ((res) => {
      Mock.mock('http://test.com' + res.url, res.type, res.data)
    })(mod[key]() || {})
  }
}
