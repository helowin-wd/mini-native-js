// 使用canvas生成水印图片
import { computed } from 'vue'

export default function useWatermarkBg (props: { fontSize: number, text: string, gap: number }) {
  return computed(() => {
    const canvas = document.createElement('canvas')
    const devicePixelRatio = window.devicePixelRatio || 1
    const fontSize = props.fontSize * devicePixelRatio
    const font = fontSize + 'px serif'
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    // 获取文字高度
    ctx.font = font
    const { width } = ctx.measureText(props.text)
    const canvasSize = Math.max(100, width) + props.gap * devicePixelRatio
    canvas.width = canvasSize
    canvas.height = canvasSize

    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((Math.PI / 180) * -45)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.font = font
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(props.text, 0, 0)
    return {
      base64: canvas.toDataURL(),
      size: canvasSize / devicePixelRatio
    }
  })
}
