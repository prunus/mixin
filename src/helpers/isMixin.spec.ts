import { Mixin } from "../decorators/Mixin"
import { isMixin } from "./isMixin"

describe('isMixin', () => {
  it('should be return true', () => {
    @Mixin()
    class Test {}

    expect(isMixin(Test)).toBe(true)
  })

  it('should be return false', () => {
    class Test {}

    expect(isMixin(Test)).toBe(false)
  })

  it('should be return true for instance', () => {
    @Mixin()
    class Test {}
    expect(isMixin(new Test())).toBe(true)
  })

  it('should be return false for instance', () => {
    class Test {}

    expect(isMixin(new Test())).toBe(false)
  })

  it('should be return false for not mapped values', () => {
    for (const value of [10, false, 'string', null, undefined, {}])
      // @ts-expect-error: I know typescript, it's a test man.
      expect(isMixin(value)).toBe(false)
  })
})