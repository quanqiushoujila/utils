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
    label: 'viser',
    name: 'nav3',
    path: '',
    children: [
      {
        id: 31,
        label: '柱状图',
        name: 'bar',
        children: [
          {
            id: 311,
            label: '基础柱状图',
            name: 'basicColumn',
            path: '/viser/bar/basicColumn'
          },
          {
            id: 312,
            label: '分组柱状图',
            name: 'groupedColumn',
            path: '/viser/bar/groupedColumn'
          },
          {
            id: 313,
            label: '基础条形图',
            name: 'basicBar',
            path: '/viser/bar/basicBar'
          },
          {
            id: 314,
            label: '分组条形图',
            name: 'groupedBar',
            path: '/viser/bar/groupedBar'
          }
        ]
      }
    ]
  }
]
