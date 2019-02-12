## 通用详情

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
|column|每列行数|Number||1|
|option|参数|Array|||

>option-option参数

|参数|说明|类型|可选值|默认值|
|:--:|--|--|:--:|:--:|
|label|主标题|String||’‘（可无）|
|column|表单参数|Array|||

> option-option-column参数

|属性|说明|类型|可选值|默认值|
|:--:|--|--|:--:|:--:|
|prop|字段名|String|||
|props||Object||{label: 'name',value: 'id',children: 'children'}|
|label|中文名|String|||
|show|是否显示|Boolean|true/false|true|
|type|是否需要取字典值|String|||'dic'|
|dicData|字典值|Array||||
|slot|是否自定义|Boolean||false|
|slotLabel|label是否自定义|Boolean||false|
|callback|判断条件是否显示|Function(row){}|||

>valueFormat

|格式|含义|备注|举例|
|:--:|:--:|:--:|:--:|
|yyyy|年||2017|
|M|月|不补 0|1|
|MM|月||1|
|d|日|不补 0|2|
|dd|日||02|
|H|小时|不补 0|3|
|HH|小时||03|
|m|分钟|不补 0|4|
|mm|分钟||04|
|s|秒|不补 0|5|
|ss|秒||05|
|timestamp|JS 时间戳|组件绑定值为number类型|1483326245000|

