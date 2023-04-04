import React, { useContext, useState } from "react";
import { useCustomers } from "./customersContext";

interface CustomerSelectionContextValue {
  customersMap: Map<Customer, boolean> | null;
  debtsMap: Map<Debt, boolean> | null;
  toggleCustomer: (customer: Customer) => void;
  toggleAllCustomers: () => void;
  toggleDebt: (debt: Debt) => void;
  toggleAllCustomerDebts: (customer: Customer) => void;
}

const CustomersSelectionContext =
  React.createContext<CustomerSelectionContextValue | null>(null);

export const CustomersSelectionProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { customers, isFetching } = useCustomers();

  const [customersMap, setCustomersMap] =
    useState<CustomerSelectionContextValue["customersMap"]>(null);

  const [debtsMap, setDebtsMap] =
    useState<CustomerSelectionContextValue["debtsMap"]>(null);

  if (!isFetching && !customersMap) {
    const _customersMap = new Map(
      customers.map((customer) => [customer, false])
    );
    const debts = customers.map((customer) => customer.debts).flat();
    const _debtsMap = new Map(debts.map((debt) => [debt, true]));
    setCustomersMap(_customersMap);
    setDebtsMap(_debtsMap);
  }

  const updateCustomersMap = () => setCustomersMap(new Map(customersMap));
  const updateDebtsMap = () => setDebtsMap(new Map(debtsMap));

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
    customers.forEach((k) => customersMap!.set(k, stateForAllSelections));
    updateCustomersMap();
  };

  const toggleDebt = (debt: Debt) => {
    let prev = debtsMap!.get(debt);
    debtsMap!.set(debt, !prev);
    updateDebtsMap();
  };

  const toggleAllCustomerDebts = (customer: Customer) => {
    let stateForAllDebts = true;
    let stateOfCustomerDebts = customer.debts.map((k) => debtsMap!.get(k));

    if (stateOfCustomerDebts.every((v) => v)) {
      stateForAllDebts = false;
    }
    customer.debts.forEach((k) => debtsMap!.set(k, stateForAllDebts));
    updateDebtsMap();
  };

  let value = {
    customersMap,
    debtsMap,
    toggleCustomer,
    toggleAllCustomers,
    toggleDebt,
    toggleAllCustomerDebts,
  };
  return (
    <CustomersSelectionContext.Provider value={value}>
      {children}
    </CustomersSelectionContext.Provider>
  );
};

export const useCustomersSelection = () =>
  useContext(CustomersSelectionContext) as CustomerSelectionContextValue;
