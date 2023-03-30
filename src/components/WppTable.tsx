import React, { useState } from "react";
import { useClientsSelection } from "../context/clientsContext";
import { useIgnoredClients } from "../context/ignoredClientsContext";
import { useMessages } from "../hooks/useMessages";
import CardTextIcon from "./icons/CardText";
import { TBill, TClient } from "../types/ClienteModel";
import MessagePreview from "./MessagePreview";
import { PhoneStatesMap, TPhoneState } from "../types/Wpp";
import CheckIcon from "./icons/Check";
import XIcon from "./icons/X";
import DashIcon from "./icons/Dash";

interface WppTableProps {
  className?: string;
  selectedBillsByClient: Map<TClient, Array<TBill>>;
  messages: Map<TClient, string>;
  phonesState: PhoneStatesMap;
}

function createPhoneRep(
  phoneState: TPhoneState ,
  clientPhone: TClient["secondPhone"]
) {
  const rep = (content: JSX.Element) => (
    <div className="flex justify-center max-h-12">{content}</div>
  );
  if (phoneState === "Success")
    return rep(<CheckIcon className="text-green-600" size={46}/>);
  if (phoneState === "Fail") {
    return rep(<XIcon className="text-red-600" size={46}/>);
  }
  if (phoneState === "NotNecessary" || !!!clientPhone) {
    return rep(<DashIcon className="text-gray-600" size={46}/>);
  }
  return rep(<>{clientPhone}</>);
}

const WppTable = ({
  className = "",
  selectedBillsByClient,
  messages,
  phonesState,
}: WppTableProps) => {
  const [clientToShowMessagePreview, setClientToShowMessagePreview] =
    useState<TClient | null>(null);

  const openMessagePreview = (client: TClient) =>
    setClientToShowMessagePreview(client);

  const closeMessagePreview = () => setClientToShowMessagePreview(null);

  const clients = [...selectedBillsByClient.keys()];

  return (
    <>
      <div className={`ClientTable ${className}`}>
        <table>
          <thead>
            <tr className="[&>th]:bg-indigo-600 [&>th]:text-white">
              <th colSpan={2}>Cliente</th>
              <th>Faturas selecionadas</th>
              <th>Mensagem</th>
              <th>Telefone 1</th>
              <th>Telefone 2</th>
              <th>Telefone 3</th>
            </tr>
          </thead>
          <tbody className="[&>tr>td]:bg-indigo-200">
            {clients.map((client) => (
              <tr>
                <td colSpan={2}>{client.name}</td>
                <td>
                  <div className="flex justify-center max-h-12">
                    {selectedBillsByClient.get(client)!.length}
                  </div>
                </td>
                <td>
                  <div
                    className="flex justify-center max-h-12"
                    onClick={() => openMessagePreview(client)}
                  >
                    <CardTextIcon size={35} className={"cursor-pointer"} />
                  </div>
                </td>
                <td>{createPhoneRep(phonesState.get(client)![0], client.firstPhone)}</td>
                <td>{createPhoneRep(phonesState.get(client)![1], client.secondPhone)}</td>
                <td>{createPhoneRep(phonesState.get(client)![2], client.thirdPhone)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {clientToShowMessagePreview && (
        <MessagePreview
          message={messages.get(clientToShowMessagePreview) || ""}
          onClose={closeMessagePreview}
        />
      )}
    </>
  );
};

export default WppTable;
