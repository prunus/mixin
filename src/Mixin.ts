import { Manager } from "./Manager"
import { AnyConstructor } from "./types"

export const Mixin = (...inheritances: AnyConstructor[]): ClassDecorator => {
  return <T extends Function>(target: T) => {
    return Manager.get(target).use(...inheritances.reverse()).class as T
  }
}
