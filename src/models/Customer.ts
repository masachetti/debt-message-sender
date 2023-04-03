import { CreateCustomer, TBill, TCustomer } from "../types/CustomerModel";

export const createCustomer: CreateCustomer = ({ customerData, billsData }) => {
  let bills: TBill[] = billsData.faturas.map((bData) => ({
    barCode: bData.codigo_barras,
    dueDate: bData.data_vencimento,
    billId: bData.id_fatura,
    link: bData.link,
    status: bData.status,
    value: bData.valor,
    details: bData.detalhamento.map((d) => ({
      description: d.descricao,
      value: d.valor,
    })),
  }));

  let client: TCustomer = {
    customerId: customerData.cpf_cnpj,
    name: customerData.nome_razaosocial,
    firstPhone: customerData.telefone_primario,
    secondPhone: customerData.telefone_secundario,
    thirdPhone: customerData.telefone_terciario,
    bills,
  };

  return client;
};
