import React, { useState } from "react";
import CardTextIcon from "./icons/CardText";
import MessagePreview from "./MessagePreview";
import CheckIcon from "./icons/Check";
import XIcon from "./icons/X";
import DashIcon from "./icons/Dash";

interface WppTableProps {
  className?: string;
  selectedDebtsByCustomer: Map<Customer, Array<Debt>>;
  messages: Map<Customer, string>;
  phonesState: PhoneStatesMap;
}

function createPhoneRep(
  phoneState: PhoneState,
  customerPhone: Customer["secondPhone"]
) {
  const rep = (content: JSX.Element) => (
    <div className="flex justify-center max-h-12">{content}</div>
  );
  if (phoneState === "Success")
    return rep(<CheckIcon className="text-green-600" size={46} />);
  if (phoneState === "Fail") {
    return rep(<XIcon className="text-red-600" size={46} />);
  }
  if (phoneState === "NotNecessary" || !!!customerPhone) {
    return rep(<DashIcon className="text-gray-600" size={46} />);
  }
  return rep(<>{customerPhone}</>);
}

const WppTable = ({
  className = "",
  selectedDebtsByCustomer,
  messages,
  phonesState,
}: WppTableProps) => {
  const [customerToShowMessagePreview, setCustomerToShowMessagePreview] =
    useState<Customer | null>(null);

  const openMessagePreview = (customer: Customer) =>
    setCustomerToShowMessagePreview(customer);

  const closeMessagePreview = () => setCustomerToShowMessagePreview(null);

  const customers = [...selectedDebtsByCustomer.keys()];

  return (
    <>
      <div className={`CustomerTable ${className}`}>
        <table>
          <thead>
            <tr className="[&>th]:bg-indigo-600 [&>th]:text-white">
              <th colSpan={2}>Customere</th>
              <th>Faturas selecionadas</th>
              <th>Mensagem</th>
              <th>Telefone 1</th>
              <th>Telefone 2</th>
              <th>Telefone 3</th>
            </tr>
          </thead>
          <tbody className="[&>tr>td]:bg-indigo-200">
            {customers.map((customer) => (
              <tr>
                <td colSpan={2}>{customer.name}</td>
                <td>
                  <div className="flex justify-center max-h-12">
                    {selectedDebtsByCustomer.get(customer)!.length}
                  </div>
                </td>
                <td>
                  <div
                    className="flex justify-center max-h-12"
                    onClick={() => openMessagePreview(customer)}
                  >
                    <CardTextIcon size={35} className={"cursor-pointer"} />
                  </div>
                </td>
                <td>
                  {createPhoneRep(
                    phonesState.get(customer)![0],
                    customer.firstPhone
                  )}
                </td>
                <td>
                  {createPhoneRep(
                    phonesState.get(customer)![1],
                    customer.secondPhone
                  )}
                </td>
                <td>
                  {createPhoneRep(
                    phonesState.get(customer)![2],
                    customer.thirdPhone
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {customerToShowMessagePreview && (
        <MessagePreview
          message={messages.get(customerToShowMessagePreview) || ""}
          onClose={closeMessagePreview}
        />
      )}
    </>
  );
};

export default WppTable;
