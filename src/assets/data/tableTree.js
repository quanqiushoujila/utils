export default [
  {
    id: 1,
    parentId: '',
    name: '张三',
    sex: '1',
    address: ['1', '11'],
    hobby: ['1', '2'],
    hasChild: true,
    children: [
      {
        id: 10,
        parentId: 1,
        name: '张小黄',
        sex: '2',
        address: '北京',
        hasChild: false,
        hobby: ['1']
      },
      {
        id: 11,
        name: '张小三',
        parentId: 1,
        sex: '1',
        address: '北京',
        hobby: ['1', '2'],
        hasChild: true,
        children: [
          {
            id: 111,
            parentId: 11,
            name: '张小小三',
            sex: '1',
            address: '北京',
            hobby: ['1', '2'],
            hasChild: false
          }
        ]
      },
      {
        id: 12,
        parentId: 1,
        name: '张小笑',
        sex: '2',
        address: '北京',
        hobby: ['3'],
        hasChild: false
      }
    ]
  },
  {
    id: 2,
    parentId: '',
    name: '小红',
    sex: '2',
    address: ['2', '21'],
    hobby: ['3'],
    hasChild: true,
    children: [
      {
        id: 21,
        parentId: 2,
        name: '小小红',
        sex: '2',
        address: '北京',
        hobby: ['3'],
        hasChild: false
      }
    ]
  }
]
