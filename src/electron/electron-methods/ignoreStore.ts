import { IgnoredUser, IgnoreListStore } from "../../types/IgnoreList";
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
  user: IgnoredUser
) => {
  let blackList = ignoreListStore.get("ignoreList");
  if (blackList!.find((v) => v.clientId === user.clientId)) return blackList;
  let newBlackList = [...blackList!, user];
  ignoreListStore.set("ignoreList", newBlackList);
  return newBlackList;
};

export const removeFromIgnoreList = (
  event: Electron.IpcMainInvokeEvent,
  user: IgnoredUser
) => {
  let blackList = ignoreListStore.get("ignoreList");
  let newBlackList = blackList!.filter((v) => v.clientId !== user.clientId);
  ignoreListStore.set("ignoreList", newBlackList);
  return newBlackList;
};
