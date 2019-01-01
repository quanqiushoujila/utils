## 数据基因 通用详情

> 基础

``` html
    <gov-form-detail :data="data" :option="option"></gov-form-detail>
    <!--  自定义 -->
    <gov-form-detail :data="data" :option="option">
      <template slot="hobby" slot-scope="scope">
        {{scope.data.hobbyForShow}}
      </template>
    </gov-form-detail>
    <!-- 
    dicData: [] // 字典数据
    hobby: [] // 真实数据
    hobbyForShow: '' // 获取字典的中文名 -->
```

### 属性/方法/回调

> 属性

|参数|说明|类型|可选值|默认值|
|:--:|--|--|:--:|:--:|
|option|参数|Object|||
|data|数据|Object|||


> option参数 

|参数|说明|类型|可选值|默认值|
|:--:|--|--|:--:|:--:|
|span|每列行数|Number||1|
|column|数据参数|Array|||
|labelWidth|label宽度|String||100px|

> column参数

|属性|说明|类型|可选值|默认值|
|:--:|--|--|:--:|:--:|
|prop|字段名|String|||
|label|中文名|String|||
|show|是否显示|Boolean|true/false|true|
|type|是否需要取字典值|String|||'dic'|
|dicData|字典值|Array||||
|isTemplate|是否自定义|Boolean||false|