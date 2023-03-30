import { HostDevice } from "venom-bot";

export type LoggedStatusResponse = {
  status: "logged";
  phoneNumber: string;
  profileName: string;
  device: HostDevice;
};

export type NotLoggedStatusResponse = {
  status: "not-logged";
  qrCode: string;
};

export type TPhoneState = "Success" | "Fail" | "NotNecessary" | null;
export type PhoneStatesMap = Map<
  TClient,
  [TPhoneState, TPhoneState, TPhoneState]
>;

export type WppStatusResponse = LoggedStatusResponse | NotLoggedStatusResponse;
