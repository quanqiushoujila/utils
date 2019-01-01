<template>
  <div>
    <h1>详情</h1>
    <gov-form-detail :data="data" :option="option">
      <template slot="hobby" slot-scope="scope">
        {{scope.data.hobbyForShow}}
      </template>
      <template slot="name" slot-scope="scope">
        {{scope.data.name}}
      </template>
    </gov-form-detail>
  </div>
</template>
<script>
import govFormDetail from '@/components/govFormDetail'
import {data} from './model/formDetail'
export default {
  components: {govFormDetail},
  data () {
    return {
      option: {
        span: 2,
        column: [
          {
            label: '姓名',
            prop: 'name',
            show: true,
            isTemplate: true
          },
          {
            label: '性别',
            prop: 'sex',
            type: 'dic',
            dicData: [
              {label: '男', value: 1},
              {label: '女', value: 2}
            ]
          },
          {
            label: '地址',
            prop: 'address',
            type: 'dic',
            dicData: [
              {
                label: '北京',
                value: 1,
                children: [
                  {
                    label: '五环',
                    value: 1
                  },
                  {
                    label: '六环',
                    value: 2,
                    children: [
                      {
                        label: '六环小区',
                        value: 1
                      }
                    ]
                  },
                  {
                    label: '四环',
                    value: 3
                  }
                ]
              },
              {
                label: '南京',
                value: 2,
                children: [
                  {
                    label: '鼓楼区',
                    value: 1
                  },
                  {
                    label: '玄武区',
                    value: 2
                  }
                ]
              }
            ]
          },
          {
            label: '爱好',
            prop: 'hobby',
            type: 'dic',
            isTemplate: true,
            dicData: [
              {
                label: '足球',
                value: 1
              },
              {
                label: '篮球',
                value: 2
              },
              {
                label: '跳舞',
                value: 3
              }
            ]
          }
        ]
      },
      data
    }
  }
}
</script>
