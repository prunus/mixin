import { Mixin } from "./Mixin";
import { Supers } from "./models/Supers";

declare class MixedSupers {
  public supers: Supers<this>
}

type MixedInstance<P> = P & MixedSupers

type MixedConstructor<P, S, F extends Function[]> = S & {
  new (...args: unknown[]): MixedInstance<P>
}

type PrototypeOf<T extends Function> =
  T extends
   | (new (...args: any[]) => infer TPrototype)
   | (abstract new (...args: any[]) => infer TPrototype)
   ? TPrototype : {}

type PropertiesOf<T extends Function> = { [K in keyof T]: T[K] }

export function Mixed<T1 extends Function>(trait1: T1): MixedConstructor<PrototypeOf<T1>, PropertiesOf<T1>, [T1]>
export function Mixed<T1 extends Function, T2 extends Function>(trait1: T1, trait2: T2): MixedConstructor<PrototypeOf<T1> & PrototypeOf<T2>, PropertiesOf<T1> & PropertiesOf<T2>, [T1, T2]>
export function Mixed<T1 extends Function, T2 extends Function, T3 extends Function>(trait1: T1, trait2: T2, trait3: T3): MixedConstructor<PrototypeOf<T1> & PrototypeOf<T2> & PrototypeOf<T3>, PropertiesOf<T1> & PropertiesOf<T2> & PropertiesOf<T3>, [T1, T2, T3]>
export function Mixed<T1 extends Function, T2 extends Function, T3 extends Function, T4 extends Function>(trait1: T1, trait2: T2, trait3: T3, trait4: T4): MixedConstructor<PrototypeOf<T1> & PrototypeOf<T2> & PrototypeOf<T3> & PrototypeOf<T4>, PropertiesOf<T1> & PropertiesOf<T2> & PropertiesOf<T3> & PropertiesOf<T4>, [T1, T2, T3, T4]>
export function Mixed<T1 extends Function, T2 extends Function, T3 extends Function, T4 extends Function, T5 extends Function>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5): MixedConstructor<PrototypeOf<T1> & PrototypeOf<T2> & PrototypeOf<T3> & PrototypeOf<T4> & PrototypeOf<T5>, PropertiesOf<T1> & PropertiesOf<T2> & PropertiesOf<T3> & PropertiesOf<T4> & PropertiesOf<T5>, [T1, T2, T3, T4, T5]>
export function Mixed<T1 extends Function, T2 extends Function, T3 extends Function, T4 extends Function, T5 extends Function, T6 extends Function>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6): MixedConstructor<PrototypeOf<T1> & PrototypeOf<T2> & PrototypeOf<T3> & PrototypeOf<T4> & PrototypeOf<T5> & PrototypeOf<T6>, PropertiesOf<T1> & PropertiesOf<T2> & PropertiesOf<T3> & PropertiesOf<T4> & PropertiesOf<T5> & PropertiesOf<T6>, [T1, T2, T3, T4, T5, T6]>
export function Mixed<T1 extends Function, T2 extends Function, T3 extends Function, T4 extends Function, T5 extends Function, T6 extends Function, T7 extends Function>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7): MixedConstructor<PrototypeOf<T1> & PrototypeOf<T2> & PrototypeOf<T3> & PrototypeOf<T4> & PrototypeOf<T5> & PrototypeOf<T6> & PrototypeOf<T7>, PropertiesOf<T1> & PropertiesOf<T2> & PropertiesOf<T3> & PropertiesOf<T4> & PropertiesOf<T5> & PropertiesOf<T6> & PropertiesOf<T7>, [T1, T2, T3, T4, T5, T6, T7]>
export function Mixed<T1 extends Function, T2 extends Function, T3 extends Function, T4 extends Function, T5 extends Function, T6 extends Function, T7 extends Function, T8 extends Function>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7, trait8: T8): MixedConstructor<PrototypeOf<T1> & PrototypeOf<T2> & PrototypeOf<T3> & PrototypeOf<T4> & PrototypeOf<T5> & PrototypeOf<T6> & PrototypeOf<T7> & PrototypeOf<T8>, PropertiesOf<T1> & PropertiesOf<T2> & PropertiesOf<T3> & PropertiesOf<T4> & PropertiesOf<T5> & PropertiesOf<T6> & PropertiesOf<T7> & PropertiesOf<T8>, [T1, T2, T3, T4, T5, T6, T7, T8]>
export function Mixed<T1 extends Function, T2 extends Function, T3 extends Function, T4 extends Function, T5 extends Function, T6 extends Function, T7 extends Function, T8 extends Function, T9 extends Function>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7, trait8: T8, trait9: T9): MixedConstructor<PrototypeOf<T1> & PrototypeOf<T2> & PrototypeOf<T3> & PrototypeOf<T4> & PrototypeOf<T5> & PrototypeOf<T6> & PrototypeOf<T7> & PrototypeOf<T8> & PrototypeOf<T9>, PropertiesOf<T1> & PropertiesOf<T2> & PropertiesOf<T3> & PropertiesOf<T4> & PropertiesOf<T5> & PropertiesOf<T6> & PropertiesOf<T7> & PropertiesOf<T8> & PropertiesOf<T9>, [T1, T2, T3, T4, T5, T6, T7, T8, T9]>
export function Mixed<T1 extends Function, T2 extends Function, T3 extends Function, T4 extends Function, T5 extends Function, T6 extends Function, T7 extends Function, T8 extends Function, T9 extends Function, T10 extends Function>(trait1: T1, trait2: T2, trait3: T3, trait4: T4, trait5: T5, trait6: T6, trait7: T7, trait8: T8, trait9: T9, trait10: T10): MixedConstructor<PrototypeOf<T1> & PrototypeOf<T2> & PrototypeOf<T3> & PrototypeOf<T4> & PrototypeOf<T5> & PrototypeOf<T6> & PrototypeOf<T7> & PrototypeOf<T8> & PrototypeOf<T9> & PrototypeOf<T10>, PropertiesOf<T1> & PropertiesOf<T2> & PropertiesOf<T3> & PropertiesOf<T4> & PropertiesOf<T5> & PropertiesOf<T6> & PropertiesOf<T7> & PropertiesOf<T8> & PropertiesOf<T9> & PropertiesOf<T10>, [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>
export function Mixed(...traits: Function[]): MixedConstructor<{}, {}, Function[]> {
  const id = Symbol.for('mixed-id')

  @Mixin(...traits)
  class Mixed {
    private static [id] = ++MixedFactory.counter
  }

  return Mixed as unknown as MixedConstructor<{}, {}, Function[]>
}

Mixed.counter = 0

const MixedFactory = Mixed
