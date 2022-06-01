import { inherit } from "./inherit";
import { AnyObject, AnyConstructor } from "./types";

const ATTACHED_MANAGER = Symbol.for('mixin:attached-manager')

export class Manager {
  public static BLACKLIST_STATIC_PROPERTIES: (string | symbol)[] = ['name', 'length', ATTACHED_MANAGER]
  public static BLACKLIST_PROTOTYPE_PROPERTIES: (string | symbol)[] = []

  public class: AnyConstructor

  public inheritances: Function[] = []
  public target: Function

  private _static: (string | symbol)[]
  private _prototype: (string | symbol)[]

  private static _hasInstance(this: AnyConstructor, instance: AnyObject) {
    if (Manager.has(instance))

      if (Manager.get(instance).has(this)) return true

    return Object[Symbol.hasInstance].call(this, instance)
  }

  private static _bindHasInstance(constructor:  AnyConstructor) {
    if(constructor[Symbol.hasInstance] !== this._hasInstance)

      Object.defineProperty(constructor, Symbol.hasInstance, { value: this._hasInstance, configurable: true })

    return this
  }

  public static has(target: AnyConstructor | object) {
    if (typeof target === 'function') return ATTACHED_MANAGER in target

    if (typeof target?.constructor === 'function') return ATTACHED_MANAGER in target.constructor

    return false;
  }

  public static get(target: AnyConstructor | object): Manager {
    if (typeof target === 'function') {
      if (ATTACHED_MANAGER in target) return (target as any)[ATTACHED_MANAGER]

      return new this(target)
    }

    if (typeof target?.constructor === 'function')

      if (ATTACHED_MANAGER in target.constructor) return (target.constructor as any)[ATTACHED_MANAGER]

      else throw new Error("TODO");

    throw new Error("TODO");
  }

  private constructor(target: AnyConstructor) {
    const self = this
    this.target = target
    this._static = Reflect.ownKeys(target)
    this._prototype = Reflect.ownKeys(target.prototype)
    this.class = function(this: AnyObject, ...args: unknown[]) {
      return self.apply(this, args)
    }

    Object.defineProperty(this.class, 'name', { value: this.target.name })
    Object.defineProperty(target, ATTACHED_MANAGER, { value: this, writable: false, enumerable: false, configurable: false })
    Object.defineProperty(this.class, ATTACHED_MANAGER, { value: this, writable: false, enumerable: false, configurable: false })
  }

  public apply(context: AnyObject, args: unknown[]) {
    return this.applyConstructor(
      this.applyInheritance(context, args),
      args
    )
  }

  public applyConstructor(context: AnyObject, args: unknown[]): AnyObject {
    return this.target.apply(context, args)
  }

  public applyInheritance(context: AnyObject, args: unknown[]): AnyObject {
    return this.inheritances.reduce((context, heritage) => heritage.apply(context, args) ?? context, context)
  }

  public has(constructor: AnyConstructor): boolean {
    return this.inheritances.includes(constructor)
  }

  public use(...constructors: AnyConstructor[]): this {
    for (const constructor of constructors) {
      if(this.inheritances.includes(constructor)) continue

      if(this.constructor.has(constructor)) {
        const manager = this.constructor.get(constructor)

        this.use(...manager.inheritances)
      }

      this.inheritances.push(constructor)

      inherit(this.class, constructor, {
        blacklist: this.constructor.BLACKLIST_STATIC_PROPERTIES,
        if: property => !this._static.includes(property),
      })

      inherit(this.class.prototype, constructor.prototype, {
        blacklist: this.constructor.BLACKLIST_PROTOTYPE_PROPERTIES,
        if: property => !this._prototype.includes(property)
      })

      inherit.inheritancesOf(constructor).forEach(heritage => {
        this.inheritances.push(heritage)
        this.constructor._bindHasInstance(heritage)
      })

      this.constructor._bindHasInstance(constructor)
    }

    return this
  }
}

export interface Manager {
  constructor: typeof Manager
}
