/**
 * 学习资源
 * https://www.bilibili.com/video/BV1cC4y157nq/?spm_id_from=333.1007.tianma.1-1-1.click&vd_source=ebd9d00d7620dc2773735ca3b6ad0ae8
 */
const container = document.querySelector('.container')

/**
 * ondragstart 拖拽开始 (每次拖拽仅触发一次，获取拖拽的元素 🔥)
 * https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragstart_event
 *
 * 属性指定拖放操作所允许的一个效果
 * https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/effectAllowed
 *
 * @param {*} e 拖拽的元素
 */
let source // 拖拽的元素
container.ondragstart = function (e) {
  e.dataTransfer.effectAllowed = e.target.dataset.effect // 读取自定义属性
  console.log('ondragstart', e.target)
  source = e.target
}

/**
 * ondragover 该事件在放置目标上触发 （每几百毫秒）触发一次 - 因为拖拽过程中会经过很多其他元素
 * https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragover_event
 * @param {*} e 拖拽的元素，目前在哪个元素上
 */
container.ondragover = function (e) {
  e.preventDefault()
}

/**
 * 清除拖拽元素样式
 */
function clearDropStyle() {
  document.querySelectorAll('.drop-over').forEach(node => {
    node.classList.remove('drop-over')
  })
}

// 获取落点
function getDropNode(node) {
  while (node) {
    if (node.dataset && node.dataset.drop) {
      return node
    }
    node = node.parentNode
  }
}

/**
 * ondragenter 进入一个有效的放置目标时触发（每经过一个目标元素，仅触发一次）
 * https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragenter_event
 * @param {*} e 拖拽的元素，目前在哪个元素上
 */
container.ondragenter = function (e) {
  /**
   * 元素移入哪个元素，改变背景颜色
   * ondragenter 事件，不仅在子元素触发，还会在父元素触发
   *
   * 🤔️ 改变哪个元素的背景颜色，取决于当前元素能拖拽到哪个地方 🔥
   *    哪些元素能接受拖拽呢？
   */

  // 清除之前的drop-over
  clearDropStyle()

  const dropNode = getDropNode(e.target)
  if (dropNode && dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
    // 该节点能够接受目前拖拽到节点
    dropNode.classList.add('drop-over')
  }

  console.log('ondragstart', e.target)
}

/**
 * ondrop 放置到有效的放置目标上时触发
 * 为确保 drop 事件始终按预期触发，应当在处理 dragover 事件的代码部分始终包含 preventDefault() 调用
 *
 * https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drop_event
 * @param {*} e 拖拽元素，放手后最终落在哪个元素上
 */
container.ondrop = function (e) {
  // 清除之前的drop-over
  clearDropStyle()

  const dropNode = getDropNode(e.target)
  if (dropNode && dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
    // 该节点能够接受目前拖拽到节点
    if (dropNode.dataset.drop === 'copy') {
      dropNode.innerHTML = '' // 清除之前的元素
      // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode
      const cloned = source.cloneNode(true)

      // 拖回去，改变拖拽的标记
      cloned.dataset.effect = 'move'
      dropNode.appendChild(cloned)
    } else {
      // move
      source.remove() // 去除目前拖拽的节点
    }
  }

  console.log('ondragstart', e.target)
}
