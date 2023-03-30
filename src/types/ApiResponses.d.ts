export type CobrancasResponse = {
  cobrancas: {
    current_page: number;
    last_page: number;
    data: [TCobranca];
    [string]: any;
  };
  [string]: any;
};

export type TCobranca = {
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
    cliente: TCliente;
    [string]: any;
  };
  [string]: any;
};

export type TCliente = {
  ativo: boolean;
  codigo_client: number;
  nome_razaosocial: string;
  cpf_cnpj: string;
  telefone_primario: string;
  telefone_secundario: string | null;
  telefone_terciario: string | null;
  [string]: any;
};

export type FaturasClienteResponse = {
  faturas: TFatura[];
  status: string;
  msg: string;
};

export type TFatura = {
  codigo_barras: string;
  data_vencimento: string;
  id_fatura: number;
  link: string;
  status: string;
  valor: number;
  detalhamento: TDetalheFatura[];
  [string]: any;
};

export type TDetalheFatura = {
  descricao: string;
  valor: number;
};
