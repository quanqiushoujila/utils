export default [
  {
    id: 1,
    name: 'nav1',
    label: '外网',
    children: [
      {
        id: 11,
        label: '百度',
        name: 'baidu',
        path: 'https://www.baidu.com/'
      },
      {
        id: 12,
        name: 'element',
        label: 'element',
        isBlank: true,
        path: 'http://element-cn.eleme.io',
        redirect: '/tabletree'
      }
    ]
  },
  {
    id: 2,
    label: '组件',
    name: 'components',
    children: [
      {
        id: 21,
        label: 'tabletree',
        name: 'tabletree',
        path: '/tabletree'
      },
      {
        id: 22,
        label: '弹窗',
        name: 'dialog',
        path: '/dialog'
      },
      {
        id: 23,
        label: '详情',
        name: 'detail',
        path: '/detail'
      },
      {
        id: 24,
        label: '富文本',
        name: 'tinymce',
        path: '/tinymce'
      }
    ]
  },
  {
    id: 3,
    label: '其他',
    name: 'nav3',
    path: '/index'
  }
]
