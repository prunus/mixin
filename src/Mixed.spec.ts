import { Mixed } from "./Mixed";

describe('Mixed', () => {
  it('must create a mixin by inheritance ', () => {
    const [trait1, trait2] = [jest.fn(), jest.fn()]
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
    class Test extends Mixed(Trait1, Trait2) {}

    const test = new Test()
    test.trait1()
    test.trait2()
    expect(trait1).toHaveBeenCalled()
    expect(trait2).toHaveBeenCalled()
    expect(test instanceof Trait1).toBe(true)
    expect(test instanceof Trait2).toBe(true)
  })
})
