import { GenericObject } from "./GenericObject"

export interface StoreProps<T extends GenericObject> {
  fileName: string,
  defaults: T
}

