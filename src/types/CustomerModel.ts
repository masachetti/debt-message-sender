import { CustomerBillsResponse, TCliente, TDetalheFatura, TFatura } from "./ApiResponses";

export type TBill = {
  billId: TFatura['id_fatura']
  barCode: TFatura['codigo_barras'];
  dueDate: TFatura['data_vencimento'];
  link: TFatura['link'];
  status: TFatura['status'];
  value: TFatura['valor'];
  details: Array<TBillDetails>;
}

type TBillDetails = {
  description: TDetalheFatura['descricao'];
  value: TDetalheFatura['valor'];
}

export type TCustomer = {
  name : TCliente['nome_razaosocial'];
  customerId : TCliente['cpf_cnpj'];
  firstPhone : TCliente['telefone_primario'];
  secondPhone : TCliente['telefone_secundario'];
  thirdPhone : TCliente['telefone_terciario'];
  bills: TBill[]
}

export type CreateCustomer = (params: {
  customerData: TCliente;
  billsData: CustomerBillsResponse;
}) => TCustomer;

export type CustomerNameAndId = Pick<TCustomer, "name" | "customerId">;
