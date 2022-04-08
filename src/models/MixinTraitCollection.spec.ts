import { MixinTraitCollection } from "./MixinTraitCollection"

describe('MixinTraitCollection', () => {
  it('must not add repeated traits', () => {
    const collection = new MixinTraitCollection()
    class Trait {}

    collection.add(Trait)
    expect(collection.length).toBe(1)
    collection.add(Trait)
    expect(collection.length).toBe(1)
  })
})