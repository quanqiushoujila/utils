import Tabletree from '@/views/components/tabletree'
import Dialog from '@/views/components/dialog'
import Detail from '@/views/components/formDetail'
import Tinymce from '@/views/components/tinymce'
import Pdf from '@/views/components/pdf'

const componentsChildren = [
  { path: 'tabletree', name: 'tabletree', component: Tabletree, meta: {label: 'tabletree'} },
  { path: 'dialog', name: 'dialog', component: Dialog, meta: {label: '彈窗'} },
  { path: 'detail', name: 'detail', component: Detail, meta: {label: '詳情'} },
  { path: 'tinymce', name: 'tinymce', component: Tinymce, meta: {label: '富文本'} },
  { path: 'pdf', name: 'pdf', component: Pdf, meta: {label: 'pdf'} }
]
export default componentsChildren
