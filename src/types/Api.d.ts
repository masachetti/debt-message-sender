type ApiGetBillsResponse = {
  cobrancas: {
    current_page: number;
    last_page: number;
    data: [ApiBill];
    [string]: any;
  };
  [string]: any;
};

type ApiGetCustomerDebtsResponse = {
  faturas: Array<ApiDebt>;
  status: string;
  msg: string;
};

type ApiCustomer = {
  ativo: boolean;
  codigo_client: number;
  nome_razaosocial: string;
  cpf_cnpj: string;
  telefone_primario: string;
  telefone_secundario: string | null;
  telefone_terciario: string | null;
  [string]: any;
};

type ApiBill = {
  id_fatura: number;
  id_cobranca: number;
  valor: number;
  vencido: boolean;
  dias_vencido: number;
  descricao: string;
  data_vencimento_br: string;
  data_vencimento: string;
  cliente_servico: {
    id_cliente: number;
    cliente: ApiCustomer;
    [string]: any;
  };
  [string]: any;
};

type ApiDebt = {
  codigo_barras: string;
  data_vencimento: string;
  id_fatura: number;
  link: string;
  status: string;
  valor: number;
  detalhamento: Array<ApiDebtDetails>;
  [string]: any;
};

type ApiDebtDetails = {
  descricao: string;
  valor: number;
};
