import {
  calculateDifferenceBetweenDates,
  makeDateFromBrDateString,
} from "../utils/date";

const getDaysAfterDueDate = (debt: Debt) =>
  calculateDifferenceBetweenDates(
    makeDateFromBrDateString(debt.dueDate),
    new Date()
  );

const createDebtsString = (debts: Array<Debt>) => `Faturas em aberto:
------------------------------------------${debts
  .map(
    (debt) => `
Vencida a ${getDaysAfterDueDate(debt)} dias
Valor da fatura: R$ ${debt.value}
Link para o boleto: ${debt.link}
Código de barras: ${debt.barCode}
-------------------------------------------`
  )
  .join("")}
`;

const createFooter = (daysAfterDueDate: number) =>
  daysAfterDueDate >= 15
    ? "-Caso ja tenha realizado o pagamento e/ou acordo, desconsidere a mensagem. Obrigado!"
    : "-Caso ja tenha realizado o pagamento, desconsidere a mensagem. Obrigado!";

const messageFor3DaysAfterDueDate = (debts: Array<Debt>, footer: string) => `
SATT tecnologia, provedor de internet, informa.

Sua fatura esta vencida, evite a suspensão do sinal da sua internet.
SATT agradece sua parceria e atenção.
Tenha um ótimo dia.
${createDebtsString(debts)}
${footer}
`;

const messageFor5DaysAfterDueDate = (debts: Array<Debt>, footer: string) => `
SATT tecnologia, provedor de internet, informa.

Sua fatura esta vencida a 05 dias, hoje é dia da suspensão do sinal da internet.
Evite a suspensão, realize o pagamento e informe a SATT por meio de nossos canais de atendimento.

SATT agradece sua parceria e atenção.
Tenha um ótimo dia.

${createDebtsString(debts)}

${footer}
`;

const messageFor6DaysAfterDueDate = (debts: Array<Debt>, footer: string) => `
SATT tecnologia, provedor de internet, informa.

Devido a fatura em atraso a sua internet foi suspensa.
Continue navegando, regularize o pagamento e informe a SATT por meio de nossos canais de atendimento.

SATT agradece sua parceria e atenção.
Tenha um ótimo dia.

${createDebtsString(debts)}

${footer}
`;

const messageFor15DaysAfterDueDate = (debts: Array<Debt>, footer: string) => `
SATT tecnologia, provedor de internet, informa.

AVISO
Sua fatura está a mais de 15 dias vencida.
Para evitar a remoção dos equipamentos em comodato, vamos renegociar os valores em abertos?
E continuar navegando com a SATT.

${createDebtsString(debts)}

${footer}
`;

const messageFor30DaysAfterDueDate = (debts: Array<Debt>, footer: string) => `
SATT tecnologia, provedor de internet, informa.

AVISO URGENTE
Devido a fatura vencida a mais de 30 dias, seu contrato será cancelado em 48 horas.
Isso acarreterá no registro do seu CPF junto ao SERASA e ao sistema jurídico de cobrança.

Evite constrangimentos, regularize ou renegocie seus débitos.
Contate a SATT através de nossos canais de atendimento.

Tenha um ótimo dia.

${createDebtsString(debts)}

${footer}
`;

function createMessage(customer: Customer, customerDebts: Array<Debt>) {
  let debtsDaysAfterDueDate = customerDebts.map(getDaysAfterDueDate);
  let higherDaysAfterDueDate = Math.max(...debtsDaysAfterDueDate);

  let footerMessage = createFooter(higherDaysAfterDueDate);
  if (higherDaysAfterDueDate >= 3 && higherDaysAfterDueDate < 5) {
    return messageFor3DaysAfterDueDate(customerDebts, footerMessage);
  } else if (higherDaysAfterDueDate === 5) {
    return messageFor5DaysAfterDueDate(customerDebts, footerMessage);
  } else if (higherDaysAfterDueDate >= 6 && higherDaysAfterDueDate < 15) {
    return messageFor6DaysAfterDueDate(customerDebts, footerMessage);
  } else if (higherDaysAfterDueDate >= 15 && higherDaysAfterDueDate < 30) {
    return messageFor15DaysAfterDueDate(customerDebts, footerMessage);
  } else if (higherDaysAfterDueDate >= 30) {
    return messageFor30DaysAfterDueDate(customerDebts, footerMessage);
  }
  return "";
}

export function useMessages(
  selectedDebtsByCustomer: Map<Customer, Array<Debt>>
): Map<Customer, string> {
  let messages = new Map();
  selectedDebtsByCustomer.forEach((customerDebts, customer) => {
    messages.set(customer, createMessage(customer, customerDebts));
  });
  return messages;
}
