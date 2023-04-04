type Debt = {
  debtId: ApiDebt["id_fatura"];
  barCode: ApiDebt["codigo_barras"];
  dueDate: ApiDebt["data_vencimento"];
  link: ApiDebt["link"];
  status: ApiDebt["status"];
  value: ApiDebt["valor"];
  details: Array<DebtDetails>;
};

type DebtDetails = {
  description: ApiDebtDetails["descricao"];
  value: ApiDebtDetails["valor"];
};

type Customer = {
  name: ApiCustomer["nome_razaosocial"];
  customerId: ApiCustomer["cpf_cnpj"];
  firstPhone: ApiCustomer["telefone_primario"];
  secondPhone: ApiCustomer["telefone_secundario"];
  thirdPhone: ApiCustomer["telefone_terciario"];
  debts: Array<Debt>;
};

type CreateCustomer = (params: {
  customerData: ApiCustomer;
  debtsData: ApiGetCustomerDebtsResponse;
}) => Customer;

type CustomerNameAndId = Pick<Customer, "name" | "customerId">;
