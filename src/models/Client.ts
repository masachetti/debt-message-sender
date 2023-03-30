import { CreateClient, TBill, TClient } from "../types/ClienteModel";

export const createClient: CreateClient = ({ clientData, billsData }) => {
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

  let client: TClient = {
    clientId: clientData.cpf_cnpj,
    name: clientData.nome_razaosocial,
    firstPhone: clientData.telefone_primario,
    secondPhone: clientData.telefone_secundario,
    thirdPhone: clientData.telefone_terciario,
    bills,
  };

  return client;
};
