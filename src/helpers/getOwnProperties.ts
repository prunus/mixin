import { AnyObject } from "./types";

const blacklist: (keyof AnyObject)[] = [ 'prototype', 'constructor' ]

const filterBlacklist = <T extends keyof AnyObject>(value: T) => !blacklist.includes(value)

export const getOwnProperties = (object: AnyObject) => [
  ...Object.getOwnPropertyNames(object),
  ...Object.getOwnPropertySymbols(object)
].filter(filterBlacklist)
