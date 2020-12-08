import { BaseModel } from './baseModel'

export class Sentence extends BaseModel {
  constructor (
    public content: string,
    public image?: string
  ) {
    super()
  }
}
