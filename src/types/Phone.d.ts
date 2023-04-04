type PhoneState = "Success" | "Fail" | "NotNecessary" | null;
type PhoneStatesMap = Map<Customer, [PhoneState, PhoneState, PhoneState]>;
