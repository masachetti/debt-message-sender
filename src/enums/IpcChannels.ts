export const enum IpcChannels{
  GetIgnoreList= "ignoreList:Get",
  AddToIgnoreList = "ignoreList:Add",
  RemoveFromIgnoreList = "ignoreList:Remove",
  StartWpp = "wpp:Start",
  WppQrCode = "wpp:QrCode",
  WppReady = "wpp:Ready",
  WppSendMessage = "wpp:SendMessage"
}