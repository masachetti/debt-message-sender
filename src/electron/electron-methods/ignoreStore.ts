import { Store } from "../store";

const ignoreListStore = new Store<IgnoreListStore>({
  fileName: "ignore-list",
  defaults: {
    ignoreList: [],
  },
});

export const getIgnoreList = () => ignoreListStore.get("ignoreList");

export const addToIgnoreList = (
  event: Electron.IpcMainInvokeEvent,
  user: IgnoredCustomer
) => {
  let blackList = ignoreListStore.get("ignoreList");
  if (blackList!.find((v) => v.customerId === user.customerId)) return blackList;
  let newBlackList = [...blackList!, user];
  ignoreListStore.set("ignoreList", newBlackList);
  return newBlackList;
};

export const removeFromIgnoreList = (
  event: Electron.IpcMainInvokeEvent,
  user: IgnoredCustomer
) => {
  let blackList = ignoreListStore.get("ignoreList");
  let newBlackList = blackList!.filter((v) => v.customerId !== user.customerId);
  ignoreListStore.set("ignoreList", newBlackList);
  return newBlackList;
};
