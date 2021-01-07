import { useRequireCallback } from '@/util'

describe('useRequireCallback', () => {
  type Fn = () => void
  const props: {
    onTest0: () => number;
    onTest1: (a: number) => number;
    onTest2?: Fn;
    onTest3?: Fn;
    test4?: Fn;
  } = {
    onTest0: () => 1,
    onTest1: (a: number) => a + 1
  }
  const { onTest0, onTest1, onTest2, onTest3, test4 } = useRequireCallback(
    props
  )
  it('返回正确的函数', () => {
    expect(onTest0()).toBe(1)
    expect(onTest1(2)).toBe(1 + 2)
  })
  it('未定义的返回noop', () => {
    expect(onTest2()).toBe(undefined)
  })
  it('未定义的返回同一个noop', () => {
    expect(onTest2).toBe(onTest3)
  })
  it('不是on开头的不处理', () => {
    expect(test4).toBe(undefined)
  })
})
