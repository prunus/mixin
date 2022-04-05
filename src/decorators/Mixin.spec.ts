import { Mixin } from "./Mixin"

describe('Mixin', () => {
  it('try decorator', () => {
    const [trait, test] = [jest.fn(), jest.fn()]
    class Trait {
      constructor() {
        trait()
      }
    }
    
    @Mixin(Trait)
    class Test {
      constructor() {
        test()
      }
    }
    interface Test extends Trait {}
    new Test()
    expect(trait).toHaveBeenCalled()
    expect(test).toHaveBeenCalled()
  })
  it('should be preserve class name', () => {
    @Mixin()
    class Test {}
    expect(Test.name).toBe('Test')
  })
})