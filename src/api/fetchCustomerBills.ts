import { FaturasClienteResponse } from "../types/ApiResponses";

const baseURL = `${process.env.REACT_APP_API_URL}/api/v1/integracao/cliente/financeiro?`;

type GetFaturasClienteParams = { token: string; clientDocument: string };

export function fecthCustomerBills({
  token,
  clientDocument,
}: GetFaturasClienteParams): Promise<FaturasClienteResponse> {
  let fullURL =
    baseURL +
    new URLSearchParams({
      busca: "cpf_cnpj",
      termo_busca: clientDocument,
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
