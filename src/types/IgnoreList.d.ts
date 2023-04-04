type IgnoredUser = CustomerNameAndId;
interface IgnoreListStore extends GenericObject {
  ignoreList: Array<IgnoredUser>;
}
