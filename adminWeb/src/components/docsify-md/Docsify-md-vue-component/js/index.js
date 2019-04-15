// 获取到 textarea，并初始化赋值

let textarea = document.getElementById('textarea')

textarea.value = '### 请输入'

Docsify.againInit(textarea.value)

textarea.onchange = function (ev) {
  console.log('触发', textarea.value)
  Docsify.againInit(textarea.value)
}

// ----------------

// 点击事件
let saveButtom = document.getElementById('save')
saveButtom.onclick = function () {
  console.log('触发保存数据是', textarea.value)
}