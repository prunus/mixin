import { Manager } from "./Manager"
import { AnyObject, AnyConstructor } from "./types"

export const Mixin = (...inheritances: AnyConstructor[]): ClassDecorator => {
  return <T extends Function>(target: T) => {
    const mixin = function(this: AnyObject, ...args: unknown[]) {
      return Manager.get(target).construct(this, ...args)
    }

    Manager.get(mixin).use(Manager.get(target).use(...inheritances).target)

    return mixin as unknown as T
  }
}
