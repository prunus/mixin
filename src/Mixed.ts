import { Mixin } from "./Mixin";

const MIXED_SUPERS = Symbol('mixed:supers')

type ArrayInfer<T extends any[]> = T extends (infer I)[] ? I : never

class MixedBase<C extends Constructor[]> {
  private supers!: C

  private [MIXED_SUPERS] = new Map<Constructor, Constructor>()

  protected superOf<T extends ArrayInfer<C>>(target: T): this {
    if (!this[MIXED_SUPERS].has(target))

      this[MIXED_SUPERS].set(target, new Proxy(target.prototype, {
        get: (target, p) => {
          const descriptor = Reflect.getOwnPropertyDescriptor(target, p)

          let value: unknown

          if (descriptor?.get) value = descriptor.get.apply(this)

          else value = Reflect.get(target, p)

          if (typeof value === 'function') return value.bind(this)

          return value
        },
      }))

    return this[MIXED_SUPERS].get(target)! as unknown as this
  }

  protected forEachSuper(fn: (self: this) => void) {
    this.supers.forEach(constructor => {
      fn(this.superOf(constructor as ArrayInfer<C>))
    })
  }
  
  protected mapSuper<T>(fn: (self: this) => T): T[] {
    return this.supers.map(constructor => fn(this.superOf(constructor as ArrayInfer<C>)))
  }

  protected reduceSuper<T>(initial: T, fn: (acc: T, self: this) => T) {
    return this.supers.reduce((acc, constructor) => fn(acc, this.superOf(constructor as ArrayInfer<C>)), initial)
  }
}

type Constructor<P = any, A extends any[] = any[]> =
  | (new (...args: A) => P)
  | (abstract new (...args: A) => P)

type Prototype<T extends Constructor> = T extends Constructor<infer P> ? P : never

type Static<T extends Constructor> = { [K in keyof T]: T[K] }

type MixedConstructor<P, S, C extends Constructor[] = []> = S & {
  new (...args: any[]): P & MixedBase<C>
}

