const inp = document.querySelector('input');

inp.onchange = function() {
  const file = inp.files[0]
  console.log(file)
  const reader = new FileReader();
  // 异步操作：传入数据对象，返回一个data:URL 格式的字符串（base64 编码）以表示所读取文件的内容
  reader.readAsDataURL(file)

  // 文件读取完成
  reader.onload = e => {
    console.log(e.target.result)
    preview.src = e.target.result
  }
}