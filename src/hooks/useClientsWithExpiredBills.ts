import { useState } from "react";
import { fetchCobrancas } from "../api/fetchCobrancas";
import { fecthCustomerBills } from "../api/fetchCustomerBills";
import { useAuth } from "../context/tokenContext";
import { createClient } from "../models/Client";
import {
  CobrancasResponse,
  TCliente,
} from "../types/ApiResponses";
import { TClient } from "../types/ClienteModel";

function getUniqueClients(clients: TCliente[]) {
  return clients.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.cpf_cnpj === value.cpf_cnpj)
  );
}

export function useClientsWithExpiredBills() {
  const { token } = useAuth();
  const [data, setData] = useState<TClient[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  if (token) {
    if (!data && !fetching) {
      setFetching(true);
      fetchCobrancas(token).then(async (data: CobrancasResponse) => {
        let clientList = data.cobrancas.data.map(
          (d) => d.cliente_servico.cliente
        );
        let uniqueClients = getUniqueClients(clientList);

        let clientsWithExpiredBills: TClient[] = [];
        clientsWithExpiredBills = await Promise.all(
          uniqueClients.map(
            async (client) =>
              fecthCustomerBills({
                token,
                clientDocument: client.cpf_cnpj,
              }).then((faturaResponse) =>
                createClient({ clientData: client, billsData: faturaResponse })
              )
          )
        );
        console.log(clientsWithExpiredBills);
        setData(clientsWithExpiredBills);
        setLoading(false);
      });
    }
  }

  return { data, loading };
}
