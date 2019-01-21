# table组件
> 基础

```html
  <gov-table-tree
    @handleDetail="handleDetail"
  ></gov-table-tree>
```

``` javascript
table: {
  border: true,
  tableParam: {
    total: 'total',
    data: 'data'
  },
  checkedAll: false,
  expanded: false,
  toggleCheckbox: function (row, index) {
    return true
  },
  defaultProps: {
    expaneded: '_expaneded',
    level: '_level',
    show: '_show',
    loading: '_loading',
    children: 'children',
    parentId: 'parentId',
    hasChild: 'hasChild'
  },
  tree: {
    // 是否懒加载
    isLazyLoading: false,
    url: '',
    method: 'get'
  },
  // 加载中
  loading: false,
  // 字典props
  dicDataProps: {
    value: 'value',
    label: 'label'
  },
  // 表头参数
  props: [],
  // 选择框
  isSelection: false,
  // 是否为斑马纹
  stripe: true,
  // Table 的尺寸
  size: 'medium',
  // 是否显示表头
  showHeader: true,
  operation: {
    slot: false,
    isOperation: true,
    // 按钮类型
    // danger-红色 warning-黄色 primary-蓝色 success-绿色 info-灰色 默认-白色
    type: 'text',
    label: '操作',
    width: 200,
    props: [
      { label: '详情', fn: 'handleDetail', show: true, permission: true, callback: function () {} },
      { label: '编辑', fn: 'handleUpdate', show: true, permission: true, callback: function () {} },
      { label: '删除', fn: 'handleDelete', show: true, permission: true, callback: function () {} }
    ]
  },
  // 分页
  pagination: {
    isPagination: true,
    total: 0,
    currentPage: 1,
    pageSize: 10,
    layout: 'total, sizes, prev, pager, next, jumper',
    pageSizes: [10, 20, 30, 50]
  }
}
```

### 属性/方法/回调
> Attributes 属性

|参数|说明|类型|可选值|默认值|
|:--:|--|--|:--:|:--:|
|data|数据|Array|||
|option|配置参数|Object|||

>option 属性

|参数|说明|类型|可选值|默认值|
|:--:|--|--|:--:|:--:|
|border|是否有边框|Boolean||true|
|tableParam|||||
|checkedAll|是否全选|Boolean||false|
|toggleCheckbox|Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 |Function (row, index) {}|||
|defaultProps|默认参数名|Object||{children: 'children', parentId: 'parentId', hasChild: 'hasChild'}|
|tree|tabletree参数|Object|||
|dicDataProps|字典默认props|Object|||
|props|表头参数|Array|||
|isSelection|是否有选择框|Boolean||false|
|stripe|是否为斑马纹|Boolean||true|
|size|Table 的尺寸|String|medium / small / mini|medium|
|showHeader|是否显示表头|Boolean||true|
|operation|操作参数|Object|||
|pagination|分页参数|Object|||

>option/props 属性

|参数|说明|类型|可选值|默认值|
|:--:|--|--|:--:|:--:|
|label|名称|String|||
|prop|字段名|String|||
|width|宽度|String||'50px'|
|treeKey|tabletree指定|Boolean|||
|slot|是否自定义|Boolean|||
|type|需要字典的必备|||'dic'|
|dicData|字典数据|Array|||

>dicDataProps 属性

|参数|说明|类型|可选值|默认值|
|:--:|--|--|:--:|:--:|
|value|指定选项的值为选项对象的某个属性值|String||value|
|label|指定选项标签为选项对象的某个属性值|String||label|

>tree 属性

|参数|说明|类型|可选值|默认值|
|:--:|--|--|:--:|:--:|
|expanded|是否展开节点|Boolean||false|
|isLazyLoading|是否懒加载数据|Boolean||false|
|url|地址|String|必填||
|method|请求类型|String||get|

>pagination 属性

|参数|说明|类型|可选值|默认值|
|:--:|--|--|:--:|:--:|
|show|是否显示分页|Boolean||true|
|total|总数|Number|||
|currentPage|当前页||Number||
|pageSize|每页个数|Number|||
|layout|默认显示分页内容|||'total, sizes, prev, pager, next, jumper'|
|pageSizes|每页显示个数选择器的选项设置|number[]||pageSizes: [10, 20, 30, 50]|

>dicDataProps 属性

|参数|说明|类型|可选值|默认值|
|:--:|--|--|:--:|:--:|
|slot|是否自定义操作|Boolean||false|
|show|是否显示操作|Boolean||true|
|type|按钮类型|String||text|
|label|名称|String||操作|
|width|宽度|Number||200|
|props|按钮配置参数|Object|||

>dicDataProps/props属性

|参数|说明|类型|可选值|默认值|
|:--:|--|--|:--:|:--:|
|label|按钮名称|String|||
|show|是否显示|Boolean||true|
|permission|通过权限判断按钮是否显示|Boolean||true|
|callback|通过条件判断按钮是否显示|Function (row) {}|||
|fn|该函数方法名|String|||

> event 回调

|事件名称|说明|回调参数|
|--|--|--|
|handleSelectionChange|返回选中值|funciotn（ids, row）{} |


