<template>
  <div class="clearfix" id="gantt1">
    <div class="gantt-left">
      <div class="table-content">
        <div class="header-container">
          <div class="top"></div>
          <div class="header clearfix">
            <div class="item pull-left" v-for="item in props" :key="item.label" :style="'width: calc(' + item.width +' - 1px)'">{{item.label}}</div>
          </div>
        </div>
        <div class="body-container">
          <div class="content">
            <div class="content-item" v-for="item in ganttData" :key="item.id">
              <div class="clearfix content-item-wrapper" :key="index" v-for="(child, index) in item" v-show="child.show == null ? true : child.show">
                <div v-for="prop in props" :key="prop.prop" :class="className(prop)" :style="'width: calc(' + prop.width +' - 1px)'" class="pull-left item">
                  <template v-if="prop.prop === 'status' && !child.isTitle">
                    <i class="state" :class="statusColor[child.status]"></i>
                  </template>
                  <template v-else-if="prop.prop === 'name'">
                    <i class="empty" v-for="item1 in child.level" :key="item1"></i>
                    <i v-if="child.hasChild" class="toggle" @click="toggleHandle($event, child)">
                      {{!child.expand ? toggleRight : toggleDown}}
                    </i>
                    <!-- <template v-if="!child.isTitle">
                      {{child.no}}.
                    </template> -->
                  </template>
                  <template v-if="prop.prop !== 'status'">
                    {{child[prop.prop]}}
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="gantt-right">
      <div class="container">
        <div class="top"  :style="'height:' + headerHeight + 'px'">
          <el-date-picker
            v-model="time"
            type="daterange"
            size="mini"
            :picker-options="pickerOptions"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="body-content">
          <div class="body">
            <div class="body-container">
              <div :style="timeWidth">
                <div class="month clearfix">
                  <div class="item" v-for="(item, index) in timer.months" :key="index" :style="'width:' + (ceilHeight * monthColspan(item)) + 'px'">{{getMonthName(item, monthColspan(item))}}</div>
                </div>
                <div class="day clearfix" >
                  <div class="item" v-for="(item, index) in timer.days" :key="index">{{item}}</div>
                </div>
                <div class="date clearfix">
                  <div class="item" v-for="(item, index) in timer.dates" :key="index">{{item}}</div>
                </div>
              </div>
              <div class="chongdie" :style="timeWidth">
                <div class="body-content">
                  <div class="content" v-for="(item, index) in ganttData" :key="index" :style="timeWidth">
                    <div class="content-item" v-for="(child, index) in item" :key="index" v-show="child.show == null ? true : child.show"></div>
                  </div>
                </div>
                <div class="line-container" :style="'width:' + ceilHeight * timer.days.length + 'px'">
                  <div class="line-content" v-for="(item, index) in ganttData" :key="index" :style="timeWidth">
                    <div class="line-item" v-for="(child, index) in item" :key="index" v-show="child.show == null ? true : child.show">
                      <template v-if="child.values && child.values.length > 0">
                        <template v-for="(line, index) in child.values">
                          <div :title="line.desc" class=" line" :key="index" :style="getLineWidth(line)" v-if="line.customClass === 'ganttOrange'" :class="line.customClass === 'ganttOrange' ? 'line-yellow' : ''">
                          </div>
                          <div :title="line.desc" class=" line" :key="index" :style="getLineWidth(line)" v-if="line.customClass === 'ganttBlue'" :class="line.customClass === 'ganttBlue' ? 'line-blue' : ''">
                          </div>
                        </template>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $axios from 'axios'
