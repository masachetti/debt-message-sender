import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./app.css";
import { CustomersSelectionProvider } from "./context/customerSelectionContext";
import { IgnoredCustomersProvider } from "./context/ignoredCustomersContext";
import CustomerDataView from "./pages/CustomerDataView";
import IgnoredCustomers from "./pages/IgnoredCustomers";
import Wpp from "./pages/Wpp";
import dotenv from "dotenv";
import { CustomersProvider } from "./context/customersContext";

dotenv.config();

function App() {
  return (
    <CustomersProvider>
      <IgnoredCustomersProvider>
        <CustomersSelectionProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/customer/:customerId"
                element={<CustomerDataView />}
              />
              <Route path="/ignored-customers" element={<IgnoredCustomers />} />
              <Route path="/wpp" element={<Wpp />} />
            </Routes>
          </HashRouter>
        </CustomersSelectionProvider>
      </IgnoredCustomersProvider>
    </CustomersProvider>
  );
}

export default App;
