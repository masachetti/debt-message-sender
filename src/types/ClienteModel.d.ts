import { FaturasClienteResponse, TCliente, TDetalheFatura, TFatura } from "./ApiResponses";

type TBill = {
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

type TClient = {
  name : TCliente['nome_razaosocial'];
  clientId : TCliente['cpf_cnpj'];
  firstPhone : TCliente['telefone_primario'];
  secondPhone : TCliente['telefone_secundario'];
  thirdPhone : TCliente['telefone_terciario'];
  bills: TBill[]
}

export type CreateClient = (params: {
  clientData: TCliente;
  billsData: FaturasClienteResponse;
}) => TClient;

export type ClientNameAndId = Pick<TClient, "name" | "clientId">;