var DAYS = ['日', '一', '二', '三', '四', '五', '六']
// var MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
var DAY = 60 * 60 * 1000 * 24
// const data1 = [
//   {
//     id: 2,
//     parentId: 1,
//     no: '1-1',
//     name: '项目申报书1-1',
//     startDate: '2018-07-06',
//     progress: '50%',
//     level: 2,
//     hasChild: true,
//     status: 0,
//     hasDownload: true,
//     endDate: '2019-08-01',
//     values: [
//       {
//         from: '1530806400000',
//         to: '1535731200000',
//         desc: '2018-07-06 —— 2018-09-01',
//         label: '',
//         customClass: 'ganttOrange'
//       }
//     ]
//   },
//   {
//     id: 4,
//     parentId: 1,
//     no: '1-2',
//     name: '项目申报书1-2',
//     startDate: '2018-05-01',
//     endDate: '2018-05-04',
//     progress: '50%',
//     level: 1,
//     hasChild: false,
//     status: 0,
//     values: [
//       {
//         from: '1525104000000',
//         to: '1525363200000',
//         desc: '2018-05-01 —— 2018-05-04',
//         label: '',
//         customClass: 'ganttOrange'
//       }
//     ]
//   }
// ]
// const data2 = [
//   {
//     id: 3,
//     parentId: 2,
//     no: '1-1-1',
//     name: '项目申报书1-1-1',
//     startDate: '2018-03-11',
//     endDate: '2018-05-09',
//     progress: '50%',
//     level: 3,
//     hasChild: false,
//     status: 0,
//     values: [
//       {
//         from: '1520697600000',
//         to: '1525795200000',
//         desc: '2018-03-11 —— 2018-05-09',
//         label: '',
//         customClass: 'ganttOrange'
//       }
//     ]
//   }
// ]
// const data5 = [
//   {
//     id: 6,
//     parentId: 5,
//     no: '2-1',
//     name: '采购阶段2-1',
//     startDate: '2018-07-01 ',
//     endDate: '',
//     progress: '50%',
//     level: 2,
//     hasChild: false,
//     status: 0,
//     values: [
//       {
//         from: '1530374400000',
//         to: '1533052800000',
//         desc: '2018-07-01 —— 2018-08-01',
//         label: '',
//         customClass: 'ganttBlue'
//       }
//     ]
//   }
// ]
// const data111 = [
//   {
//     id: 1,
//     parentId: 111,
//     no: '1',
//     name: '立项阶段1',
//     startDate: '2018-01-23',
//     progress: '50%',
//     level: 1,
//     hasChild: true,
//     status: 1,
//     endDate: '2018-01-25',
//     values: [
//       {
//         from: '1516636800000',
//         to: '1516809600000',
//         desc: '2018-01-23 —— 2018-01-25',
//         label: '',
//         customClass: 'ganttBlue'
//       }
//     ]
//   },
//   {
//     id: 5,
//     parentId: 111,
//     no: '2',
//     name: '采购阶段2',
//     startDate: '2018-02-25',
//     endDate: '2018-04-21',
//     progress: '50%',
//     level: 1,
//     hasChild: true,
//     status: 0,
//     values: [
//       {
//         from: '1519488000000',
//         to: '1524240000000',
//         desc: '2018-02-25 —— 2018-04-21',
//         label: '',
//         customClass: 'ganttBlue'
//       }
//     ]
//   },
//   {
//     id: 7,
//     parentId: 111,
//     no: '3',
//     name: '实施阶段3',
//     startDate: '2018-11-21 ',
//     endDate: '2019-01-21',
//     progress: '50%',
//     level: 1,
//     hasChild: false,
//     status: 0,
//     values: [
//       {
//         from: '1542729600000',
//         to: '1548000000000',
//         desc: '2018-11-21 —— 2019-01-21',
//         label: '',
//         customClass: 'ganttOrange'
//       }
//     ]
//   },
//   {
//     id: 8,
//     parentId: 111,
//     no: '4',
//     name: '验收与支付4',
//     startDate: '2018-01-21',
//     endDate: '2018-11-21',
//     progress: '50%',
//     level: 1,
//     hasChild: false,
//     status: 0,
//     values: [
//       {
//         from: '1516464000000',
//         to: '1542729600000',
//         desc: '2018-01-21 —— 2018-11-21',
//         label: '',
//         customClass: 'ganttOrange'
//       }
//     ]
//   }
// ]
// const data222 = [
//   {
//     id: 1,
//     parentId: 222,
//     no: '1',
//     name: '立项阶段1',
//     startDate: '2018-01-23',
//     progress: '100%',
//     level: 1,
//     hasChild: true,
//     status: 1,
//     endDate: '2018-01-25',
//     values: [
//       {
//         from: '1516636800000',
//         to: '1516809600000',
//         desc: '2018-01-23 —— 2018-01-25',
//         label: '',
//         customClass: 'ganttBlue'
//       },
//       {
//         from: '1530206400000',
//         to: '1533106400000',
//         desc: '2018-06-29 —— 2018-08-1',
//         label: '',
//         customClass: 'ganttOrange'
//       }
//     ]
//   },
//   {
//     id: 5,
//     parentId: 222,
//     no: '2',
//     name: '采购阶段2',
//     startDate: '2018-02-25',
//     endDate: '2018-04-21',
//     progress: '50%',
//     level: 1,
//     hasChild: true,
//     status: 0,
//     values: [
//       {
//         from: '1519488000000',
//         to: '1524240000000',
//         desc: '2018-02-25 —— 2018-04-21',
//         label: '',
//         customClass: 'ganttBlue'
//       }
//     ]
//   },
//   {
//     id: 7,
//     parentId: 222,
//     no: '3',
//     name: '实施阶段3',
//     startDate: '2018-11-21 ',
//     endDate: '2019-01-21',
//     progress: '50%',
//     level: 1,
//     hasChild: false,
//     status: 0,
//     values: [
//       {
//         from: '1542729600000',
//         to: '1548000000000',
//         desc: '2018-11-21 —— 2019-01-21',
//         label: '',
//         customClass: 'ganttOrange'
//       }
//     ]
//   },
//   {
//     id: 8,
//     parentId: 222,
//     no: '4',
//     name: '验收与支付4',
//     startDate: '2018-01-21',
//     endDate: '2018-11-21',
//     progress: '99%',
//     level: 1,
//     hasChild: false,
//     status: 0,
//     values: [
//       {
//         from: '1516464000000',
//         to: '1545979190715',
//         desc: '2018-01-21 —— 2018-12-28',
//         label: '',
//         customClass: 'ganttOrange'
//       },
//       {
//         from: '1516464000000',
//         to: '',
//         desc: '2018-01-21 —— 2018-12-28',
//         label: '',
//         customClass: 'ganttBlue'
//       }
//     ]
//   }
// ]
// const data = [
//   [
//     {
//       id: 111,
//       name: '项目1',
//       hasChild: true,
//       from: 1514764800000,
//       to: 1550306400000,
//       startDate: '2018-01-01',
//       endDate: '2019-02-16',
//       isTitle: true
//     }
//   ],
//   [
//     {
//       id: 222,
//       name: '项目2',
//       from: 1530306400000,
//       to: 1555306400000,
//       hasChild: true,
//       startDate: '2018-06-30',
//       endDate: '2019-04-15',
//       isTitle: true
//     }
//   ]
// ]
export default {
  name: 'gantt',
  props: {
    lazyLoad: {
      type: Boolean,
      default: true
    },
    ajax: {
      type: Object,
      default: () => {}
    },
    // ganttData: {
    //   type: Array,
    //   default () {
    //     return []
    //   }
    // },
    value: {
      type: Array,
      default: () => []
    },
    expand: {
      type: Boolean,
      default: false
    },
    props: {
      type: Array,
      default () {
        return [
          {
            label: '状态',
            width: '7%',
            prop: 'status'
          },
          {
            label: '任务名称',
            width: '46%',
            prop: 'name'
          },
          {
            label: '计划开始时间',
            width: '20%',
            prop: 'startDate',
            textAlign: 'center'
          },
          {
            label: '计划达成时间',
            width: '20%',
            prop: 'endDate',
            textAlign: 'center'
          },
          {
            label: '进度',
            width: '7%',
            prop: 'progress',
            textAlign: 'center'
          }
        ]
      }
    }
  },
  data () {
    return {
      headerHeight: 30,
      ceilHeight: 27,
      time: null,
      statusColor: ['s-white', 's-blue', 's-green', 's-yellow', 's-red'],
      toggleDown: '▼',
      toggleRight: '▶',
      ganttData: [],
      oldTimer: {
        start: 0,
        end: 0,
        days: [],
        months: [],
        dates: [],
        time: []
      },
      timer: {
        start: 0,
        end: 0,
        days: [],
        months: [],
        dates: [],
        time: []
      }
    }
  },
  computed: {
    pickerOptions () {
      var self = this
      return {
        disabledDate (time) {
          return time.getTime() < new Date(self.startTime).getTime() - DAY
        }
      }
    },
    timeWidth () {
      return {width: this.ceilHeight * this.timer.days.length + 'px'}
    }
  },
  watch: {
    time (newVal) {
      if (newVal) {
        this.timer.start = +newVal[0]
        this.timer.end = +newVal[1]
        this.setMonthAndDayAndDate(this.timer, 'timer')
      } else {
        this.timer = JSON.parse(JSON.stringify(this.oldTimer))
      }
      console.log(this.timer)
    }
  },
  created () {
    this.ganttData = this.value
    this.setData()
    this.setTime()
  },
  methods: {
    progressBorder (data, row) {
      if (!row.to) {
        return ''
      }
      if (data.progress === '100%') {
        return ''
      }
      var name = ''
      var status = {
        normal: 'progress-border normal',
        timeout: 'progress-border timeout',
        almost: 'progress-border almost'
      }
      var day = (this.initTime(+row.to) - this.initTime(+new Date())) / DAY
      if (day > 5) {
        name = status.normal
      } else if (day < 5 && day >= 0) {
        name = status.almost
      } else {
        name = status.timeout
      }
      return name
    },
    getDataTime (data) {
      var time = new Date(data)
      var year = time.getFullYear()
      var month = time.getMonth()
      var date = time.getDate()
      return year + ' ' + month + ' ' + date
    },
    percentLineWidth (data, row) {
      if (!data.progress) {
        return {}
      }
      if (!row.to || !row.from) {
        return {}
      }

      var width = +this.getLineWidth(row).width.replace('px', '')
      var percent = +data.progress.replace('%', '') / 100
      return {
        width: width * percent + 'px'
      }
    },
    className (prop) {
      var className = ''
      var align = prop.textAlign ? ' ' + prop.textAlign : ''
      var status = prop.prop === 'status' ? ' status' : ''
      className = align + status
      return className
    },
    getMonthName (date, colspan) {
      if (colspan > 3) {
        return date
      }
      return date.slice(5)
    },
    getLineWidth (row) {
      if (!row.to || !row.from) {
        return
      }
      var startTime = row.from
      var endTime = row.to
      var days = Math.floor((endTime - startTime) / DAY)
      var start = this.timer.start
      var postionLeft = Math.floor((startTime - start) / DAY + 1) * this.ceilHeight
      var lineWidth = days * this.ceilHeight
      return {
        'margin-left': postionLeft + 'px',
        'width': lineWidth + 'px'
      }
    },
    getMonthDays (year, month) {
      var d = new Date(year, month, 0)
      return d.getDate()
    },
    monthColspan (date) {
      // var year = date.slice(0, 4)
      // var month = date.slice(5).replace('月', '')
      var index = 0
      for (var i = 0, len = this.timer.time.length; i < len; i++) {
        if (date === this.timer.time[i]) {
          index++
        }
      }
      return index
    },
    setData () {
      var data = this.ganttData
      for (var i = 0, len = data.length; i < len; i++) {
        for (var j = 0, len1 = data[i].length; j < len1; j++) {
          this.$set(data[i][j], 'titleId', data[i][0].id)
          this.$set(data[i][j], 'title', data[i][0].name)
          if (data[i][j].parentId) {
            this.$set(data[i][j], 'show', false)
          }
        }
      }
    },
    setTime () {
      var data = this.ganttData
      for (var i = 0, len = data.length; i < len; i++) {
        if (this.oldTimer.start === 0 || (data[i][0].from < this.oldTimer.start)) {
          this.oldTimer.start = data[i][0].from
        }

        if (this.oldTimer.end === 0 || (data[i][0].to > this.oldTimer.end)) {
          this.oldTimer.end = data[i][0].to
        }
      }
      this.setMonthAndDayAndDate(this.oldTimer)
      this.timer = JSON.parse(JSON.stringify(this.oldTimer))
    },
    setMonthAndDayAndDate (time, name) {
      name = name || 'oldTimer'
      var startTime = this.initTime(time.start)
      var endTime = this.initTime(time.end)
      this[name].dates.length = 0
      this[name].months.length = 0
      this[name].days.length = 0
      this[name].time.length = 0
      if (!time.start || !time.end) {
        return
      }
      do {
        var year = this.getYear(startTime)
        var month = year + '年' + (this.getMonth(startTime) + 1) + '月'
        // 月
        if (this[name].months.length > 0) {
          if (this[name].months.indexOf(month) === -1) {
            this[name].months.push(month)
          }
        } else {
          this[name].months.push(month)
        }
        // 日
        this[name].dates.push(this.getDate(startTime))
        // 星期
        this[name].days.push(DAYS[this.getDay(startTime)])
        this[name].time.push(month)
        startTime += DAY
      } while (endTime >= startTime)
    },
    getYear (time) {
      return new Date(time).getFullYear()
    },
    getMonth (time) {
      return new Date(time).getMonth()
    },
    getDay (time) {
      return new Date(time).getDay()
    },
    getDate (time) {
      return new Date(time).getDate()
    },
    initTime (time) {
      var d = new Date(time)
      d.setHours(0)
      d.setMinutes(0)
      d.setSeconds(1)
      return d.getTime()
    },
    downloadHandle (item) {
      this.$emit('download', item)
    },
    toggleHandle (e, row) {
      if (!this.lazyLoad) {

      } else {
        var isFind = this.findData(row)
        if (isFind) {
          if (e.target.innerText === this.toggleRight) {
            this.showData(row)
            this.$set(row, 'expand', true)
          } else {
            this.hideData(row)
            this.$set(row, 'expand', false)
          }
        } else {
          console.log('ajax', row)
          this.$set(row, 'expand', true)
          this.handleAjax(row)
        }
      }
    },
    // 查找数据数据是否存在
    findData (row) {
      var data = this.ganttData
      var isFind = false
      for (var i = 0, len = data.length; i < len; i++) {
        var child = data[i]
        if (child[0].id === row.titleId) {
          for (var j = 0, len1 = child.length; j < len1; j++) {
            if (child[j].parentId === row.id) {
              isFind = true
              break
            }
          }
        }
      }
      return isFind
    },
    showData (row) {
      var data = this.ganttData
      for (var i = 0, len = data.length; i < len; i++) {
        var child = data[i]
        if (child[0].id === row.titleId) {
          for (var j = 0, len1 = child.length; j < len1; j++) {
            if (child[j].parentId === row.id) {
              this.$set(child[j], 'show', true)
            }
          }
        }
      }
      // console.log(data)
    },
    hideData (row) {
      var data = this.ganttData
      var arr = []
      arr.push(row.id)
      for (var i = 0, len = data.length; i < len; i++) {
        var child = data[i]
        if (child[0].id === row.titleId) {
          for (var j = 0, len1 = child.length; j < len1; j++) {
            if (arr.indexOf(child[j].parentId) > -1) {
              this.$set(child[j], 'show', false)
              this.$set(child[j], 'expand', false)
              if (child[j].hasChild && arr.indexOf(child[j].id) === -1) {
                arr.push(child[j].id)
              }
            }
          }
        }
      }
    },
    handleAjax (row) {
      let that = this
      return $axios({
        headers: this.ajax.headers || {},
        url: this.ajax.url,
        method: 'get',
        params: {id: row.id}
      }).then(({data}) => {
        console.log('data', data)
        if (!data) {
          return
        }
        row.hasChild = false
        let getData = data
        let ganttData = that.ganttData
        for (let i = 0, len = ganttData.length; i < len; i++) {
          if (ganttData[i][0].id === row.titleId) {
            let child = ganttData[i]
            for (let j = 0, len1 = child.length; j < len1; j++) {
              if (child[j].id === row.id) {
                for (let k = getData.length - 1; k >= 0; k--) {
                  child.splice(j + 1, 0, getData[k])
                }
              }
            }
          }
        }
      })
      // setTimeout(function () {
      //   var data = {
      //     data1: data1,
      //     data2: data2,
      //     data5: data5,
      //     data111: data111,
      //     data222: data222
      //   }
      //   var name = `data${row.id}`
      //   var i = 0
      //   var len = 0
      //   for (i = 0, len = data[name].length; i < len; i++) {
      //     that.$set(data[name][i], 'expand', false)
      //     that.$set(data[name][i], 'show', true)
      //     that.$set(data[name][i], 'title', row.title)
      //     that.$set(data[name][i], 'titleId', row.titleId)
      //   }
      //   var getData = data[name]
      //   var ganttData = that.ganttData
      //   for (i = 0, len = ganttData.length; i < len; i++) {
      //     if (ganttData[i][0].id === row.titleId) {
      //       var child = ganttData[i]
      //       for (var j = 0, len1 = child.length; j < len1; j++) {
      //         if (child[j].id === row.id) {
      //           for (var k = getData.length - 1; k >= 0; k--) {
      //             child.splice(j + 1, 0, getData[k])
      //           }
      //         }
      //       }
      //     }
      //   }
      // }, 500)
    }
  }
}
</script>
<style lang="scss" scoped>
  .clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
  }
  #gantt1 {
    border: 1px solid #eee;
    // padding: 20px;
    font-size: 12px;
    th, td {
      height: 26px;
    }
    table, tr, td, th {
      border-collapse:collapse;
    }
    table, tr, td, th {
      border: 1px solid #eee;
    }
    .gantt-left {
      width: 50%;
      float: left;
      overflow: auto;
      .center {
        text-align: center;
      }
      .pull-left {
        float: left;
      }
      .table-content {
        border: 1px solid #eee;
        .header-container {
          .top {
            height: 83px;
          }
          .header {
            background-color: #f6f6f6;
            font-weight: 700;
            height: 26px;
            line-height: 26px;
            text-align: center;
            .item {
              border: 1px solid #eee;
              border-left: none;
              &:last-child {
                border-right: none;
              }
            }
          }
        }
        .body-container {
          color: #666;
          .content-item-wrapper {
            border-bottom: 1px solid #eee;
            &:last-child {
              border-right: none;
            }
            .item {
              height: 26px;
              line-height: 26px;
              border-right: 1px solid #eee;
              &.status {
                .state {
                  margin-top: 6px;
                }
              }
              &:last-child {
                border-right: none;
              }
            }
          }
        }
      }
      thead {
        th {
          font-weight: 700;
        }
      }
      td {
        padding: 0 5px;
      }
      table table {
        // margin-top: -1px;
      }
      .table-responsive > table {
        border: none;
      }
      .empty {
        display: inline-block;
        width: 16px;
      }
      .toggle {
        font-style: normal;
        cursor: pointer;
        display: inline-block;
        width: 8px;
      }
      .state {
        display: block;
        float: left;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #ccc;
        margin: 2px 8px 0 3px;
        &.s-white {
          width: 14px;
          height: 14px;
          border: 1px solid #ddd;
          background-color: #fff;
        }
        &.s-green {
          background-color: #56ad4a;
        }
        &.s-blue {
          background-color: #3aa1dd;
        }
        &.s-green {
          background-color: #56ad4a;
        }
        &.s-yellow{
          background-color: #ffd800;
        }
        &.s-red{
          background-color: #da3628;
        }
      }
    }
    .gantt-right {
      width: 50%;
      float: right;
      overflow: auto;
      color: #666;
      .container {
        width: 99%;
        border: 1px solid #eee;
        .body {
          width: 100%;
          .body-container {
            margin-top: -1px;
            border-top: 1px solid #eee;
            overflow: auto;
            .item {
              box-sizing: border-box;
              float: left;
              width: 27px;
              height: 27px;
              text-align: center;
              line-height: 27px;
              border-right: 1px solid #eee;
              border-bottom: 1px solid #eee;
            }
          }
        }
        .body-content {
          .content {
            .content-item {
              height: 26px;
              border-bottom: 1px solid #eee;
              border-right: 1px solid #eee;
            }
          }
          .chongdie {
            position: relative;
            overflow: hidden;
            .line-container {
              position: absolute;
              z-index: 10;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              .line-content {
                .line-item {
                  position: relative;
                  height: 26px;
                  border-bottom: 1px solid #eee;
                  &:hover {
                    background-color: #e1f0ff;
                  }
                  .line {
                    position: absolute;
                    height: 8px;
                    border-radius: 8px;
                  }
                  .line-blue {
                    top: 3px;
                    background-color: #a3d7ff;
                  }
                  .line-yellow {
                    bottom: 3px;
                    background-color: #f7d494;
                  }
                }
              }
            }
          }
        }
      }
    }
    .table-responsive {
      overflow: auto;
      position: relative;
    }
    .content th {
      font-weight: 700;
    }
  }
  ::-webkit-scrollbar-track-piece {
  background-color:#f8f8f8;
  }
  ::-webkit-scrollbar {
  width:9px;
  height:9px;
  }
  ::-webkit-scrollbar-thumb {
  background-color:#dddddd;
  background-clip:padding-box;
  min-height:28px;
  }
  ::-webkit-scrollbar-thumb:hover {
  background-color:#bbb;
  }
  .line {
    position: relative;
  }
  .progress-line {
    height: 3px;
    background-color: #999;
  }
  .progress-border {
    box-sizing: border-box;
    border: 2px solid #fff;
  }
  .progress-border.success {
    border-color: #56ad4a;
  }
  .progress-border.normal {
    border-color: #3aa1dd;
  }
  .progress-border.timeout {
    border-color: #da3628;
  }
  .progress-border.almost {
    border-color: #ffd800;
  }
</style>
