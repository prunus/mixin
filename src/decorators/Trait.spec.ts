import { Mixin } from "./Mixin"
import { Trait } from "./Trait"

describe('Trait', () => {
  it('should be throw error on missing trait dependency', () => {
    const [traitDep, test] = [jest.fn(), jest.fn()]
    class TraitDep {
      constructor() {
        traitDep()
      }
    }
    @Trait(TraitDep)
    class SuperTrait {

    }
    expect(() => {
      @Mixin(SuperTrait)
      class Test {
        constructor() {
          test()
        }
      }
      interface Test extends SuperTrait {}
    }).toThrowError()
  })
})
