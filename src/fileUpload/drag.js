/**
 * document.querySelector.bind 🔥
 * bind()的作用：不会直接调用，而是返回一个函数，即克隆了当前的函数；
 * 并且将this指向传递的第一个实参上
 *
 * https://www.cnblogs.com/surfaces/p/5169774.html
 */
const $ = document.querySelector.bind(document)

const doms = {
  img: $('.preview'),
  container: $('.upload'),
  select: $('.upload-select'),
  selectFile: $('.upload-select input'),
  progress: $('.upload-progress'),
  progressNum: $('.progress-num'),
  cancelBtn: $('.upload-progress button'),
  delBtn: $('.upload-result button')
}

// 切换类样式
function showArea(areaName) {
  doms.container.className = `upload ${areaName}`
}
// 上传进度
function setProgress(value) {
  doms.progress.style.setProperty('--percent', value)
  // progressNum.style.width = value || 20 + '%'
}

// 文件校验
function validateFile(file) {
  const sizeLimit = 1 * 1024 * 1024
  const legalExts = ['.jpg', '.jpeg', '.bmp', '.webp', '.gif', '.png']
  if (file.size > sizeLimit) {
    alert('文件尺寸过大')
    return false
  }
  const name = file.name.toLowerCase()
  if (!legalExts.some(ext => name.endsWith(ext))) {
    alert('文件类型不正确')
    return false
  }
  return true
}

/**
 * (网络传输) 上传（高阶函数）
 * @param {*} file
 * @param {*} onProgress
 * @param {*} onFinish
 * @returns 返回一个函数（取消上传）
 */
function upload(file, onProgress, onFinish) {
  // 模拟文件上传
  let p = 0
  onProgress(p)
  const timerId = setInterval(() => {
    p++
    onProgress(p)
    if (p === 100) {
      onFinish('服务器的响应结果')
      clearInterval(timerId)
    }
  }, 50)
  return function () {
    // 取消上传
    clearInterval(timerId)
  }
}
// 取消上传
let cancelUpload = null;

function cancel() {
  // 取消网络传输
  cancelUpload && cancelUpload()
  // 界面变化
  showArea('select')
  // 清空选择文件的元素
  doms.selectFile.value = null;
}

doms.cancelBtn.onclick = doms.delBtn.onclick = cancel

doms.select.ondragenter = e => {
  e.preventDefault()
  // 拖拽东西进来，改变样式
  doms.select.classList.add('draging')
}

doms.select.ondragleave = e => {
  e.preventDefault()
  // 拖拽离开，去除样式
  doms.select.classList.remove('draging')
}

doms.select.ondragover = e => {
  e.preventDefault()
}

doms.select.ondrop = e => {
  e.preventDefault()
  // 获取拖拽的文件对象
  const files = e.dataTransfer.files

  if (!e.dataTransfer.types.includes('Files')) {
    alert('仅支持拖拽文件')
    return
  }

  if (files.length !== 1) {
    alert('仅支持上传单个文件')
    return
  }
  doms.selectFile.files = files
  // 👆赋值的做法：无法触发onchange事件，需要手动触发
  changeHandler()
  doms.select.classList.remove('draging')
}

// 点击按钮，弹出文件选择框
doms.select.onclick = function () {
  doms.selectFile.click()
}

function changeHandler() {
  if (this.files.length === 0) {
    return
  }
  const file = this.files[0]
  if (!validateFile(file)) {
    return
  }
  // 切换界面
  showArea('progress')
  // 显示预览图
  const reader = new FileReader()

  reader.onload = e => {
    doms.img.src = e.target.result
  }
  // 读取文件的二进制数据得到url
  reader.readAsDataURL(file)
  // 上传
  cancelUpload = upload(
    file,
    function (val) {
      // 进度变换了
      setProgress(val)
    },
    function (resp) {
      showArea('result')
    }
  )
}
// 文件变化onchange事件
doms.selectFile.onchange = changeHandler
