import { getOwnProperties } from "./getOwnProperties"
import { getOwnPropertyDescriptor } from "./getOwnPropertyDescriptor"
import { AnyObject } from "./types"

export const getOwnPropertyDescriptors = (object: AnyObject) => {
  return getOwnProperties(object)
    .map((property) => [property, getOwnPropertyDescriptor(object, property)] as const)
}