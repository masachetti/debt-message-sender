
export const createCustomer: CreateCustomer = ({ customerData, debtsData }) => {
  let debts: Array<Debt> = debtsData.faturas.map((debt) => ({
    barCode: debt.codigo_barras,
    dueDate: debt.data_vencimento,
    billId: debt.id_fatura,
    link: debt.link,
    status: debt.status,
    value: debt.valor,
    details: debt.detalhamento.map((description) => ({
      description: description.descricao,
      value: description.valor,
    })),
  }));

  let customer: Customer = {
    customerId: customerData.cpf_cnpj,
    name: customerData.nome_razaosocial,
    firstPhone: customerData.telefone_primario,
    secondPhone: customerData.telefone_secundario,
    thirdPhone: customerData.telefone_terciario,
    debts,
  };

  return customer;
};
