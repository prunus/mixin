import { Mixin } from "../decorators/Mixin"
import { includes } from "./includes"

describe('includes', () => {
  it('should be confirm if class has trait', () => {
    class Trait {}

    @Mixin(Trait)
    class Test {}

    expect(includes(Test, Trait)).toBe(true)
  })

  it('should be confirm if mixin instance has trait', () => {
    class Trait {
      method() {}
    }

    @Mixin(Trait)
    class Test {}

    const instance = new Test()
    expect(includes(instance, Trait)).toBe(true)
  })
})