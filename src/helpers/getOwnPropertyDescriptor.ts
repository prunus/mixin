import { AnyObject } from "./types";

export const getOwnPropertyDescriptor = (
  from: AnyObject,
  property: keyof AnyObject
): PropertyDescriptor => Object.getOwnPropertyDescriptor(from, property) ?? {}
