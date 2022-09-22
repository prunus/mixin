import { Design } from "./Design";

export class Supers<T> {
  private _instances = new Map<Function, T>()

  constructor(private design: Design, private that: Record<string | symbol, unknown>) {}

  public for(context: Function): T {
    if (!this.design.has(context)) throw new Error("TODO");

    if (this._instances.has(context))

      return this._instances.get(context)!

    const instance = new Proxy(Object.create(context.prototype), {
      get: (target, property) => {
        const descriptor = Reflect.getOwnPropertyDescriptor(target, property)

        if (typeof descriptor?.value === 'function') descriptor.value.bind(this.that)

        if (descriptor?.get) return descriptor.get.call(this.that)

        return target[property]
      },
      set: (target, property, value) => {
        const descriptor = Reflect.getOwnPropertyDescriptor(target, property)

        if (descriptor?.set) descriptor?.set.call(this.that, value)

        target[property] = value

        return true
      },
    })

    this._instances.set(context, instance)

    return instance
  }

  public forEach(fn: (instance: T) => void) {
    this.design.inheritances.forEach(inherit => fn(this.for(inherit) as T))
  }

  public map<TReturn>(fn: (instance: T) => TReturn): TReturn[] {
    return this.design.inheritances.map(inherit => fn(this.for(inherit) as T))
  }
}
