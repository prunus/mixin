import { MixinDesign } from "../models/MixinDesign";
import { isMixin } from "./isMixin";
import { AnyObject, Constructor, Fn } from "./types";

export function includes<T extends AnyObject, P>(target: T, constructor: Constructor<P> | Fn<P>): target is T & P
export function includes<T extends Function | Constructor, P>(target: T, constructor: Constructor<P> | Fn<P>): boolean
export function includes<T extends AnyObject | Function | Constructor, P>(target: T, constructor: Constructor<P> | Fn<P>) {
  return isMixin(target) && MixinDesign.instance(target).includes(constructor)
}