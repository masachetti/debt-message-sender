type GenericObject = {
  [key: string]: any;
};
interface StoreProps<T extends GenericObject> {
  fileName: string;
  defaults: T;
}
