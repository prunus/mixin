import { MixinDesign } from "./MixinDesign"
import { MixinTrait } from "./MixinTrait"

describe('MixinDesign', () => {
  it('should be get mixin design from undesign mixin class', () => {
    expect(MixinDesign.instance(class Test {})).toBeDefined()
  })

  it('should be get mixin design from design mixin class', () => {
    class Test {}
    MixinDesign.instance(Test)
    expect(MixinDesign.instance(Test)).toBeDefined()
  })

  it('should not get mixin design from design mixin class instance', () => {
    class Test {}
    MixinDesign.instance(Test)
    expect(MixinDesign.instance(new Test())).toBeDefined()
  })

  it('should throw an error when trying to get the mixin of an instance outside the design', () => {
    class Test {}
    expect(() => MixinDesign.instance(new Test())).toThrowError()
  })

  it('should throw an error when trying to get mixin of any type other than mapped ones', () => {
    for (const type of [undefined, null, 0, 'string', true])
      expect(() => {
        // @ts-expect-error: all test values do not conform to definitions
        MixinDesign.instance(type)
      }).toThrowError()
  })

  it('should construct all traits in mixin class on new instance', () => {
    const constructorTrait1 = jest.fn()
    const constructorTrait2 = jest.fn()
    const constructorTest = jest.fn()
    class Trait1 {
      constructor() {
        constructorTrait1()
      }
    }
    class Trait2 {
      constructor() {
        constructorTrait2()
      }
    }
    class Test {
      constructor() {
        constructorTest()
      }
    }
    MixinDesign.instance(Test).use(Trait1, Trait2)
    expect(MixinDesign.instance(Test).construct({})).toBeDefined()
    expect(constructorTrait1).toHaveBeenCalled()
    expect(constructorTrait2).toHaveBeenCalled()
    expect(constructorTest).toHaveBeenCalled()
  })

  it('should be use traits properties in mixin class', () => {
    const traitMethod = jest.fn()
    class Trait1 {
      traitProperty = true
    }
    class Trait2 {
      private _traitMethodMock = traitMethod
      traitMethod() {
        this._traitMethodMock()
      }
    }
    class Test {}
    interface Test extends Trait1, Trait2 {}
    MixinDesign.instance(Test).use(Trait1, Trait2)
    const instance = MixinDesign.instance(Test).construct({}) as Test
    expect(instance.traitProperty).toBe(true)
    instance.traitMethod()
    expect(traitMethod).toHaveBeenCalled()
  })

  it('should be override trait property in mixin instance', () => {
    const traitMethod = jest.fn()
    const testMethod = jest.fn()
    class Trait {
      method() { traitMethod() }
    }
    class Test {
      method() {
        testMethod()
      }
    }
    interface Test extends Trait {}
    MixinDesign.instance(Test).use(Trait)
    const intance = MixinDesign.instance(Test).construct({}) as Test
    intance.method()
    expect(testMethod).toHaveBeenCalled()
    expect(traitMethod).not.toHaveBeenCalled()
  })

  it('should be throw error on use trait without self dependecy', () => {
    class Trait1 {}
    class Trait2 {}
    class Test {}
    MixinTrait.instance(Trait2).registerDependency(Trait1)
    expect(() => MixinDesign.instance(Test).use(Trait2)).toThrowError()
  })

  it('should be contain the overwritten property in its super', () => {
    const traitMethod = jest.fn()
    const testMethod = jest.fn()
    class Trait {
      method() {
        traitMethod()
      }
    }
    class Test {
      method() {
        this.super.method()
        testMethod()
      }
    }
    interface Test extends Trait {
      super: Omit<this, 'super'>
    }
    const instance = MixinDesign
      .instance(Test)
      .use(Trait)
      .construct({}) as Test
    instance.method()
    expect(testMethod).toHaveBeenCalled()
    expect(traitMethod).toHaveBeenCalled()
  })

  it('should be contain the overwritten property getter/setter in its super', () => {
    const [traitGet, traitSet, testGet, testSet] = [jest.fn(), jest.fn(), jest.fn(), jest.fn()]
    class Trait {
      private _property = true
      get property() {
        traitGet()
        return this._property
      }
      set property(value) {
        traitSet()
        this._property = value
      }
    }
    class Test {
      get property(): boolean {
        testGet()
        return this.super.property
      }
      set property(value) {
        testSet()
        this.super.property = value
      }
    }
    interface Test extends Trait {
      super: this
    }
    const instance = MixinDesign
      .instance(Test)
      .use(Trait)
      .construct({}) as Test
    expect(instance.property).toBe(true)
    expect(traitGet).toHaveBeenCalled()
    expect(testGet).toHaveBeenCalled()
    instance.property = false
    expect(traitSet).toHaveBeenCalled()
    expect(testSet).toHaveBeenCalled()
    expect(instance.property).toBe(false)
  })

  it('should be contain the overwritten property described in its super', () => {
    const [get, set] = [jest.fn(), jest.fn()]
    class Trait {
      readonly property!: boolean
    }
    Object.defineProperty(Trait.prototype, 'property', { value: true, writable: false })

    class Test {
      get property(): boolean {
        get()
        return this.super.property
      }
      set property(value) {
        set()
        this.super.property = value
      }
    }

    interface Test extends Trait {
      super: this
    }

    const instance = MixinDesign
      .instance(Test)
      .use(Trait)
      .construct({}) as Test

    expect(instance.property).toBe(true)
    expect(get).toHaveBeenCalled()
    expect(() => { instance.property = false }).toThrowError()
    expect(set).toHaveBeenCalled()
  })

  it('should be throw error on cast instance of design in anothers types', () => {
    for (const type of [null, undefined, {}, true, 1, 'string'])
      // @ts-expect-error: I know typescript, it's a test man.
      expect(() => MixinDesign.instance(type)).toThrowError()
  })
})