import { useState } from "react";
import mockData from "./customers.json";

export function useMockCustomers() {
  const [data] = useState<Array<Customer>>(() => {
    let customers = mockData.clients;
    return customers.map(convertCustomer);
  });

  console.log("Inside mocked Data > Data > ", data);
  return { data };
}

function convertCustomer(customer: typeof mockData.clients[0]): Customer {
  return {
    customerId: customer.cpf_cnpj,
    firstPhone: customer.telefone_primario,
    secondPhone: customer.telefone_secundario,
    thirdPhone: customer.telefone_terciario,
    name: customer.nome_razaosocial,
    bills: customer.faturas.map(convertBill),
  };
}

function convertBill(bill: typeof mockData.clients[0]["faturas"][0]): Debt {
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
