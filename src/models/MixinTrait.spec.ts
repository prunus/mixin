import { AnyObject } from "../helpers/types"
import { MixinTrait } from "./MixinTrait"

describe('MixinTrait', () => {
  it('should be create an instance of trait when trying to access by a class', () => {
    expect(MixinTrait.instance(class Test {})).toBeDefined()
  })

  it('should throw an error when trying to get a trait of any type other than the ones mapped', () => {
    for (const type of [undefined, null, 0, 'string', true, {}])
      expect(() => {
        // @ts-expect-error: all test values do not conform to definitions
        MixinTrait.instance(type)
      }).toThrowError()
  })

  it('should be get prototype properties from trait target', () => {
    class Test {
      foo() {}
    }
    expect(MixinTrait.instance(Test).getOwnProperties()).toContain('foo')
  })

  it('should be get prototype descriptors from trait target', () => {
    class Test {
      foo() {}
    }
    expect(MixinTrait.instance(Test).getOwnPropertyDescriptors()).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([])
      ])
    )
  })

  it('should be apply target constructor to some context', () => {
    const context = {}
    class Test {
      property: boolean
      constructor() {
        this.property = true
      }
    }
    MixinTrait.instance(Test).construct(context)
    expect(context).toEqual(
      expect.objectContaining({ property: true })
    )
  })

  it('should be declare trait dependencies', () => {
    class Trait1 {}
    class Trait2 {}
    class Trait3 {}
    class Test {}
    MixinTrait.instance(Test).registerDependency(Trait1, Trait2, Trait3)
    expect(
      MixinTrait.instance(Test).getDependencies()
    ).toEqual(
      expect.arrayContaining([
        MixinTrait.instance(Trait1),
        MixinTrait.instance(Trait2),
        MixinTrait.instance(Trait3),
      ])
    )
  })

  it('should be return trait instance from instance F', () => {
    class Test {}
    expect(MixinTrait.instance(MixinTrait.instance(Test))).toBe(MixinTrait.instance(Test))
  })
})