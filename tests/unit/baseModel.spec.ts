/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-new */
import { BaseModel } from '@/model/baseModel'
import { Controller } from '@/model/controller'
import { Scene } from '@/model/scene'

describe('controller', () => {
  it('test', () => {
    const scene0 = new Scene('0')
    const scene1 = new Scene('1')
    const scene2 = new Scene('2')
    scene0.next = scene1
    scene1.next = new Controller().define(() => scene2)
    let currScene: Scene| null = scene0
    expect(currScene.name).toBe('0')
    currScene = currScene.nextScene()
    expect(currScene).toBeTruthy()
    expect(currScene!.name).toBe('1')
    currScene = currScene!.nextScene()
    expect(currScene).toBeTruthy()
    expect(currScene?.name).toBe('2')
    currScene = currScene!.nextScene()
    expect(currScene).toBeNull()
  })
})
