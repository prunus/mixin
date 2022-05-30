import { AnyObject, AnyConstructor } from "./types";

const ATTACHED_MANAGER = Symbol.for('mixin:attached-manager')

export class Manager {
  public static readonly BLACKLIST_STATIC_PROPERTIES = ['prototype', 'constructor', 'name', 'length', ATTACHED_MANAGER]
  public static readonly BLACKLIST_PROTOTYPE_PROPERTIES: (string | symbol)[] = ['constructor']

  public inheritances: Function[] = []
  public managers: Manager[] = []
  public target: Function
  private _static: (string | symbol)[]
  private _prototype: (string | symbol)[]

  private static _basicClassHasInstance(this: AnyConstructor, instance: AnyObject) {
    if (Manager.has(instance))

      if (Manager.get(instance).has(this)) return this

    return Object[Symbol.hasInstance].call(this, instance)
  }

  private static _mixinClassHasInstance(this: AnyConstructor, instance: AnyObject) {
    if (Manager.has(instance)) {

      if (Manager.get(instance).has(this)) return true

    }
    
    if (instance instanceof Manager.get(this).target) return true

    return Object[Symbol.hasInstance].call(this, instance)
  }

  private static _bindHasInstance(constructor:  AnyConstructor) {
    if (this.has(constructor)) {

      if (constructor[Symbol.hasInstance] !== this._mixinClassHasInstance)

        Object.defineProperty(constructor, Symbol.hasInstance, { value: this._mixinClassHasInstance })

      return this
    }

    if (constructor[Symbol.hasInstance] !== this._basicClassHasInstance)

      Object.defineProperty(constructor, Symbol.hasInstance, { value: this._basicClassHasInstance })

    return this
  }

  public static has(target: AnyConstructor | object) {
    if (typeof target === 'function') return ATTACHED_MANAGER in target

    if (typeof target?.constructor === 'function') return ATTACHED_MANAGER in target.constructor

    return false;
  }

  public static get(target: AnyConstructor | object): Manager {
    if (typeof target === 'function') {
      if (ATTACHED_MANAGER in target)

        return (target as any)[ATTACHED_MANAGER]

      return new this(target)
    }

    if (typeof target?.constructor === 'function')

      if (ATTACHED_MANAGER in target.constructor)

          return (target.constructor as any)[ATTACHED_MANAGER]

      else throw new Error("TODO");

    throw new Error("TODO");
  }

  private constructor(target: AnyConstructor) {
    this.target = target
    this._static = Reflect.ownKeys(target)
    this._prototype = Reflect.ownKeys(target.prototype)

    Object.defineProperty(
      target,
      ATTACHED_MANAGER,
      { value: this, writable: false, enumerable: false, configurable: false }
    )
  }

  public construct(context: AnyObject, ...args: unknown[]) {
    this.inheritances.forEach(heritage => heritage.apply(context, args))

    this.target.apply(context, args)

    return context
  }

  public has(constructor: AnyConstructor): boolean {
    if (this.inheritances.includes(constructor)) return true

    return this.managers.some(manager => manager.has(constructor))
  }

  public use(...constructors: AnyConstructor[]): this {
    for (const constructor of constructors) {
      if(this.inheritances.includes(constructor)) continue

      if(this.constructor.has(constructor)) {
        const manager = this.constructor.get(constructor)

        if (this.managers.includes(manager)) continue

        this.managers.push(manager)
      }

      this.inheritances.push(constructor)

      Reflect.ownKeys(constructor).forEach(property => {
        if (this.constructor.BLACKLIST_STATIC_PROPERTIES.includes(property)) return void 0

        if (this._static.includes(property)) return void 0

        const descriptor = Reflect.getOwnPropertyDescriptor(constructor, property)

        // @ts-expect-error
        if (!descriptor) this.target[property] = constructor[property]

        else Object.defineProperty(this.target, property, descriptor)
      })

      Reflect.ownKeys(constructor.prototype).forEach(property => {
        if (this.constructor.BLACKLIST_PROTOTYPE_PROPERTIES.includes(property)) return void 0

        if (this._prototype.includes(property)) return void 0

        const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, property)

        if (!descriptor) this.target.prototype[property] = constructor.prototype[property]

        else Object.defineProperty(this.target.prototype, property, descriptor)
      })

      this.constructor._bindHasInstance(constructor)
    }

    return this
  }
}

export interface Manager {
  constructor: typeof Manager
}
