export type AnyObject = Record<keyof any, any>

export interface Constructor<T = any, A extends readonly any[] =  readonly any[]> {
  new (...args: A): T
}
