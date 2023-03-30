import React, { useState } from "react";
import WppTable from "./WppTable";
import { TClient } from "../types/ClienteModel";
import { useClientsSelection } from "../context/clientsContext";
import { useIgnoredClients } from "../context/ignoredClientsContext";
import { useMessages } from "../hooks/useMessages";
import { PhoneStatesMap } from "../types/Wpp";
import { Link } from "react-router-dom";
import ArrowBackIcon from "./icons/ArrowBack";
import { ClientInfo } from "whatsapp-web.js";

const WppMain = ({ wppClientInfo }: { wppClientInfo: ClientInfo }) => {
  const { clientList, clientsMap, billsMap } = useClientsSelection();
  const { ignoredClients } = useIgnoredClients();

  const [phones, setPhones] = useState<PhoneStatesMap>(() => {
    return new Map(clientList.map((client) => [client, [null, null, null]]));
  });

  let selectedClients = clientList.filter((client) => {
    let isSelected = clientsMap?.get(client);
    if (!isSelected) return false;
    let isIgnored = ignoredClients.find(
      (iClient) => iClient.clientId === client.clientId
    );
    return !isIgnored;
  });

  const selectedBillsMappedByClient = new Map(
    selectedClients.map((client) => [
      client,
      client.bills.filter(billsMap!.get.bind(billsMap)),
    ])
  );

  const messages = useMessages(selectedBillsMappedByClient);

  const startSendingMessages = () => {
    selectedClients.forEach((client) => {
      // let clientPhones = [
      //   client.firstPhone,
      //   client.secondPhone,
      //   client.thirdPhone,
      // ];
      let clientPhones = ["00000000000", "65999252721", "99999999999"];
      clientPhones.every(async (phone, index) => {
        if (phone) {
          let isMsgSended = await electronApi.sendWppMessage(
            phone,
            messages.get(client)!
          );
          let prevPhoneState = phones.get(client);
          if (!isMsgSended) {
            prevPhoneState![index] = "Fail";
            setPhones(new Map(phones));
            return true;
          }
          prevPhoneState![index] = "Success";
          if (index <= 1) prevPhoneState![2] = "NotNecessary";
          if (index === 0) prevPhoneState![1] = "NotNecessary";
          setPhones(new Map(phones));
          return false;
        }
      });
    });
  };

  return (
    <div className="relative flex flex-col h-screen py-20 items-center px-6 gap-10">
      <Link
        to={"/"}
        className="self-start mb-5 mt-0 text-gray-800 absolute left-4 top-4"
      >
        <ArrowBackIcon size={30}></ArrowBackIcon>
      </Link>
      <div className="bg-gray-400 w-fit py-3 px-6 rounded-2xl border border-gray-500 grid">
        <p className="text-lg font-bold place-self-center mb-3">
          WhatsApp Logado!
        </p>
        <p>
          <b>Nome do usuário:</b> {wppClientInfo?.pushname}
        </p>
        <p>
          <b>Telefone:</b> {wppClientInfo?.wid.user}
        </p>
      </div>
      <WppTable
        messages={messages}
        selectedBillsByClient={selectedBillsMappedByClient}
        phonesState={phones}
      ></WppTable>
      <button className="GreenButton" onClick={startSendingMessages}>
        Começar envio!
      </button>
    </div>
  );
};

export default WppMain;