export function Mixed<T1 extends Constructor>(trait1: T1): MixedConstructor<Prototype<T1>, Static<T1>, [T1]>
export function Mixed<T1 extends Constructor, T2 extends Constructor>(trait1: T1, trait2: T2): MixedConstructor<Prototype<T1> & Prototype<T2>, Static<T1> & Static<T2>, [T1, T2]>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor>(trait1: T1, trait2: T2, trait3: T3): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3>, Static<T1> & Static<T2> & Static<T3>>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor, T4 extends Constructor>(trait1: T1, trait2: T2, trait3: T3, trait4: T4): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3> & Prototype<T4>, Static<T1> & Static<T2> & Static<T3> & Static<T4>>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor, T4 extends Constructor, T5 extends Constructor>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3> & Prototype<T4> & Prototype<T5>, Static<T1> & Static<T2> & Static<T3> & Static<T4> & Static<T5>>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor, T4 extends Constructor, T5 extends Constructor, T6 extends Constructor>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3> & Prototype<T4> & Prototype<T5> & Prototype<T6>, Static<T1> & Static<T2> & Static<T3> & Static<T4> & Static<T5> & Static<T6>>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor, T4 extends Constructor, T5 extends Constructor, T6 extends Constructor, T7 extends Constructor>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3> & Prototype<T4> & Prototype<T5> & Prototype<T6> & Prototype<T7>, Static<T1> & Static<T2> & Static<T3> & Static<T4> & Static<T5> & Static<T6> & Static<T7>>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor, T4 extends Constructor, T5 extends Constructor, T6 extends Constructor, T7 extends Constructor, T8 extends Constructor>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7, trait8: T8): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3> & Prototype<T4> & Prototype<T5> & Prototype<T6> & Prototype<T7> & Prototype<T8>, Static<T1> & Static<T2> & Static<T3> & Static<T4> & Static<T5> & Static<T6> & Static<T7> & Static<T8>>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor, T4 extends Constructor, T5 extends Constructor, T6 extends Constructor, T7 extends Constructor, T8 extends Constructor, T9 extends Constructor>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7, trait8: T8, trait9: T9): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3> & Prototype<T4> & Prototype<T5> & Prototype<T6> & Prototype<T7> & Prototype<T8> & Prototype<T9>, Static<T1> & Static<T2> & Static<T3> & Static<T4> & Static<T5> & Static<T6> & Static<T7> & Static<T8> & Static<T9>>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor, T4 extends Constructor, T5 extends Constructor, T6 extends Constructor, T7 extends Constructor, T8 extends Constructor, T9 extends Constructor, T10 extends Constructor>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7, trait8: T8, trait9: T9, trait10: T10): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3> & Prototype<T4> & Prototype<T5> & Prototype<T6> & Prototype<T7> & Prototype<T8> & Prototype<T9> & Prototype<T10>, Static<T1> & Static<T2> & Static<T3> & Static<T4> & Static<T5> & Static<T6> & Static<T7> & Static<T8> & Static<T9> & Static<T10>>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor, T4 extends Constructor, T5 extends Constructor, T6 extends Constructor, T7 extends Constructor, T8 extends Constructor, T9 extends Constructor, T10 extends Constructor, T11 extends Constructor>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7, trait8: T8, trait9: T9, trait10: T10, trait11: T11): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3> & Prototype<T4> & Prototype<T5> & Prototype<T6> & Prototype<T7> & Prototype<T8> & Prototype<T9> & Prototype<T10> & Prototype<T11>, Static<T1> & Static<T2> & Static<T3> & Static<T4> & Static<T5> & Static<T6> & Static<T7> & Static<T8> & Static<T9> & Static<T10> & Static<T11>>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor, T4 extends Constructor, T5 extends Constructor, T6 extends Constructor, T7 extends Constructor, T8 extends Constructor, T9 extends Constructor, T10 extends Constructor, T11 extends Constructor, T12 extends Constructor>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7, trait8: T8, trait9: T9, trait10: T10, trait11: T11, trait12: T12): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3> & Prototype<T4> & Prototype<T5> & Prototype<T6> & Prototype<T7> & Prototype<T8> & Prototype<T9> & Prototype<T10> & Prototype<T11> & Prototype<T12>, Static<T1> & Static<T2> & Static<T3> & Static<T4> & Static<T5> & Static<T6> & Static<T7> & Static<T8> & Static<T9> & Static<T10> & Static<T11> & Static<T12>>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor, T4 extends Constructor, T5 extends Constructor, T6 extends Constructor, T7 extends Constructor, T8 extends Constructor, T9 extends Constructor, T10 extends Constructor, T11 extends Constructor, T12 extends Constructor, T13 extends Constructor>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7, trait8: T8, trait9: T9, trait10: T10, trait11: T11, trait12: T12, trait13: T13): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3> & Prototype<T4> & Prototype<T5> & Prototype<T6> & Prototype<T7> & Prototype<T8> & Prototype<T9> & Prototype<T10> & Prototype<T11> & Prototype<T12> & Prototype<T13>, Static<T1> & Static<T2> & Static<T3> & Static<T4> & Static<T5> & Static<T6> & Static<T7> & Static<T8> & Static<T9> & Static<T10> & Static<T11> & Static<T12> & Static<T13>>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor, T4 extends Constructor, T5 extends Constructor, T6 extends Constructor, T7 extends Constructor, T8 extends Constructor, T9 extends Constructor, T10 extends Constructor, T11 extends Constructor, T12 extends Constructor, T13 extends Constructor, T14 extends Constructor>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7, trait8: T8, trait9: T9, trait10: T10, trait11: T11, trait12: T12, trait13: T13, trait14: T14): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3> & Prototype<T4> & Prototype<T5> & Prototype<T6> & Prototype<T7> & Prototype<T8> & Prototype<T9> & Prototype<T10> & Prototype<T11> & Prototype<T12> & Prototype<T13> & Prototype<T14>, Static<T1> & Static<T2> & Static<T3> & Static<T4> & Static<T5> & Static<T6> & Static<T7> & Static<T8> & Static<T9> & Static<T10> & Static<T11> & Static<T12> & Static<T13> & Static<T14>>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor, T4 extends Constructor, T5 extends Constructor, T6 extends Constructor, T7 extends Constructor, T8 extends Constructor, T9 extends Constructor, T10 extends Constructor, T11 extends Constructor, T12 extends Constructor, T13 extends Constructor, T14 extends Constructor, T15 extends Constructor>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7, trait8: T8, trait9: T9, trait10: T10, trait11: T11, trait12: T12, trait13: T13, trait14: T14, trait15: T15): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3> & Prototype<T4> & Prototype<T5> & Prototype<T6> & Prototype<T7> & Prototype<T8> & Prototype<T9> & Prototype<T10> & Prototype<T11> & Prototype<T12> & Prototype<T13> & Prototype<T14> & Prototype<T15>, Static<T1> & Static<T2> & Static<T3> & Static<T4> & Static<T5> & Static<T6> & Static<T7> & Static<T8> & Static<T9> & Static<T10> & Static<T11> & Static<T12> & Static<T13> & Static<T14> & Static<T15>>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor, T4 extends Constructor, T5 extends Constructor, T6 extends Constructor, T7 extends Constructor, T8 extends Constructor, T9 extends Constructor, T10 extends Constructor, T11 extends Constructor, T12 extends Constructor, T13 extends Constructor, T14 extends Constructor, T15 extends Constructor, T16 extends Constructor>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7, trait8: T8, trait9: T9, trait10: T10, trait11: T11, trait12: T12, trait13: T13, trait14: T14, trait15: T15, trait16: T16): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3> & Prototype<T4> & Prototype<T5> & Prototype<T6> & Prototype<T7> & Prototype<T8> & Prototype<T9> & Prototype<T10> & Prototype<T11> & Prototype<T12> & Prototype<T13> & Prototype<T14> & Prototype<T15> & Prototype<T16>, Static<T1> & Static<T2> & Static<T3> & Static<T4> & Static<T5> & Static<T6> & Static<T7> & Static<T8> & Static<T9> & Static<T10> & Static<T11> & Static<T12> & Static<T13> & Static<T14> & Static<T15> & Static<T16>>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor, T4 extends Constructor, T5 extends Constructor, T6 extends Constructor, T7 extends Constructor, T8 extends Constructor, T9 extends Constructor, T10 extends Constructor, T11 extends Constructor, T12 extends Constructor, T13 extends Constructor, T14 extends Constructor, T15 extends Constructor, T16 extends Constructor, T17 extends Constructor>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7, trait8: T8, trait9: T9, trait10: T10, trait11: T11, trait12: T12, trait13: T13, trait14: T14, trait15: T15, trait16: T16, trait17: T17): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3> & Prototype<T4> & Prototype<T5> & Prototype<T6> & Prototype<T7> & Prototype<T8> & Prototype<T9> & Prototype<T10> & Prototype<T11> & Prototype<T12> & Prototype<T13> & Prototype<T14> & Prototype<T15> & Prototype<T16> & Prototype<T17>, Static<T1> & Static<T2> & Static<T3> & Static<T4> & Static<T5> & Static<T6> & Static<T7> & Static<T8> & Static<T9> & Static<T10> & Static<T11> & Static<T12> & Static<T13> & Static<T14> & Static<T15> & Static<T16> & Static<T17>>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor, T4 extends Constructor, T5 extends Constructor, T6 extends Constructor, T7 extends Constructor, T8 extends Constructor, T9 extends Constructor, T10 extends Constructor, T11 extends Constructor, T12 extends Constructor, T13 extends Constructor, T14 extends Constructor, T15 extends Constructor, T16 extends Constructor, T17 extends Constructor, T18 extends Constructor>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7, trait8: T8, trait9: T9, trait10: T10, trait11: T11, trait12: T12, trait13: T13, trait14: T14, trait15: T15, trait16: T16, trait17: T17, trait18: T18): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3> & Prototype<T4> & Prototype<T5> & Prototype<T6> & Prototype<T7> & Prototype<T8> & Prototype<T9> & Prototype<T10> & Prototype<T11> & Prototype<T12> & Prototype<T13> & Prototype<T14> & Prototype<T15> & Prototype<T16> & Prototype<T17> & Prototype<T18>, Static<T1> & Static<T2> & Static<T3> & Static<T4> & Static<T5> & Static<T6> & Static<T7> & Static<T8> & Static<T9> & Static<T10> & Static<T11> & Static<T12> & Static<T13> & Static<T14> & Static<T15> & Static<T16> & Static<T17> & Static<T18>>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor, T4 extends Constructor, T5 extends Constructor, T6 extends Constructor, T7 extends Constructor, T8 extends Constructor, T9 extends Constructor, T10 extends Constructor, T11 extends Constructor, T12 extends Constructor, T13 extends Constructor, T14 extends Constructor, T15 extends Constructor, T16 extends Constructor, T17 extends Constructor, T18 extends Constructor, T19 extends Constructor>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7, trait8: T8, trait9: T9, trait10: T10, trait11: T11, trait12: T12, trait13: T13, trait14: T14, trait15: T15, trait16: T16, trait17: T17, trait18: T18, trait19: T19): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3> & Prototype<T4> & Prototype<T5> & Prototype<T6> & Prototype<T7> & Prototype<T8> & Prototype<T9> & Prototype<T10> & Prototype<T11> & Prototype<T12> & Prototype<T13> & Prototype<T14> & Prototype<T15> & Prototype<T16> & Prototype<T17> & Prototype<T18> & Prototype<T19>, Static<T1> & Static<T2> & Static<T3> & Static<T4> & Static<T5> & Static<T6> & Static<T7> & Static<T8> & Static<T9> & Static<T10> & Static<T11> & Static<T12> & Static<T13> & Static<T14> & Static<T15> & Static<T16> & Static<T17> & Static<T18> & Static<T19>>
export function Mixed<T1 extends Constructor, T2 extends Constructor, T3 extends Constructor, T4 extends Constructor, T5 extends Constructor, T6 extends Constructor, T7 extends Constructor, T8 extends Constructor, T9 extends Constructor, T10 extends Constructor, T11 extends Constructor, T12 extends Constructor, T13 extends Constructor, T14 extends Constructor, T15 extends Constructor, T16 extends Constructor, T17 extends Constructor, T18 extends Constructor, T19 extends Constructor, T20 extends Constructor>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7, trait8: T8, trait9: T9, trait10: T10, trait11: T11, trait12: T12, trait13: T13, trait14: T14, trait15: T15, trait16: T16, trait17: T17, trait18: T18, trait19: T19, trait20: T20): MixedConstructor<Prototype<T1> & Prototype<T2> & Prototype<T3> & Prototype<T4> & Prototype<T5> & Prototype<T6> & Prototype<T7> & Prototype<T8> & Prototype<T9> & Prototype<T10> & Prototype<T11> & Prototype<T12> & Prototype<T13> & Prototype<T14> & Prototype<T15> & Prototype<T16> & Prototype<T17> & Prototype<T18> & Prototype<T19> & Prototype<T20>, Static<T1> & Static<T2> & Static<T3> & Static<T4> & Static<T5> & Static<T6> & Static<T7> & Static<T8> & Static<T9> & Static<T10> & Static<T11> & Static<T12> & Static<T13> & Static<T14> & Static<T15> & Static<T16> & Static<T17> & Static<T18> & Static<T19> & Static<T20>>
export function Mixed(...traits: Constructor[]): Constructor {
  return Mixin(MixedBase, ...traits)(
    // @ts-expect-error
    class extends MixedBase<Constructor[]> {
      private supers = traits
    }
  ) as Constructor
}

