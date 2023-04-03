import { useState } from "react";
import { TClient } from "../types/ClienteModel";
import { fetchToken } from "./fetchToken";
import { fetchCobrancas } from "./fetchCobrancas";
import { fecthCustomerBills } from "./fetchCustomerBills";
import { createClient } from "../models/Client";

function getUniqueObjectsFromArray<T>(
  array: Array<T>,
  matchFunction: (itemA: T, itemB: T) => boolean
) {
  return array.filter((itemA, index, self) => {
    index === self.findIndex((itemB) => matchFunction(itemA, itemB));
  });
}

export default function getCustomersWithExpiredBills() {
  const [data, setData] = useState<TClient[]>();
  const [isFetching, setIsFetching] = useState(true);

  fetchToken().then((token) => {
    fetchCobrancas(token).then(async ({ cobrancas }) => {
      let customerList = cobrancas.data.map((c) => c.cliente_servico.cliente);
      let uniqueCustomers = getUniqueObjectsFromArray(
        customerList,
        (customerA, customerB) => customerA.cpf_cnpj === customerB.cpf_cnpj
      );

      let customerWithExpiredBillsList = await Promise.all(
        uniqueCustomers.map(async (customer) =>
          fecthCustomerBills({
            token,
            clientDocument: customer.cpf_cnpj,
          }).then((response) =>
            createClient({ clientData: customer, billsData: response })
          )
        )
      );

      setData(customerWithExpiredBillsList);
      setIsFetching(false);
    });
  });

  return { data, isFetching };
}
