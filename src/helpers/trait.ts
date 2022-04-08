import { MixinTrait } from "../models/MixinTrait"
import { Constructor, Fn, TryConstructor } from "./types"

export const trait = <T extends Fn | Constructor>(target: T) => {
  const trait = MixinTrait.instance(target)

  return (...dependencies: (Constructor | Fn)[]): TryConstructor<T> => {
    trait.registerDependency(...dependencies as Constructor[])
    return target as TryConstructor<T>
  }
}
