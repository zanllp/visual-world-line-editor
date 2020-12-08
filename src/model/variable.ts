
import { BaseModel } from './baseModel'

/**
 * 自顶而下注入的变量
 */
export class Variable<T> extends BaseModel {
  constructor (
    public name: string,
    public val: T
  ) {
    super()
    if (typeof this.val === 'number') {
      Variable.InstNumberVariablePoll.push(this as unknown as Variable<number>)
    }
  }

  static InstNumberVariablePoll = new Array<Variable<number>>()
}
