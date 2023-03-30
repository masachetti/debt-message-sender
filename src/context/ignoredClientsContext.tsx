import React, { useContext, useState } from "react";
import useIgnoreList from "../hooks/useIgnoreList";
import { ClientNameAndId, TClient } from "../types/ClienteModel";

type TIgnoredClientsContext = {
  loading: boolean;
  ignoredClients: ReturnType<typeof useIgnoreList>["ignoreList"];
  setClientAsIgnored: (client: TClient) => void;
  removeClientFromIgnored: (client: ClientNameAndId) => void;
};

const IgnoredClientsContext =
  React.createContext<TIgnoredClientsContext | null>(null);

export const IgnoredClientsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const {
    ignoreList: ignoredClients,
    setIgnoreList,
    loading,
  } = useIgnoreList();

  const setClientAsIgnored = ({ name, clientId }: TClient) => {
    electronApi
      .addToIgnoreList({ name, clientId })
      .then((newIgnoreList) => setIgnoreList(newIgnoreList));
  };

  const removeClientFromIgnored = (client: ClientNameAndId) => {
    electronApi
      .removeFromIgnoreList(client)
      .then((newIgnoreList) => setIgnoreList(newIgnoreList));
  };

  let value = {
    loading,
    ignoredClients,
    setClientAsIgnored,
    removeClientFromIgnored,
  };
  return (
    <IgnoredClientsContext.Provider value={value}>
      {children}
    </IgnoredClientsContext.Provider>
  );
};

export const useIgnoredClients = () =>
  useContext(IgnoredClientsContext) as TIgnoredClientsContext;
