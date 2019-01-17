import Bar from '@/views/viser/bar'
import BasicColumn from '@/views/viser/bar/basicColumn'
import GroupedColumn from '@/views/viser/bar/groupedColumn'
import GroupedBar from '@/views/viser/bar/groupedBar'
import BasicBar from '@/views/viser/bar/basicBar'

import Pie from '@/views/viser/pie'
import BasicDonut from '@/views/viser/pie/basicDonut'
import BasicPie from '@/views/viser/pie/basicPie'
import InnerLabelPie from '@/views/viser/pie/InnerLabelPie'

import Line from '@/views/viser/line'
import MultiLine from '@/views/viser/line/multiLine'
import BasicLine from '@/views/viser/line/basicLine'
import MultiSmoothLine from '@/views/viser/line/multiSmoothLine'

import Common from '@/views/viser/common'
import WordCloud from '@/views/viser/common/wordCloud'

import VMap from '@/views/viser/map'
import ChinaMapProvince from '@/views/viser/map/chinaMapProvince'

const barChildren = [
  { path: 'basicColumn', name: 'basicColumn', component: BasicColumn, meta: {label: '基础柱状图'} },
  { path: 'groupedColumn', name: 'groupedColumn', component: GroupedColumn, meta: {label: '分组柱状图'} },
  { path: 'basicBar', name: 'basicBar', component: BasicBar, meta: {label: '基础条形图'} },
  { path: 'groupedBar', name: 'groupedBar', component: GroupedBar, meta: {label: '分组条形图'} }
]
const pieChildren = [
  { path: 'basicDonut', name: 'basicDonut', component: BasicDonut, meta: {label: '基础环形'} },
  { path: 'basicPie', name: 'basicPie', component: BasicPie, meta: {label: '基础饼型'} },
  { path: 'innerLabelPie', name: 'innerLabelPie', component: InnerLabelPie, meta: {label: '饼型-内部文字'} }
]
const lineChildren = [
  { path: 'basicLine', name: 'basicLine', component: BasicLine, meta: {label: '基础折线图'} },
  { path: 'multiLine', name: 'multiLine', component: MultiLine, meta: {label: '多条折线图'} },
  { path: 'multiSmoothLine', name: 'multiSmoothLine', component: MultiSmoothLine, meta: {label: '曲线折线图'} }
]
const mapChildren = [
  { path: 'chinaMapProvince', name: 'chinaMapProvince', component: ChinaMapProvince, meta: {label: '中国省地图'} }
]
const commonChildren = [
  { path: 'wordCloud', name: 'wordCloud', component: WordCloud, meta: {label: '字符云'} }
]
const viserChildren = [
  { path: 'bar', name: 'bar', meta: {label: '柱状图'}, component: Bar, children: barChildren },
  { path: 'pie', name: 'pie', meta: {label: '饼图'}, component: Pie, children: pieChildren },
  { path: 'line', name: 'line', meta: {label: '线性图'}, component: Line, children: lineChildren },
  { path: 'map', name: 'map', meta: {label: '地图'}, component: VMap, children: mapChildren },
  { path: 'common', name: 'common', meta: {label: '其他'}, component: Common, children: commonChildren }
]

export default viserChildren
