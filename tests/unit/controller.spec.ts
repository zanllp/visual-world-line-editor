/* eslint-disable no-new */
import { BaseModel } from '@/model/baseModel'
import { Controller } from '@/model/controller'
import { Scene } from '@/model/scene'

describe('baseModel', () => {
  it('id自增', () => {
    new Controller()
    expect(BaseModel.incrId).toBe(1)
    new Scene('')
    const controller = new Controller()
    expect(BaseModel.incrId).toBe(3)
    expect(BaseModel.incrId).toBe(controller.id)
  })
})
