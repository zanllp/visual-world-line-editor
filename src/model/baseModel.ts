export class BaseModel {
    public readonly id: number
    constructor (
    ) {
      this.id = ++BaseModel.incrId
    }

    static incrId = 0
}
