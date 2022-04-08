import { AnyObject } from "../helpers/types";
import { MixinDesign } from "./MixinDesign";
import { MixinTrait } from "./MixinTrait";

export class MixinSuper {
  private _relations: Record<keyof AnyObject, MixinTrait[]> = {}

  constructor() {}

  public override(property: keyof AnyObject, trait: MixinTrait) {
    if (!this._relations[property]) this._relations[property] = []

    const traits = this._relations[property]

    if (!traits.includes(trait)) traits.push(trait)

    return this
  }

  public super(context: AnyObject) {
    const sOfSuper: AnyObject = {}

    for (const [property, traits] of Object.entries(this._relations)) {
      const trait = traits[0]
      const { set, get, value, ...descriptor } = trait.getOwnPropertyDescriptor(property)

      if (get || set) {
        Object.defineProperty(sOfSuper, property, {
          ...descriptor,
          get: !get ? undefined : () => get.call(context),
          set: !set ? undefined : (value) => set.call(context, value),
        })
      }

      else if (typeof value === 'function')
        Object.defineProperty(sOfSuper, property, {
          ...descriptor,
          value: (...args: any[]) => value.apply(context, ...args)
        })

      else Object.defineProperty(sOfSuper, property, descriptor)
    }

    return sOfSuper
  }
}