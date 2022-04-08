import { Mixin } from "../decorators/Mixin"
import { trait } from "./trait"

describe('trait', () => {
  it('should be create trait with dependencies', () => {
    class TraitDep {}
    const Trait = trait(class Trait {})(TraitDep)
    type Trait = InstanceType<typeof Trait>

    expect(() => {
      @Mixin(Trait)
      class Class {}
      interface Class extends Trait {}
    }).toThrowError()
  })
})