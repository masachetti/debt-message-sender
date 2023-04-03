import { CustomerNameAndId } from "./CustomerModel";

export type IgnoredUser = CustomerNameAndId

export interface IgnoreListStore extends GenericObject{
  ignoreList: IgnoredUser[];
}