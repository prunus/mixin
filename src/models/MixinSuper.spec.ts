import { MixinSuper } from "./MixinSuper"
import { MixinTrait } from "./MixinTrait"

describe('MixinSuper', () => {
  it('should be create super with overrides properties', () => {
    const mixinSuper = new MixinSuper()

    class Trait {
      method() {
        return this
      }
    }
    mixinSuper.override('method', MixinTrait.instance(Trait))
    const context = {}
    const sOfSuper = mixinSuper.super(context)
    expect(sOfSuper.method()).toBe(context)
  })

  it('should be create super with override getter property', () => {
    const mixinSuper = new MixinSuper()
    class Trait {
      get property() { return this }
    }
    mixinSuper.override('property', MixinTrait.instance(Trait))
    const context = {}
    const sOfSuper = mixinSuper.super(context)
    expect(sOfSuper.property).toBe(context)
  })

  it('should be create super with override setter property', () => {
    const setter = jest.fn()
    const mixinSuper = new MixinSuper()
    class Trait {
      // @ts-expect-error: I know typescript, it's a test man.
      set property() {
        setter()
      }
    }
    mixinSuper.override('property', MixinTrait.instance(Trait))
    const context = {}
    const sOfSuper = mixinSuper.super(context)
    sOfSuper.property = void 0
    expect(setter).toHaveBeenCalled()
  })
})
