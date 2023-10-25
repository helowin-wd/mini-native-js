/**
 * 动画的本质就是数字的变化，如宽高、位置、颜色RGBA的变化
 *
 * 一段时间内，数字的变化
 * @param {*} duration 毫秒
 * @param {*} from
 * @param {*} to
 */
function animation(duration, from, to, callback) {
  // 速度 = 总距离/总时间
  const speed = (to - from) / duration
  // 时间 = 当前时间 - 起始时间
  const startTime = Date.now()
  // 起点
  let value = from
  function _run() {
    /**
     * 让value发生变化: 采用速度*时间
     * 起点 + 速度*时间
     */
    const now = Date.now()
    const time = now - startTime

    // 运动时间结束了
    if (time >= duration) {
      value = to
      callback && callback(value)
      return
    }

    value = from + speed * time
    callback && callback(value)
    // 注册下一次的变化
    window.requestAnimationFrame(_run)
  }
  _run()
}
