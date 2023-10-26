const btn = document.querySelector('.btn')

btn.onclick = () => {
  const taskHandler = (_, i) => {
    const div = document.createElement('div')
    div.textContent = i
    document.body.appendChild(div)
  }

  // 调度器
  browserPerformChunk(100000, taskHandler)
}

/**
 * 典型高阶函数的封装 🔥
 * https://www.bilibili.com/video/BV1qK4y1c7q1/?spm_id_from=333.337.search-card.all.click&vd_source=ebd9d00d7620dc2773735ca3b6ad0ae8
 *
 * 分块函数
 *
 * 优化点：把任务分段执行，好处在于虽然任务的总时长还增加了，但用户是感觉不到卡顿的
 * 因为任务之间留有空间用于渲染
 *
 * 浏览器的执行是纳秒级的，1秒可以做很多事儿了
 *
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
 * https://developer.mozilla.org/zh-CN/docs/Web/API/IdleDeadline/timeRemaining
 *
 * @param {*} datas
 */
function performChunk(datas, taskHandler, scheduler) {
  // 参数归一化
  if (typeof datas === 'number') {
    datas = { length: datas }
  }

  if (datas.length === 0) return
  let i = 0
  // 执行下一块任务
  function _run() {
    if (i >= datas.length) return
    // requestIdleCallback()方法插入一个函数，这个函数将在浏览器空闲时期被调用
    scheduler(isGoon => {
      /**
       * timeRemaining这一帧剩余多少毫秒
       * 渲染还有剩余剩余时间并且还是任务待处理
       */
      while (isGoon() && i < datas.length) {
        // 执行一个任务
        taskHandler && taskHandler(datas[i], i)
        i++
      }
      _run() // 执行下一个分块
    })
  }
  _run()
}

function browserPerformChunk(datas, taskHandler) {
  // 调度器：决定了分块之间的间隔
  const scheduler = task => {
    requestIdleCallback(idle => {
      task(() => idle.timeRemaining() > 0)
    })
    // 也可以自定义间隔时间（有一定卡顿）
    // setTimeout(() => {
    //   const start = Date.now();
    //   task(() => Date.now() - start < 50); // 判断时间是否到达50毫秒，到达50毫秒后任务结束，等待下一个任务
    // }, 100);
  }
  performChunk(datas, taskHandler, scheduler)
}
