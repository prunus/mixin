import is from '@prunus/is';
import { getOwnProperties } from "../helpers/getOwnProperties";
import { getOwnPropertyDescriptor } from '../helpers/getOwnPropertyDescriptor';
import { getOwnPropertyDescriptors } from "../helpers/getOwnPropertyDescriptors";
import { AnyObject, Constructor } from "../helpers/types";

const traits = new Map<Function | Constructor, MixinTrait>()

export class MixinTrait {
  private _dependencies: MixinTrait[] = []

  public static instance(constructor: Function | Constructor | MixinTrait): MixinTrait {
    if (is.instanceOf(constructor, this))

      return constructor

    if (typeof constructor === 'function') {

      if (!traits.has(constructor))
        traits.set(constructor, new this(constructor))

      return traits.get(constructor)!
    }

    throw new Error()
  }

  constructor(protected _constructor: Function | Constructor) {}

  public getDependencies(): MixinTrait[] {
    return [
      ...this._dependencies,
      ...this._dependencies.flatMap(dependency => dependency.getDependencies())
    ]
  }

  public registerDependency(...dependencies: Constructor[]) {
    for (const dependency of dependencies) {
      const trait = MixinTrait.instance(dependency)

      if (!this._dependencies.includes(trait)) this._dependencies.push(trait)
    }
  }

  public getOwnProperties() {
    return getOwnProperties(this._constructor.prototype)
  }

  public getOwnPropertyDescriptor(property: keyof AnyObject) {
    return getOwnPropertyDescriptor(this._constructor.prototype, property)
  }

  public getOwnPropertyDescriptors() {
    return getOwnPropertyDescriptors(this._constructor.prototype)
  }

  public construct(context: AnyObject, ...args: unknown[]) {
    (this._constructor as Function).apply(context, args)
    return context
  }

  public is(constructor: Constructor | Function) {
    return this._constructor === constructor
  }
}
