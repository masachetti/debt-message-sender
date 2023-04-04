import React, { useContext, useState } from "react";
import { useCustomersWithExpiredBills } from "../hooks/useCostumersWithExpiredBills";
import { useMockCustomers } from "../hooks/useMockCustomers";

interface ICustomersContext {
  loading: boolean;
  customerList: Array<Customer> | null;
  customersMap: Map<Customer, boolean> | null;
  billsMap: Map<Debt, boolean> | null;
  toggleCustomer: (customer: Customer) => void;
  toggleAllCustomers: () => void;
  toggleBill: (bill: Debt) => void;
  toggleAllCustomerBills: (customer: Customer) => void;
}

const CustomersSelectionContext = React.createContext<ICustomersContext | null>(
  null
);

export const CustomersSelectionProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data, loading } = useCustomersWithExpiredBills();
  // const { data } = useMockCustomers();
  // let loading = false;

  const [customersMap, setCustomersMap] =
    useState<ICustomersContext["customersMap"]>(null);

  const [billsMap, setBillsMap] = useState<ICustomersContext["billsMap"]>(null);

  if (!loading && !customersMap) {
    const _customersMap = new Map(data!.map((customer) => [customer, false]));
    const bills = data!.map((customer) => customer.bills).flat();
    const _billsMap = new Map(bills.map((bill) => [bill, true]));
    setCustomersMap(_customersMap);
    setBillsMap(_billsMap);
  }

  const updateCustomersMap = () => setCustomersMap(new Map(customersMap));
  const updateBillsMap = () => setBillsMap(new Map(billsMap));

  const toggleCustomer = (customer: Customer) => {
    let prev = customersMap!.get(customer);
    customersMap!.set(customer, !prev);
    updateCustomersMap();
  };

  const toggleAllCustomers = () => {
    let stateForAllSelections = true;
    if ([...customersMap!.values()].every((v) => v)) {
      stateForAllSelections = false;
    }
    [...customersMap!.keys()].forEach((k) =>
      customersMap!.set(k, stateForAllSelections)
    );
    updateCustomersMap();
  };

  const toggleBill = (bill: Debt) => {
    let prev = billsMap!.get(bill);
    billsMap!.set(bill, !prev);
    updateBillsMap();
  };

  const toggleAllCustomerBills = (customer: Customer) => {
    let stateForAllBills = true;
    let stateOfCustomerBills = customer.bills.map((k) => billsMap!.get(k));

    if (stateOfCustomerBills.every((v) => v)) {
      stateForAllBills = false;
    }
    customer.bills.forEach((k) => billsMap!.set(k, stateForAllBills));
    updateBillsMap();
  };

  const customerList = data;
  
  let value = {
    customerList,
    customersMap: customersMap,
    billsMap,
    loading,
    toggleCustomer: toggleCustomer,
    toggleAllCustomers,
    toggleBill,
    toggleAllCustomerBills,
  };
  return (
    <CustomersSelectionContext.Provider value={value}>
      {children}
    </CustomersSelectionContext.Provider>
  );
};

export const useCustomersSelection = () =>
  useContext(CustomersSelectionContext) as ICustomersContext;
