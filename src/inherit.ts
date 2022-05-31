export interface InheritOptions {
  blacklist: (string | symbol)[]
  if(property: string | symbol): boolean
}

const DEFAULT_BLACKLIST = [ 'constructor', 'prototype' ]

const clean = <T>(record: T): T =>
  Object.fromEntries(
    Object.entries(record).filter(([key, value]) => value !== undefined)
  ) as T

export const inherit = (target: any, heritage: any, { blacklist: bl, if: allow }: InheritOptions) => {
  const blacklist = bl.concat(DEFAULT_BLACKLIST)

  for (const property of Reflect.ownKeys(heritage)) {
    if (blacklist.includes(property)) continue

    if (!allow(property)) continue

    const herintagePropertyDescriptor = Reflect.getOwnPropertyDescriptor(heritage, property)

    if (property in target) {
      const targetPropertyDescriptor = Reflect.getOwnPropertyDescriptor(target, property)

      if (targetPropertyDescriptor)
        Object.defineProperty(target, property, { ...herintagePropertyDescriptor, ...clean(targetPropertyDescriptor) })

      continue
    }

    if (!herintagePropertyDescriptor) target[property] = heritage[property]

    else Object.defineProperty(target, property, herintagePropertyDescriptor)
  }
}
