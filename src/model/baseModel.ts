export class BaseModel {
  public id: number;
  constructor (
  ) {
    this.id = ++BaseModel.incrId
  }

  static incrId = 0
}
