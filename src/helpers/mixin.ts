import { MixinDesign } from "../models/MixinDesign"
import { includes } from "./includes"
import { isMixin } from "./isMixin"
import { AnyObject, Constructor, Fn, TryConstructor } from "./types"

export const mixin = <T extends Fn | Constructor>(target: T) => {
  const design = MixinDesign.instance(target)

  const mixin = function(this: AnyObject, ...args: unknown[]) {
    design.construct(this, ...args)
    return this
  }

  Object.defineProperty(mixin, 'name', { value: target.name })

  return (...traits: (Constructor | Fn)[]): TryConstructor<T> => {
    design.use(...traits as Constructor[])
    return mixin as TryConstructor<T>
  }
}

mixin.isMixin = isMixin
mixin.includes = includes
