const baseURL = `${process.env.REACT_APP_API_URL}/api/v1/integracao/Customere/financeiro?`;

type FetchCustomerDebtsParams = { token: string; customerDocument: string };

export function fetchCustomerDebts({
  token,
  customerDocument,
}: FetchCustomerDebtsParams): Promise<ApiGetCustomerDebtsResponse> {
  let fullURL =
    baseURL +
    new URLSearchParams({
      busca: "cpf_cnpj",
      termo_busca: customerDocument,
      apenas_pendente: "sim",
      data_fim: new Date().toISOString().slice(0, 10),
    });
  return fetch(fullURL, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
  }).then((response) => response.json());
}
