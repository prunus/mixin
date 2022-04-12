import { MIXIN_CONSTRUCTOR } from "../constants"
import { designs } from "./designs"
import { AnyObject, Constructor } from "./types"

export const isMixin = (target: AnyObject | Function | Constructor) => {
  if (typeof target === 'function') return designs.has(target)

  if (typeof target === 'object' && target !== null) {
    const key = [MIXIN_CONSTRUCTOR, 'constructor'].find(key => typeof target[key] === 'function')

    if (key) return designs.has(target[key])
  }

  return false
}
