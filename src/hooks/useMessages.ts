import { TBill, TCustomer } from "../types/CustomerModel";
import {
  calculateDifferenceBetweenDates,
  makeDateFromBrDateString,
} from "../utils/date";

const getDaysAfterDueDate = (bill: TBill) =>
  calculateDifferenceBetweenDates(
    makeDateFromBrDateString(bill.dueDate),
    new Date()
  );

const createBillsString = (bills: Array<TBill>) => `Faturas em aberto:
------------------------------------------${bills
  .map(
    (bill) => `
Vencida a ${getDaysAfterDueDate(bill)} dias
Valor da fatura: R$ ${bill.value}
Link para o boleto: ${bill.link}
Código de barras: ${bill.barCode}
-------------------------------------------`
  )
  .join("")}
`;

const createFooter = (daysAfterDueDate: number) =>
  daysAfterDueDate >= 15
    ? "-Caso ja tenha realizado o pagamento e/ou acordo, desconsidere a mensagem. Obrigado!"
    : "-Caso ja tenha realizado o pagamento, desconsidere a mensagem. Obrigado!";

const messageFor3DaysAfterDueDate = (bills: Array<TBill>, footer: string) => `
SATT tecnologia, provedor de internet, informa.

Sua fatura esta vencida, evite a suspensão do sinal da sua internet.
SATT agradece sua parceria e atenção.
Tenha um ótimo dia.
${createBillsString(bills)}
${footer}
`;

const messageFor5DaysAfterDueDate = (bills: Array<TBill>, footer: string) => `
SATT tecnologia, provedor de internet, informa.

Sua fatura esta vencida a 05 dias, hoje é dia da suspensão do sinal da internet.
Evite a suspensão, realize o pagamento e informe a SATT por meio de nossos canais de atendimento.

SATT agradece sua parceria e atenção.
Tenha um ótimo dia.

${createBillsString(bills)}

${footer}
`;

const messageFor6DaysAfterDueDate = (bills: Array<TBill>, footer: string) => `
SATT tecnologia, provedor de internet, informa.

Devido a fatura em atraso a sua internet foi suspensa.
Continue navegando, regularize o pagamento e informe a SATT por meio de nossos canais de atendimento.

SATT agradece sua parceria e atenção.
Tenha um ótimo dia.

${createBillsString(bills)}

${footer}
`;

const messageFor15DaysAfterDueDate = (bills: Array<TBill>, footer: string) => `
SATT tecnologia, provedor de internet, informa.

AVISO
Sua fatura está a mais de 15 dias vencida.
Para evitar a remoção dos equipamentos em comodato, vamos renegociar os valores em abertos?
E continuar navegando com a SATT.

${createBillsString(bills)}

${footer}
`;

const messageFor30DaysAfterDueDate = (bills: Array<TBill>, footer: string) => `
SATT tecnologia, provedor de internet, informa.

AVISO URGENTE
Devido a fatura vencida a mais de 30 dias, seu contrato será cancelado em 48 horas.
Isso acarreterá no registro do seu CPF junto ao SERASA e ao sistema jurídico de cobrança.

Evite constrangimentos, regularize ou renegocie seus débitos.
Contate a SATT através de nossos canais de atendimento.

Tenha um ótimo dia.

${createBillsString(bills)}

${footer}
`;

function createMessage(customer: TCustomer, customerBills: Array<TBill>) {
  let billsDaysAfterDueDate = customerBills.map(getDaysAfterDueDate);
  let higherDaysAfterDueDate = Math.max(...billsDaysAfterDueDate);

  let footerMessage = createFooter(higherDaysAfterDueDate);
  if (higherDaysAfterDueDate >= 3 && higherDaysAfterDueDate < 5) {
    return messageFor3DaysAfterDueDate(customerBills, footerMessage);
  } else if (higherDaysAfterDueDate === 5) {
    return messageFor5DaysAfterDueDate(customerBills, footerMessage);
  } else if (higherDaysAfterDueDate >= 6 && higherDaysAfterDueDate < 15) {
    return messageFor6DaysAfterDueDate(customerBills, footerMessage);
  } else if (higherDaysAfterDueDate >= 15 && higherDaysAfterDueDate < 30) {
    return messageFor15DaysAfterDueDate(customerBills, footerMessage);
  } else if (higherDaysAfterDueDate >= 30) {
    return messageFor30DaysAfterDueDate(customerBills, footerMessage);
  }
  return "";
}

export function useMessages(
  selectedBillsByCustomer: Map<TCustomer, Array<TBill>>
): Map<TCustomer, string> {
  let messages = new Map();
  selectedBillsByCustomer.forEach((customerBills, customer) => {
    messages.set(customer, createMessage(customer, customerBills));
  });
  return messages;
}
