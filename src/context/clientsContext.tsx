import React, { useContext, useState } from "react";
import { useClientsWithExpiredBills } from "../hooks/useClientsWithExpiredBills";
import { useMockClients } from "../hooks/useMockClients";
import { TClient, TBill } from "../types/ClienteModel";

interface IClientsContext {
  loading: boolean;
  clientList: Array<TClient> | null;
  clientsMap: Map<TClient, boolean> | null;
  billsMap: Map<TBill, boolean> | null;
  toggleClient: (client: TClient) => void;
  toggleAllClients: () => void;
  toggleBill: (bill: TBill) => void;
  toggleAllClientBills: (client: TClient) => void;
}

const ClientsSelectionContext = React.createContext<IClientsContext | null>(
  null
);

export const ClientsSelectionProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data, loading } = useClientsWithExpiredBills();
  // const { data } = useMockClients();
  // let loading = false;

  const [clientsMap, setClientsMap] =
    useState<IClientsContext["clientsMap"]>(null);

  const [billsMap, setBillsMap] = useState<IClientsContext["billsMap"]>(null);

  if (!loading && !clientsMap) {
    const _clientMap = new Map(data!.map((client) => [client, false]));
    const bills = data!.map((client) => client.bills).flat();
    const _billsMap = new Map(bills.map((bill) => [bill, true]));
    setClientsMap(_clientMap);
    setBillsMap(_billsMap);
  }

  const updateClientsMap = () => setClientsMap(new Map(clientsMap));
  const updateBillsMap = () => setBillsMap(new Map(billsMap));

  const toggleClient = (client: TClient) => {
    let prev = clientsMap!.get(client);
    clientsMap!.set(client, !prev);
    updateClientsMap();
  };

  const toggleAllClients = () => {
    let stateForAllSelections = true;
    if ([...clientsMap!.values()].every((v) => v)) {
      stateForAllSelections = false;
    }
    [...clientsMap!.keys()].forEach((k) =>
      clientsMap!.set(k, stateForAllSelections)
    );
    updateClientsMap();
  };

  const toggleBill = (bill: TBill) => {
    let prev = billsMap!.get(bill);
    billsMap!.set(bill, !prev);
    updateBillsMap();
  };

  const toggleAllClientBills = (client: TClient) => {
    let stateForAllBills = true;
    let stateOfClientBills = client.bills.map((k) => billsMap!.get(k));

    if (stateOfClientBills.every((v) => v)) {
      stateForAllBills = false;
    }
    client.bills.forEach((k) => billsMap!.set(k, stateForAllBills));
    updateBillsMap();
  };

  const clientList = data;
  
  let value = {
    clientList,
    clientsMap,
    billsMap,
    loading,
    toggleClient,
    toggleAllClients,
    toggleBill,
    toggleAllClientBills,
  };
  return (
    <ClientsSelectionContext.Provider value={value}>
      {children}
    </ClientsSelectionContext.Provider>
  );
};

export const useClientsSelection = () =>
  useContext(ClientsSelectionContext) as IClientsContext;
