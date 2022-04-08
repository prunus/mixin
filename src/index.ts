import { AnyObject, Constructor } from "./helpers/types";
import { MixinDesign } from "./models/MixinDesign";
import { MixinTrait } from "./models/MixinTrait";

export { Mixin } from "./decorators/Mixin";
export { Trait } from "./decorators/Trait";

type TryConstructor<T extends Constructor | ((...args: any[]) => any)> =
  T extends Constructor<infer I, infer A> | ((...args: (infer A)[]) => infer I)
    ? new (...args: A) => I
    : T

export const mixin = <T extends ((...args: any[]) => any) | Constructor>(target: T) => {
  const design = MixinDesign.instance(target)

  const mixin = function(this: AnyObject, ...args: unknown[]) {
    design.construct(this, ...args)
    return this
  }

  Object.defineProperty(mixin, 'name', { value: target.name })

  return (...traits: (Constructor | Function)[]): TryConstructor<T> => {
    design.use(...traits as Constructor[])
    return mixin as TryConstructor<T>
  }
}

export const trait = <T extends ((...args: any[]) => any) | Constructor>(target: T) => {
  const trait = MixinTrait.instance(target)

  return (...dependencies: (Constructor | Function)[]): TryConstructor<T> => {
    trait.registerDependency(...dependencies as Constructor[])
    return target as TryConstructor<T>
  }
}
