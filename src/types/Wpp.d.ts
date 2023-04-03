import { HostDevice } from "venom-bot";
import { TCustomer } from "./CustomerModel";

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
  TCustomer,
  [TPhoneState, TPhoneState, TPhoneState]
>;

export type WppStatusResponse = LoggedStatusResponse | NotLoggedStatusResponse;
