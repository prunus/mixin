import { Design } from "./models/Design"

export function Mixin(...traits: Function[]): ClassDecorator {
  return <TFunction extends Function>(target: TFunction) => {
    return Design.for(target, true).use(...traits.reverse()).class as TFunction
  }
}
