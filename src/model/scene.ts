import { BaseModel } from './baseModel'
import { Controller } from './controller'
import { Sentence } from './sentence'

export class Scene extends BaseModel {
  children = new Array<Sentence>()
  constructor (
    public name: string,
    public bgm?: string,
    /**
     * 下个场景，
     * next为Scene直接前进
     * next为控制器根据控制器定义的规则进行切换
     * next为空当前时间线结束
     */
    public next: Scene | Controller | null = null
  ) {
    super()
  }

  public nextScene () {
    const { next } = this
    if (!next) {
      return
    }
    if (next instanceof Scene) {
      return next
    }
    const scene = next.next(this)[0]
    return scene || null
  }
}
