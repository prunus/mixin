import { mixin } from "./mixin"

describe('mixin', () => {
  it('should be create mixin from a class function', () => {
    const method = jest.fn()
    class Trait {
      method() {
        method()
      }
    }
    const Class = mixin(function(this: Class) {
      return this
    })(Trait)
    interface Class extends Trait {}
    new Class().method()
    expect(method).toHaveBeenCalled()
  })
})