// type ConflictKeys<A, B> = Exclude<Extract<keyof A, keyof B>, 'prototype' | 'constructor'>

// type Resolver<A, B, K extends keyof A & keyof B> = (current: A[K], overwritten: B[K]) => B[K] | A[K]

// export declare function MixedConflicts<
//   T1 extends Constructor,
//   T2 extends Constructor
// >(
//   conflicts: { [K in  ConflictKeys<T1, T2>]?: Resolver<T1, T2, K> },
//   trait1: T1,
//   trait2: T2
// ): ConflictKeys<T1, T2>

// export declare function MixedConflicts<
//   T1 extends Constructor,
//   T2 extends Constructor,
//   T3 extends Constructor,
// >(
//   conflicts: {
//     static: {
//       [K in ConflictKeys<T1, T2>]?: Resolver<T1, T2, K>
//     },
//     prototype: {
//       [K in ConflictKeys<InstanceType<T1>, InstanceType<T2>>]?: Resolver<InstanceType<T1>, InstanceType<T2>, K>
//     }
//   },
//   trait1: T1,
//   trait2: T2
// ): ConflictKeys<T1, T2>

// function chain<F extends (...args: any) => void | Promise<void>>(current: F, overwritten: F): (...args: Parameters<F>) => ReturnType<F> {
//   return (...args: Parameters<F>): ReturnType<F> => {
//     const response = current(...args)
//     if (typeof response === 'object' && response instanceof Promise)
//       return response.then(() => overwritten(...args)) as ReturnType<F>
//     else return overwritten(...args) as ReturnType<F>
//   }
// }

// MixedConflicts(
//   {
//     test: chain
//   },
//   class {
//     static number = 1
//     static test() {}
//   },
//   class {
//     static number = 1
//     static test() {}
//   }
// )