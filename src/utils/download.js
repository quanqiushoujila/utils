// excel下载文件解析
function contentDispositionAnalysis (contentDisposition) {
  let file = {}
  let list = contentDisposition.split('; ')
  list.forEach(item=>{
    let n = item.split('=')
    n[1] ? file[n[0]] = n[1] : file[n[0]] = n[0]
  })
  file.suffix = file.filename.split('.')[1]
  return file
}

export function downloadExport ({title = '', response}) {
  let contentInfo = contentDispositionAnalysis(response.headers['content-disposition'].replace(/"/g, ""))
  return new Promise((resolve) => {
    let headers = response.headers
    let blob = new Blob([response.data], {
      type: headers['content-type'],
    })
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    if (!title) {
      link.download = contentInfo.filename
    } else {
      link.download = `${title}.${contentInfo.suffix}`
    }
    link.click()
    resolve()
  })
}
