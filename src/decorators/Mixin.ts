import { designs } from '../helpers/designs'
import { includes } from '../helpers/includes'
import { isMixin } from '../helpers/isMixin'
import { AnyObject, Constructor } from '../helpers/types'
import { MixinDesign } from '../models/MixinDesign'

export const Mixin = (...traits: Constructor[]): ClassDecorator => {
  return <T extends Function>(target: T) => {
    const design = MixinDesign.instance(target)

    const mixin = function(this: AnyObject, ...args: unknown[]) {
      design.construct(this, ...args)
      return this
    }

    mixin.prototype = target.prototype

    designs.set(mixin, design)

    Object.defineProperty(mixin, 'name', { value: target.name })

    if (traits.length) design.use(...traits)

    return mixin as unknown as T
  }
}

Mixin.isMixin = isMixin
Mixin.includes = includes
