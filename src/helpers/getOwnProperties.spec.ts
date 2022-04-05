import { getOwnProperties } from "./getOwnProperties"

describe('getOwnProperties', () => {
  it('should be get all properties in object', () => {
    for (const property of getOwnProperties({ test: true, [Symbol.for('test')]: true }))
      expect(['test', Symbol.for('test')]).toContain(property)
  })
})