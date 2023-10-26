// 创建map对象
// dom -> 回调函数之间的映射关系
const map = new WeakMap()

// 监听元素尺寸变化, 运行对应的回调函数
// https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver
const ob = new ResizeObserver(entries => {
  for (const entry of entries) {
    // 运行 entry.target 对应的回调函数
    const handler = map.get(entry.target)
    if (handler) {
      handler({
        width: entry.borderBoxSize[0].inlineSize,
        height: entry.borderBoxSize[0].blockSize
      })
    }
  }
})

export default {
  mounted (el, binding) {
    // dom -> 回调函数之间的映射关系
    map.set(el, binding.value)
    // 监听el元素尺寸的变化
    ob.observe(el)
  },
  unmounted (el) {
    // 取消元素监听
    ob.unobserve(el)
  }
}
