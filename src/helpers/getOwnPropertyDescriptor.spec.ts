import { getOwnPropertyDescriptor } from "./getOwnPropertyDescriptor"

describe('getOwnPropertyDescriptor', () => {
  it('should be get property descriptor of object', () => {
    const object = { test: true }
    Object.defineProperty(object, 'test', {
      writable: false,
      configurable: false,
      enumerable: true,
    })
    expect(getOwnPropertyDescriptor(object, 'test')).toEqual(
      expect.objectContaining({
        writable: false,
        configurable: false,
        enumerable: true,
      })
    )
  })
  it('should be get property descriptor from object without described property', () => {
    const object = {}
    expect(getOwnPropertyDescriptor(object, 'void')).toStrictEqual({})
  })
})