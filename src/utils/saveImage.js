import html2canvas from 'html2canvas'

function dataURLToBlob (dataurl) {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
/**
 * 下载成图片格式
 * @param  {String} Top3Img [id]
 * @param  {String} imgText [图片名]
 */
export default function saveImage (Top3Img, imgText) {
  let canvasID = this.$refs[Top3Img]
  let that = this
  let a = document.createElement('a')
  html2canvas(canvasID).then(canvas => {
    let dom = document.body.appendChild(canvas)
    dom.style.display = 'none'
    a.style.display = 'none'
    document.body.removeChild(dom)
    let blob = that.dataURLToBlob(dom.toDataURL('image/png'))
    a.setAttribute('href', URL.createObjectURL(blob))
    //这块是保存图片操作  可以设置保存的图片的信息
    a.setAttribute('download', imgText + '.png')
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(blob)
    document.body.removeChild(a)
  })
}