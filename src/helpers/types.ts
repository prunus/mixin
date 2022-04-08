export type AnyObject = Record<keyof any, any>

export type Fn<R = any, A extends readonly any[] =  readonly any[]> = (...args: A) => R

export interface Constructor<T = any, A extends readonly any[] =  readonly any[]> {
  new (...args: A): T
}

export type TryConstructor<T extends Constructor | ((...args: any[]) => any)> =
  T extends Constructor<infer I, infer A> | ((...args: (infer A)[]) => infer I)
    ? new (...args: A) => I
    : T