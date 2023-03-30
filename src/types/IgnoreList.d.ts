import { ClientNameAndId } from "./ClienteModel";

export type IgnoredUser = ClientNameAndId

export interface IgnoreListStore extends GenericObject{
  ignoreList: IgnoredUser[];
}