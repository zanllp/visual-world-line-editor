import { Scene } from '@/model/scene'
import { customPropType, Pos, useRequireCallback } from '@/util'
import { debounce } from 'lodash'
import { defineComponent, reactive, ref } from 'vue'
import './index.scss'

export const Node = defineComponent({
  props: {
    onChange: customPropType<(pos: Pos) => void>(false),
    onClick: customPropType<HTMLDivElement['onclick']>(false)
  },
  setup (props) {
    const { onChange, onClick } = useRequireCallback(props)
    const pos = reactive({ x: 0, y: 0 })
    const count = ref(new Scene(''))
    const onDrag = (e: DragEvent) => {
      const { x, y } = e
      pos.x = x
      pos.y = y
      onChange({ x, y })
    }
    const drageEnd = debounce((e: DragEvent) => {
      const { x, y } = e
      pos.x = x
      pos.y = y
      onChange({ x, y })
    }, 16)
    return () => (
      <div
        class="scene"
        draggable
        onClick={onClick!}
        onDrag={onDrag}
        onDragend={drageEnd}
        style={{ top: pos.y + 'px', left: pos.x + 'px' }}
      >
        {count.value.id}
      </div>
    )
  }
})
