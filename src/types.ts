export type AnyObject = Record<string | symbol, any>

export type AnyConstructor =
 | Function
 | (new (...args: any[]) => any)
 | (abstract new (...args: any[]) => any)
