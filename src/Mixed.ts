import { Mixin } from "./Mixin";
import { Supers } from './models/Supers';
import { Class } from "./typings";

export const MIXED_ID = Symbol.for('mixed:id')

export const MIXIN_SUPERS = Symbol.for('mixed:supers')

type _Mixed<T extends readonly any[], TStatic = {}, TPrototype = {}, TArgs extends any[] = any[], TClass extends readonly Class[] = T> = 
  T extends readonly [infer T1, ...infer TR]
    ? T1 extends Class<infer TClassPrototype, infer TClassArgs>
      ? _Mixed<TR, TStatic & T1, TPrototype & TClassPrototype, TArgs, TClass>
      : never
    : TStatic & (new (...args: TArgs) => TPrototype & ({ readonly supers: Supers<TClass> }))

let counter = 0

export function Mixed<T extends readonly [Class, ...Class[]]>(...traits: T): _Mixed<T> {
  @Mixin(...traits)
  class Mixed {
    private static [MIXED_ID] = ++counter
  }

  return Mixed as unknown as _Mixed<T>
}
