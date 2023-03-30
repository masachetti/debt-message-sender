import React from "react";
import { AuthProvider } from "./context/tokenContext";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./app.css";
import { ClientsSelectionProvider } from "./context/clientsContext";
import { IgnoredClientsProvider } from "./context/ignoredClientsContext";
import ClientDataView from "./pages/ClientDataView";
import IgnoredClients from "./pages/IgnoredClients";
import Wpp from "./pages/Wpp";
import dotenv from "dotenv"

dotenv.config();

function App() {
  return (
    <AuthProvider>
      <IgnoredClientsProvider>
        <ClientsSelectionProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/client/:clientId" element={<ClientDataView />} />
              <Route path="/ignored-clients" element={<IgnoredClients />} />
              <Route path="/wpp" element={<Wpp />} />
            </Routes>
          </HashRouter>
        </ClientsSelectionProvider>
      </IgnoredClientsProvider>
    </AuthProvider>
  );
}

export default App;
