const baseURL = `${process.env.REACT_APP_API_URL}/api/v1/financeiro/cobranca/consultar/80`;

export function fetchBills(token: string): Promise<ApiGetBillsResponse> {
  const data = {
    apenas_ativo: false,
    status_generico: "vencido",
    forma_cobranca: [],
    data_inicio: "2023-01-01T16:00:00.000Z",
    data_fim: "2023-01-31T16:00:00.000Z",
    tipo_data: "data_vencimento",
    order_by: "data_vencimento",
    order_by_key: "ASC",
    encrypted: false,
    empresa: [],
  };
  return fetch(baseURL, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
  }).then((response) => response.json());
}
