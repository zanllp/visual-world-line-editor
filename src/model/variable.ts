
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
      Variable.InstNumberVariablePool.push(this as unknown as Variable<number>)
    }
  }

  static InstNumberVariablePool = new Array<Variable<number>>()
}
