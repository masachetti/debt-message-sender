import { IpcRendererEvent, ipcRenderer } from "electron";
import { IpcChannels } from "../../enums/IpcChannels";
import { ClientInfo } from "whatsapp-web.js";

function getIgnoreList(): Promise<Array<IgnoredCustomer>> {
  return ipcRenderer.invoke(IpcChannels.GetIgnoreList);
}

function addToIgnoreList(user: IgnoredCustomer): Promise<Array<IgnoredCustomer>> {
  return ipcRenderer.invoke(IpcChannels.AddToIgnoreList, user);
}

function removeFromIgnoreList(user: IgnoredCustomer): Promise<Array<IgnoredCustomer>> {
  return ipcRenderer.invoke(IpcChannels.RemoveFromIgnoreList, user);
}

function startWpp() {
  ipcRenderer.send(IpcChannels.StartWpp);
}

function sendWppMessage(phoneNumber: string, message: string){
  return ipcRenderer.invoke(IpcChannels.WppSendMessage, phoneNumber, message)
}

function handleWppQrCode(
  callback: (event: IpcRendererEvent, qr: string) => void
) {
  ipcRenderer.on(IpcChannels.WppQrCode, callback);
  return () => ipcRenderer.removeListener(IpcChannels.WppQrCode, callback);
}

function handleWppReady(
  callback: (event: IpcRendererEvent, clientInfo: ClientInfo) => void
) {
  ipcRenderer.once(IpcChannels.WppReady, callback);
  return () => ipcRenderer.removeListener(IpcChannels.WppReady, callback);
}

export default {
  getIgnoreList,
  addToIgnoreList,
  removeFromIgnoreList,
  startWpp,
  handleWppQrCode,
  handleWppReady,
  sendWppMessage
};
