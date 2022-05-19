import { MIXIN_CONSTRUCTOR } from '../constants';
import { designs } from '../helpers/designs';
import { getOwnProperties } from '../helpers/getOwnProperties';
import { getOwnPropertyDescriptor } from '../helpers/getOwnPropertyDescriptor';
import { getOwnPropertyDescriptors } from '../helpers/getOwnPropertyDescriptors';
import { AnyObject, Constructor } from "../helpers/types";
import { MixinSuper } from './MixinSuper';
import { MixinTrait } from './MixinTrait';
import { MixinTraitCollection } from './MixinTraitCollection';

export class MixinDesign {
  private _traits = new MixinTraitCollection()
  private _super = new MixinSuper()
  private _prototype: (keyof AnyObject)[]

  public static instance(target: AnyObject | Function | Constructor): MixinDesign {
    if (typeof target === 'function') {

      if (!designs.has(target))
        designs.set(target, new this(target))

      return designs.get(target)!

    }

    if (typeof target === 'object' && target !== null) {

      const key = [MIXIN_CONSTRUCTOR, 'constructor'].find(key => typeof target[key] === 'function')!

      if (target[key] === Object) throw new Error()

      if (designs.has(target[key]))

        return designs.get(target[key])!

      throw new Error()
    }

    throw new Error()
  }

  constructor(private _constructor: Function | Constructor) {
    this._prototype = getOwnProperties(_constructor.prototype)
  }

  public construct(context: AnyObject, ...args: unknown[]) {
    for (const [property, descriptor] of getOwnPropertyDescriptors(this._constructor.prototype)) {
      
      if (typeof descriptor.value === 'function' && property in context) continue

      Object.defineProperty(context, property, { ...descriptor, ...getOwnPropertyDescriptor(context, property) })
    }

    this._traits.construct(context, ...args)

    ;(this._constructor as Function).apply(context, args)

    context.super = this._super.super(context)

    Object.defineProperty(context, MIXIN_CONSTRUCTOR, { value: this._constructor, enumerable: false, writable: false, configurable: false })

    return context
  }

  public includes(trait: Function | Constructor) {
    return this._traits.includes(trait)
  }

  public use(...constructors: Constructor[]) {
    for (const constructor of constructors) {
      const trait = MixinTrait.instance(constructor)

      const dependencies = trait.getDependencies()

      const hasAllDependencies = dependencies.every(dependency => this._traits.includes(dependency))

      if (!hasAllDependencies) throw new Error()

      for (const [property, descriptor] of trait.getOwnPropertyDescriptors())
        
        if (this._prototype.includes(property))

          this._super.override(property, trait)

        else Object.defineProperty(this._constructor.prototype, property, descriptor)

      this._traits.add(constructor)
    }

    return this
  }
}
