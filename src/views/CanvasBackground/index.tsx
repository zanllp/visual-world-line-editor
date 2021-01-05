import { defineComponent, reactive, ref, watch, watchEffect } from 'vue'
import { Node } from '@/views/Node'
import { Pos } from '@/util'

const useNodeLink = () => {
  const waitLinkId = ref<number | null>(null)
  const nodeSet = reactive(
    Array.from({ length: 5 }).map(() => ({
      pos: { x: 0, y: 0 },
      next: new Set<number>()
    }))
  )
  const onNodeClick = (e: MouseEvent, idx: number) => {
    if (!e.shiftKey) {
      return
    }
    const startId = waitLinkId.value
    if (startId) {
      nodeSet[startId].next.add(idx)
      console.log(nodeSet)
      waitLinkId.value = null
    } else {
      waitLinkId.value = idx
    }
  }
  return {
    onNodeClick,
    nodeSet
  }
}

const useCanvasFresh = (nodeSet: Array<{ pos: Pos; next: Set<number> }>) => {
  const canvsaRect = reactive({ width: 0, height: 0 })
  const canvasRef = ref<HTMLCanvasElement>()
  watch(canvasRef, ref => {
    if (!ref) {
      return
    }
    const rect = ref.getBoundingClientRect()
    canvsaRect.height = rect.height
    canvsaRect.width = rect.width
  })
  watchEffect(() => {
    const canvas = canvasRef.value
    if (nodeSet.length && !canvas) {
      return
    }
    const ctx = canvas!.getContext('2d')!
    console.log(canvsaRect)
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    console.log(nodeSet
      .reduce<Array<{ start: Pos; end: Pos }>>((p, c) => {
        return [
          ...p,
          ...Array.from(c.next).map(end => ({
            start: c.pos,
            end: nodeSet[end].pos
          }))
        ]
      }, []))
    nodeSet
      .reduce<Array<{ start: Pos; end: Pos }>>((p, c) => {
        return [
          ...p,
          ...Array.from(c.next).map(end => ({
            start: c.pos,
            end: nodeSet[end].pos
          }))
        ]
      }, [])
      .forEach(({ start, end }) => {
        ctx.beginPath()
        ctx.moveTo(start.x, start.y)
        ctx.lineTo(end.x, end.y)
        ctx.stroke()
      })
  })
  return {
    canvsaRect,
    canvasRef
  }
}

export const CanvasBackground = defineComponent({
  setup () {
    const { onNodeClick, nodeSet } = useNodeLink()
    const { canvsaRect, canvasRef } = useCanvasFresh(nodeSet)
    return () => (
      <div>
        <canvas
          ref={canvasRef}
          height={canvsaRect.height.toString()}
          width={canvsaRect.width.toString()}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        ></canvas>
        {nodeSet.map((_, i) => (
          <Node
            onChange={pos => (nodeSet[i].pos = pos)}
            onClick={e => onNodeClick(e, i)}
          />
        ))}
      </div>
    )
  }
})
