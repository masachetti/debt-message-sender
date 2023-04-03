import React, { useContext, useState } from "react";
import { TokenProviderType } from "../types/tokenContext";
import { fetchToken } from "../api/fetchToken";

const AuthContext = React.createContext<TokenProviderType | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  let [token, setToken] = useState<string | null>(null);

  if (token === null) {
    fetchToken().then((token) => setToken(token));
  }

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as TokenProviderType;
