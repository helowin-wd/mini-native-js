<template>
  <div class='watermark-container' ref='parentRef'>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps, onUnmounted } from 'vue'
import useWatermarkBg from './useWatermarkBg'

const props = defineProps({
  text: {
    type: String,
    required: true,
    default: 'watermark'
  },
  fontSize: {
    type: Number,
    default: 40
  },
  gap: {
    type: Number,
    default: 20
  }
})

const bg = useWatermarkBg(props)
// 在原生DOM上定义ref
const parentRef = ref<HTMLDivElement>()
// 全局变量
let div: HTMLDivElement

// 重置水印背景大小
function resetWaterMark () {
  // 父元素还没加载出来
  if (!parentRef.value) {
    return
  }

  /**
   * 逻辑：该 resetWaterMark函数 会反复调用

   * 若用户在控制台手动删除生成的div元素，重新调用resetWaterMark函数，重新生成
   * 由于需要反复调用，就需要保证，如果之前有这个水印元素需要remove，然后重新生成
   */
  if (div) {
    // 之前有这个水印元素需要remove
    div.remove()
  }

  const { base64, size } = bg.value
  // 重新生成
  div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.backgroundImage = `url(${base64})`
  div.style.backgroundSize = `${size}px ${size}px`
  div.style.backgroundRepeat = 'repeat'
  div.style.zIndex = '9999'
  div.style.inset = '0'

  parentRef.value.appendChild(div)
}

onMounted(resetWaterMark)

// 防篡改
const ob = new MutationObserver((entries) => {
  for (const entry of entries) {
    // 删除行为
    for (const dom of entry.removedNodes) {
      // 删除水印元素，重写创建水印
      if (dom === div) {
        resetWaterMark()
      }
    }
    // 修改行为
    if (entry.target === div) {
      // 修改水印元素，重写创建水印
      resetWaterMark()
      return
    }
  }
})

onMounted(() => {
  /**
   * childList  监控子节点
   * subtree    监控子树（也就是子节点的子节点）
   * attributes 监控属性的变化
   */
  ob.observe(parentRef.value as HTMLDivElement, {
    childList: true,
    subtree: true,
    attributes: true
  })
})

onUnmounted(() => {
  // 取消监控
  ob.disconnect()
})

</script>

<style scoped>
.watermark-container {
  position: relative;
}
</style>
