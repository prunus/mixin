import { Manager } from "../Manager"

describe('Manager', () => {
  describe('should return false when checking for an unqualified value type', () => {
    it.each([null, undefined, 0, 'string', 123, Symbol('symbol'), {}])('when trying in %p it should return false', (attempt) => {
      expect(Manager.has(attempt as any)).toBeFalsy()
    })
  })

  describe('should throw an error when getting a manager of an unqualified value type', () => {
    it.each([null, undefined, 0, 'string', 123, Symbol('symbol'), {}])('trying on %p should throw the error', (attempt) => {
      expect(() => Manager.get(attempt as any)).toThrowError()
    })
  })
})
