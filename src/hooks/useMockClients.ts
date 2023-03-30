import { useState } from "react";
import { TBill, TClient } from "../types/ClienteModel";
import mockData from "./clients.json";

export function useMockClients() {
  const [data] = useState<TClient[]>(() => {
    let clients = mockData.clients;
    return clients.map(convertClient);
  });

  console.log("Inside mocked Data > Data > ", data);
  return { data };
}

function convertClient(client: typeof mockData.clients[0]): TClient {
  return {
    clientId: client.cpf_cnpj,
    firstPhone: client.telefone_primario,
    secondPhone: client.telefone_secundario,
    thirdPhone: client.telefone_terciario,
    name: client.nome_razaosocial,
    bills: client.faturas.map(convertBill),
  };
}

function convertBill(bill: typeof mockData.clients[0]["faturas"][0]): TBill {
  return {
    barCode: bill.codigo_barras,
    billId: bill.id_fatura,
    dueDate: bill.data_vencimento,
    link: bill.link,
    status: bill.status,
    value: bill.valor,
    details: bill.detalhamento.map((d) => ({
      description: d.descricao,
      value: d.valor,
    })),
  };
}
