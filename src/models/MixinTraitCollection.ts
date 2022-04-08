import { Constructor } from "../helpers/types";
import { MixinTrait } from "./MixinTrait";
import is from '@prunus/is'

export class MixinTraitCollection {
  private _traits: MixinTrait[] = []

  public get length() {
    return this._traits.length
  }

  public includes(constructor: Constructor | MixinTrait) {
    if (is.instanceOf(constructor, MixinTrait))

      return this._traits.includes(constructor)

    return this._traits.some(trait => trait.is(constructor))
  }

  public add(constructor: Constructor) {
    if (this.includes(constructor)) return this

    this._traits.push(MixinTrait.instance(constructor))

    return this
  }

  public each(fn: (trait: MixinTrait) => void) {
    this._traits.forEach(trait => fn(trait))
    return this
  }
}