import { Mixed } from "../Mixed";

describe('Mixed', () => {
  it('should extend a property of your trait', () => {
    class Trait {
      property = 'some trait property'
    }

    class Test extends Mixed(Trait) {}

    expect(new Test().property).toBe('some trait property')
  })

  it('should extend a method of your trait', () => {
    const [method] = [jest.fn()]

    class Trait {
      method() { method() }
    }
  
    class Test extends Mixed(Trait) {}

    new Test().method()

    expect(method).toHaveBeenCalled()
  })

  it('should override a property of your trait', () => {
    class Trait {
      property = 'some trait property'
    }

    class Test extends Mixed(Trait) {
      override property: string = 'overwriting successfully'
    }

    expect(new Test().property).toBe('overwriting successfully')
  })

  it('should override your trait method', () => {
    const [traitMethod, method] = [jest.fn(), jest.fn()]

    class Trait { method() { traitMethod() } }
  
    class Test extends Mixed(Trait) {
      override method(): void {
        method()
      }
    }

    new Test().method()

    expect(method).toHaveBeenCalled()
    expect(traitMethod).not.toHaveBeenCalled()
  })

  it('should be able to call your super with your trait method', () => {
    const [trait] = [jest.fn()]
    class Trait { method() { trait() } }
  
    class Test extends Mixed(Trait) {
      override method(): void {
        super.method()
      }
    }

    new Test().method()
    expect(trait).toHaveBeenCalled()
  })

  it('should inherit the static properties of your trait', () => {
    class Trait {
      static property = 'some static property'
    }

    class Test extends Mixed(Trait) {}

    expect(Test.property).toEqual('some static property')
  })

  it('should inherit static methods from your trait', () => {
    const [method] = [jest.fn()]

    class Trait {
      static method() { method() }
    }
  
    class Test extends Mixed(Trait) {}

    Test.method()
    expect(method).toHaveBeenCalled()
  })

  describe('should be able to be an instance of multiple traits attached to it', () => {
    class Trait1 {}
    class Trait2 {}
    class Trait3 {}
    class Test extends Mixed(Trait1, Trait2, Trait3) {}

    it.each([Trait1, Trait2, Trait3])('should be able to be an instance of the %p', (trait) => {
      expect(new Test()).toBeInstanceOf(trait)
    })
  })

  it('should be an instance of its own constructor', () => {
    class Trait {}
    class Test extends Mixed(Trait) {}

    expect(new Test()).toBeInstanceOf(Test)
  })

  it('should be an instance of your trait', () => {
    class Trait {}
    class Test extends Mixed(Trait) {}

    expect(new Test()).toBeInstanceOf(Trait)
  })

  it('it should be an instance of your trait even after setting the `Symbol.hasInstance`', () => {
    class Trait {}
    class Test extends Mixed(Trait) {}
    class JustAUselessClass extends Mixed(Test) {}

    expect(new Test()).toBeInstanceOf(Trait)
  })

  it('should be an instance of its own constructor even after defining `Symbol.hasInstance`', () => {
    class Trait {}
    class Test extends Mixed(Trait) {}
    class JustAUselessClass extends Mixed(Test) {}

    const instance = new Test()
    expect(instance).toBeInstanceOf(Test)
  })

  it('should be a trait instance of your trait', () => {
    class Trait {}
    class IntermediateTrait extends Mixed(Trait) {}
    class Test extends Mixed(IntermediateTrait) {}

    expect(new Test()).toBeInstanceOf(Trait)
  })

  describe('should be able to be an instance of yourself and other mixins and their traits at multiple levels', () => {
    class Trait1 {}
    class Trait2 {}
    class Trait3 {}
    class Trait4 {}
    class Trait5 {}
    class Trait6 {}
    class Trait7 {}
    class Trait8 {}
    class Trait9 {}
    class Trait10 {}

    class MiddleClass1 extends Mixed(Trait1, Trait2) {}
    class MiddleClass2 extends Mixed(MiddleClass1, Trait3, Trait4) {}
    class MiddleClass3 extends Mixed(MiddleClass2, Trait5, Trait6) {}
    class MiddleClass4 extends Mixed(MiddleClass3, Trait7, Trait8) {}

    class Test extends Mixed(MiddleClass4, Trait9, Trait10) {}

    describe.each([
      [Trait1, [Trait1]],
      [Trait2, [Trait2]],
      [MiddleClass1, [Trait1, Trait2, MiddleClass1]],
      [MiddleClass2, [Trait1, Trait2, MiddleClass1, Trait3, Trait4, MiddleClass2]],
      [MiddleClass3, [Trait1, Trait2, MiddleClass1, Trait3, Trait4, MiddleClass2, Trait5, Trait6, MiddleClass3]],
      [MiddleClass4, [Trait1, Trait2, MiddleClass1, Trait3, Trait4, MiddleClass2, Trait5, Trait6, MiddleClass3, Trait7, Trait8, MiddleClass4]],
      [Test, [Trait1, Trait2, MiddleClass1, Trait3, Trait4, MiddleClass2, Trait5, Trait6, MiddleClass3, Trait7, Trait8, MiddleClass4, Trait9, Trait10, Test]]
    ])('an instance of %p', (constructor, mustBeInstance) => {
      it.each(mustBeInstance)('should be an instance of %p', (expected) => {
        expect(new constructor()).toBeInstanceOf(expected)
      })
      const mustNotBeAnInstance = [Trait1, Trait2, MiddleClass1, Trait3, Trait4, MiddleClass2, Trait5, Trait6, MiddleClass3, Trait7, Trait8, MiddleClass4, Trait9, Trait10, Test]
        .filter(mustNotBeAnInstance => !mustBeInstance.includes(mustNotBeAnInstance))
      if (mustNotBeAnInstance.length)
        it.each(mustNotBeAnInstance)('shouldn\'t be an instance %p', expected => {
          expect(new constructor()).not.toBeInstanceOf(expected)
        })
    })
  })

  it('should share a trait with multiple mixins', () => {
    class Trait {}
    class TestA extends Mixed(Trait) {}
    class TestB extends Mixed(Trait) {}
  
    expect(new TestA).toBeInstanceOf(Trait)
    expect(new TestB).toBeInstanceOf(Trait)
  })

  it('should inherit from your trait\'s trait', () => {
    const fn = jest.fn()
    class Trait {
      method() {
        fn()
      }
    }
    class IntermediateTrait extends Mixed(Trait) {}
    class Test extends Mixed(IntermediateTrait) {}

    new Test().method()
    expect(fn).toHaveBeenCalled()
  })

  it('should inherit from its trait its prototype methods and statics', () => {
    const [t1, t2, ts1, test] = [jest.fn(), jest.fn(), jest.fn(), jest.fn()]
    class Trait1 {
      static t1() { ts1() }
      t1() { t1() }
    }
  
    class Trait2 {
      t2() { t2() }
    }
  
    class Test extends Mixed(Trait1, Trait2) {
      test() { test() }
    }
  
    const instance = new Test()
  
    Test.t1()
    instance.t1()
    instance.t2()
    instance.test()
  
    expect(ts1).toHaveBeenCalled()
    expect(t1).toHaveBeenCalled()
    expect(t2).toHaveBeenCalled()
    expect(test).toHaveBeenCalled()
  })

  it('should emerge a description with that of your trait', () => {
    class Trait1 {
      protected _text: string = 'some trait 1 text'
  
      public get text() {
        return this._text
      }
      public set text(text) {
        this._text = text
      }
    }
  
    class Trait2 {
      protected _text!: string
  
      public get text() {
        return `Trait2 text: ${this._text}`
      }
    }
  
    class Test extends Mixed(Trait1, Trait2) {}
  
    const instance = new Test()
    expect(instance.text).toBe('Trait2 text: some trait 1 text')
    instance.text = 'some test text'
    expect(instance.text).toBe('Trait2 text: some test text')
  })

  it('should inherit prototype from your trait\'s inheritance', () => {
    class SomeClass {}
    class Trait extends SomeClass {}
    class Test extends Mixed(Trait) {}
  
    expect(new Test()).toBeInstanceOf(SomeClass)
  })

  it.only('t', () => {
    const [trait1Setup, trait2Setup, testSetup] = [jest.fn(), jest.fn(), jest.fn()]
    class Trait1 {
      protected setup() {
        trait1Setup()
      }
    }
    class Trait2 {
      protected setup() {
        trait2Setup()
      }
    }
    class Test extends Mixed(Trait1, Trait2) {
      public setup(): void {
        this.forEachSuper(self => {
          self.setup()
        })
        testSetup()
      }
    }

    const test = new Test()

    test.setup()

    expect(trait1Setup).toHaveBeenCalled()
    expect(trait2Setup).toHaveBeenCalled()
    expect(testSetup).toHaveBeenCalled()
  })
})
