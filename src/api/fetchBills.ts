const baseURL = `${process.env.REACT_APP_API_URL}/api/v1/financeiro/cobranca/consultar/80?page=`;

function firstDayOfMonth() {
  let date = new Date();
  date.setDate(1);
  return date;
}

function dateString(date: Date) {
  return date.toISOString().slice(0, 10);
}

export interface FetchBillsParams {
  token: string;
  page?: number;
}

export function fetchBills({
  token,
  page = 1,
}: FetchBillsParams): Promise<ApiGetBillsResponse> {
  const data = {
    apenas_ativo: false,
    status_generico: "vencido",
    forma_cobranca: [],
    data_inicio: dateString(firstDayOfMonth()),
    data_fim: dateString(new Date()),
    tipo_data: "data_vencimento",
    order_by: "data_vencimento",
    order_by_key: "ASC",
    encrypted: false,
    empresa: [],
  };
  return fetch(`${baseURL}${page}`, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
  }).then((response) => response.json());
}
