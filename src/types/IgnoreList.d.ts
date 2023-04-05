type IgnoredCustomer = CustomerNameAndId;
interface IgnoreListStore extends GenericObject {
  ignoreList: Array<IgnoredCustomer>;
}
