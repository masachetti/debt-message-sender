import React, { useContext, useState } from "react";
import useIgnoreList from "../hooks/useIgnoreList";

type TIgnoredCustomersContext = {
  loading: boolean;
  ignoredCustomers: ReturnType<typeof useIgnoreList>["ignoreList"];
  setCustomerAsIgnored: (customer: Customer) => void;
  removeCustomerFromIgnored: (customer: CustomerNameAndId) => void;
};

const IgnoredCustomersContext =
  React.createContext<TIgnoredCustomersContext | null>(null);

export const IgnoredCustomersProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const {
    ignoreList: ignoredCustomers,
    setIgnoreList,
    loading,
  } = useIgnoreList();

  const setCustomerAsIgnored = ({ name, customerId }: Customer) => {
    electronApi
      .addToIgnoreList({ name, customerId })
      .then((newIgnoreList) => setIgnoreList(newIgnoreList));
  };

  const removeCustomerFromIgnored = (customer: CustomerNameAndId) => {
    electronApi
      .removeFromIgnoreList(customer)
      .then((newIgnoreList) => setIgnoreList(newIgnoreList));
  };

  let value = {
    loading,
    ignoredCustomers,
    setCustomerAsIgnored,
    removeCustomerFromIgnored,
  };
  return (
    <IgnoredCustomersContext.Provider value={value}>
      {children}
    </IgnoredCustomersContext.Provider>
  );
};

export const useIgnoredCustomers = () =>
  useContext(IgnoredCustomersContext) as TIgnoredCustomersContext;
