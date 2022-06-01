export interface InheritOptions {
  blacklist: (string | symbol)[]
  if(property: string | symbol): boolean
}

const DEFAULT_BLACKLIST = [ 'constructor', 'prototype' ]

const clean = <T>(record: T): T =>
  Object.fromEntries(
    Object.entries(record).filter(([key, value]) => value !== undefined)
  ) as T

const ROOT_CONSTRUCTOR = Object.getPrototypeOf(function() {})
const ROOT_PROTOTYPE = Object.getPrototypeOf({})
const ROOTS = [ROOT_CONSTRUCTOR, ROOT_PROTOTYPE]

export const inherit = (target: any, heritage: any, options: InheritOptions) => {
  const { blacklist: bl, if: allow } = options
  const blacklist = bl.concat(DEFAULT_BLACKLIST)

  if (!ROOTS.includes(Object.getPrototypeOf(heritage)))

    inherit(target, Object.getPrototypeOf(heritage), options)

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

inherit.inheritancesOf = (target: Function) => {
  const inheritances: Function[] = []
  let current = Object.getPrototypeOf(target)

  while(current !== ROOT_CONSTRUCTOR) {
    inheritances.push(current)
    current = Object.getPrototypeOf(current)
  }

  return inheritances
}
