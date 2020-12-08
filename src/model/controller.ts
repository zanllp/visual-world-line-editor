import { BaseModel } from './baseModel'
import { Scene } from './scene'
import { Variable } from './variable'
export type RuleFn = (curr: Scene, vars: Array<Variable<number>>) => Scene | null
/**
 * 控制器，承担类似路由的角色
 * 根据当前的变量路由到下一个scene
 */
export class Controller extends BaseModel {
  rule = new Array<RuleFn>()

  public define (ruleFn: RuleFn) {
    this.rule.push(ruleFn)
    return this
  }

  public next (curr: Scene) {
    const { InstNumberVariablePool } = Variable
    return this.rule
      .map(r => r(curr, InstNumberVariablePool))
      .filter(scene => scene) as Scene[]
  }
}
