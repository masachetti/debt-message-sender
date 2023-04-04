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

async function coverAllBillsPages(token: string) {
  let firstBillsPage = await fetchBills({ token });

  let { last_page, current_page } = firstBillsPage.cobrancas;
  if (current_page < last_page) {
    let pageNumbers = Array.from(
      { length: last_page - current_page },
      (_, i) => i + 2
    );
    let followingPages = await Promise.all(
      pageNumbers.map((page) => fetchBills({ token, page }))
    );
    return [firstBillsPage, ...followingPages];
  }

  return [firstBillsPage];
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
    fetchToken().then(async (token) => {
      let billsResponseList = await coverAllBillsPages(token);
      let customerList = billsResponseList
        .map((singleResponse) =>
          singleResponse.cobrancas.data.map(
            (bill) => bill.cliente_servico.cliente
          )
        )
        .flat();
      let uniqueCustomers = getUniqueCustomers(customerList);
      let activeCustomers = uniqueCustomers.filter(
        (customer) => customer.ativo
      );

      let customersWithExpiredDebts: Array<Customer> = await Promise.all(
        activeCustomers.map(async (customer) =>
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
