<template>
  <div>
    <h1>详情</h1>
    <gov-form-detail :data="data" :option="option">
      <template slot="hobby" slot-scope="scope">
        {{scope.row.hobbyForShow}}
      </template>
      <template slot="name" slot-scope="scope">
        {{scope.row.name}}
      </template>
    </gov-form-detail>
    <br>
    <detail-form :data="data" :option="option2">
      <template slot="hobby" slot-scope="scope">
        <el-tag v-for="item in scope.row.hobbyData" :key="item.value">{{item.label}}</el-tag>
      </template>
      <template slot="name" slot-scope="scope">
        {{scope.row.name}}
      </template>
      <template slot="nameLabel" slot-scope="scope">
        {{scope.row.label}}
      </template>
    </detail-form>
  </div>
</template>
<script>
import GovFormDetail from '@/components/GovFormDetail'
import DetailForm from '@/components/DetailForm'
import {data} from '@/assets/data/formDetail'
export default {
  components: {GovFormDetail, DetailForm},
  data () {
    return {
      option: {
        span: 2,
        column: [
          {
            label: '姓名',
            prop: 'name',
            show: true,
            slot: true
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
            slot: true,
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
      data,
      option2: {
        column: 2,
        option: [
          {
            label: '退款申请',
            column: [
              {
                label: '姓名',
                prop: 'name',
                show: true,
                slotLabel: true,
                slot: true
              },
              {
                label: '性别',
                prop: 'sex',
                type: 'dic',
                props: {
                  label: 'name',
                  value: 'id'
                },
                dicData: [
                  {name: '男', id: 1},
                  {name: '女', id: 2}
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
                slot: true,
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
          }
        ]
      }
    }
  }
}
</script>
