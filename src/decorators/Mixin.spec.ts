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

  it('should be preserver inheritance', () => {
    const [fatherMethod, testAnother] = [jest.fn(), jest.fn()]
    class Father {
      method() {
        fatherMethod()
      }
    }

    @Mixin()
    class Test extends Father {
      another() {
        testAnother()
      }
    }
    
    new Test().method()
    new Test().another()

    expect(fatherMethod).toHaveBeenCalled()
    expect(testAnother).toHaveBeenCalled()
  })
})