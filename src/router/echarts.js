import Line from '@/views/echarts/line'
import LineMarker from '@/views/echarts/line/lineMarker'

const lineChildren = [
  { path: 'lineMarker', name: 'lineMarker', meta: {label: '线性图'}, component: LineMarker }
]
const echartsChildren = [
  { path: 'echartsLine', name: 'echartsLine', meta: {label: '线性图'}, component: Line, children: lineChildren }
]

export default echartsChildren
