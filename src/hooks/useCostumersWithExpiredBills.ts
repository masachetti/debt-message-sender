import { useState } from "react";
import { getCobrancas } from "../api/cobrancas";
import { getCustomerBills } from "../api/faturas";
import { useAuth } from "../context/tokenContext";
import { createCustomer } from "../models/Customer";
import {
  CobrancasResponse,
  TCliente,
} from "../types/ApiResponses";
import { TCustomer } from "../types/CustomerModel";

function getUniqueCustomers(customers: TCliente[]) {
  return customers.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.cpf_cnpj === value.cpf_cnpj)
  );
}

export function useCustomersWithExpiredBills() {
  const { token } = useAuth();
  const [data, setData] = useState<TCustomer[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  if (token) {
    if (!data && !fetching) {
      setFetching(true);
      getCobrancas(token).then(async (data: CobrancasResponse) => {
        let customerList = data.cobrancas.data.map(
          (d) => d.cliente_servico.cliente
        );
        let uniqueCustomers = getUniqueCustomers(customerList);

        let customersWithExpiredBills: TCustomer[] = [];
        customersWithExpiredBills = await Promise.all(
          uniqueCustomers.map(
            async (customer) =>
              getCustomerBills({
                token,
                customerDocument: customer.cpf_cnpj,
              }).then((faturaResponse) =>
                createCustomer({ customerData: customer, billsData: faturaResponse })
              )
          )
        );
        console.log(customersWithExpiredBills);
        setData(customersWithExpiredBills);
        setLoading(false);
      });
    }
  }

  return { data, loading };
}
