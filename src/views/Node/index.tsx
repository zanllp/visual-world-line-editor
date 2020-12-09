import { debounce } from 'lodash'
import { defineComponent, reactive, ref } from 'vue'
import './index.scss'

export const Node = defineComponent({
  setup () {
    const pos = reactive({ x: 0, y: 0 })
    const count = ref(0)
    const onDrag = (e: DragEvent) => {
      const { x, y } = e
      pos.x = x
      pos.y = y
    }
    const drageEnd = debounce((e: DragEvent) => {
      const { x, y } = e
      pos.x = x
      pos.y = y
    }, 16)
    return () => (
      <div
        class="scene"
        draggable
        onDrag={onDrag}
        onDragend={drageEnd}
        onClick={() => count.value++}
        style={{ top: pos.y + 'px', left: pos.x + 'px' }}
      >
        {count.value}
      </div>
    )
  }
})
