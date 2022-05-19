import { Mixin } from "./decorators/Mixin";
import { Mixed } from "./Mixed";

describe('Mixed', () => {
  it('must create a mixin by inheritance ', () => {
    const [trait1, trait2, trait3, trait3override, trait4, trait4override] = [jest.fn(), jest.fn(), jest.fn(), jest.fn(), jest.fn(), jest.fn(), jest.fn()]
    class Trait1 {
      trait1() {
        trait1()
      }
    }
    class Trait2 {
      trait2() {
        trait2()
      }
    }

    class Trait3 {
      trait3() {
        trait3()
      }
    }

    class Trait4 {
      trait4() {
        trait4()
      }
    }

    // @Mixin(Trait1, Trait2, Trait3, Trait4)
    class Test extends Mixed(Trait1, Trait2, Trait3, Trait4) {
      trait3(): void {
        trait3override()
      }
      trait4(): void {
        // this.super.trait4()
        super.trait4()
        trait4override()
      }
    }
    interface Test extends Trait1, Trait2, Trait3, Trait4 {
      super: this
    }

    const test = new Test()
    test.trait1()
    test.trait2()
    test.trait3()
    test.trait4()

    expect(trait1).toHaveBeenCalled()
    expect(trait2).toHaveBeenCalled()
    expect(trait3).not.toHaveBeenCalled()
    expect(trait3override).toHaveBeenCalled()
    expect(trait4).toHaveBeenCalled()
    expect(trait4override).toHaveBeenCalled()

    expect(test instanceof Trait1).toBe(true)
    expect(test instanceof Trait2).toBe(true)
    expect(test instanceof Trait3).toBe(true)
    expect(test instanceof Trait4).toBe(true)
  })
})
