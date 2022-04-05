import { Constructor } from "../helpers/types"
import { MixinTrait } from "../models/MixinTrait"

export const Trait = (...dependencies: Constructor[]): ClassDecorator => {
  return <T extends Function>(target: T) => {
    MixinTrait
      .instance(target as unknown as Constructor)
      .registerDependency(...dependencies)
  }
}