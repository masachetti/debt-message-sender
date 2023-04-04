import { useState } from "react";
import { getCobrancas } from "../api/bills";
import { getCustomerDebts } from "../api/debts";
import { useAuth } from "../context/tokenContext";
import { createCustomer } from "../models/Customer";

function getUniqueCustomers(customers: Array<ApiCustomer>) {
  return customers.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.cpf_cnpj === value.cpf_cnpj)
  );
}

export function useCustomersWithExpiredDebts() {
  const { token } = useAuth();
  const [data, setData] = useState<Array<Customer> | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  if (token) {
    if (!data && !fetching) {
      setFetching(true);
      getCobrancas(token).then(async (data: ApiGetBillsResponse) => {
        let customerList = data.cobrancas.data.map(
          (d) => d.cliente_servico.cliente
        );
        let uniqueCustomers = getUniqueCustomers(customerList);

        let customersWithExpiredDebts: Array<Customer> = [];
        customersWithExpiredDebts = await Promise.all(
          uniqueCustomers.map(async (customer) =>
            getCustomerDebts({
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
        console.log(customersWithExpiredDebts);
        setData(customersWithExpiredDebts);
        setLoading(false);
      });
    }
  }

  return { data, loading };
}
