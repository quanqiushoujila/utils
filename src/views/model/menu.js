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
      },
      {
        id: 32,
        label: '线性图',
        name: 'line',
        children: [
          {
            id: 321,
            label: '基础折线图',
            name: 'basicLine',
            path: '/viser/line/basicLine'
          },
          {
            id: 322,
            label: '多条折线图',
            name: 'multiLine',
            path: '/viser/line/multiLine'
          },
          {
            id: 323,
            label: '曲线折线图',
            name: 'multiSmoothLine',
            path: '/viser/line/multiSmoothLine'
          }
        ]
      },
      {
        id: 33,
        label: '饼图',
        name: 'pie',
        children: [
          {
            id: 331,
            label: '基础环形',
            name: 'basicDonut',
            path: '/viser/pie/basicDonut'
          },
          {
            id: 332,
            label: '基础饼型',
            name: 'basicPie',
            path: '/viser/pie/basicPie'
          },
          {
            id: 333,
            label: '饼型-内部文字',
            name: 'innerLabelPie',
            path: '/viser/pie/innerLabelPie'
          }
        ]
      },
      {
        id: 34,
        label: '地图',
        name: 'map',
        children: [
          {
            id: 341,
            label: '中国省地图',
            name: 'chinaMapProvince',
            path: '/viser/map/chinaMapProvince'
          }
        ]
      },
      {
        id: 35,
        label: '其他',
        name: 'common',
        children: [
          {
            id: 351,
            label: '字符云',
            name: 'wordCloud',
            path: '/viser/common/wordCloud'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    label: 'echarts',
    name: 'echarts',
    children: [
      {
        id: 41,
        label: '折线图',
        name: 'line',
        children: [
          {
            id: 411,
            label: '折线图',
            name: 'lineMarker',
            path: '/echarts/line/lineMarker'
          }
        ]
      }
    ]
  }
]
