import React, { useContext, useEffect, useState } from "react";
import { fetchToken } from "../api/fetchToken";
import { fetchBills } from "../api/fetchBills";
import { fetchCustomerDebts } from "../api/fetchCustomerDebts";
import { createCustomer } from "../models/Customer";

function getUniqueCustomers(customers: Array<ApiCustomer>) {
  return customers.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.cpf_cnpj === value.cpf_cnpj)
  );
}

interface CustomersContextValue {
  customers: Array<Customer>;
  isFetching: boolean;
}

const CustomersContext = React.createContext<CustomersContextValue | null>(
  null
);

export const CustomersProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [data, setData] = useState<Array<Customer>>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchToken().then((token) => {
      fetchBills(token).then(async (data: ApiGetBillsResponse) => {
        let customerList = data.cobrancas.data.map(
          (d) => d.cliente_servico.cliente
        );
        let uniqueCustomers = getUniqueCustomers(customerList);

        let customersWithExpiredDebts: Array<Customer> = await Promise.all(
          uniqueCustomers.map(async (customer) =>
            fetchCustomerDebts({
              token,
              customerDocument: customer.cpf_cnpj,
            }).then((debtsResponse) =>
              createCustomer({
                customerData: customer,
                debtsData: debtsResponse,
              })
            )
          )
        );
        setData(customersWithExpiredDebts);
        setIsFetching(false);
      });
    });
  }, []);

  let value = {
    customers: data,
    isFetching,
  };
  return (
    <CustomersContext.Provider value={value}>
      {children}
    </CustomersContext.Provider>
  );
};

export const useCustomers = () =>
  useContext(CustomersContext) as CustomersContextValue;
