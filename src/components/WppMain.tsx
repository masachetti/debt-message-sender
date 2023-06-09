import React, { useState } from "react";
import WppTable from "./WppTable";
import { useCustomersSelection } from "../context/customerSelectionContext";
import { useIgnoredCustomers } from "../context/ignoredCustomersContext";
import { useMessages } from "../hooks/useMessages";
import { Link } from "react-router-dom";
import ArrowBackIcon from "./icons/ArrowBack";
import { ClientInfo } from "whatsapp-web.js";
import { useCustomers } from "../context/customersContext";

const WppMain = ({ wppCustomerInfo }: { wppCustomerInfo: ClientInfo }) => {
  const { customers } = useCustomers()
  const { customersMap, debtsMap } = useCustomersSelection();
  const { ignoredCustomers } = useIgnoredCustomers();

  const [phones, setPhones] = useState<PhoneStatesMap>(() => {
    return new Map(
      customers.map((customer) => [customer, [null, null, null]])
    );
  });

  let selectedCustomers = customers.filter((customer) => {
    let isSelected = customersMap?.get(customer);
    if (!isSelected) return false;
    let isIgnored = ignoredCustomers.find(
      (iCustomer) => iCustomer.customerId === customer.customerId
    );
    return !isIgnored;
  });

  const selectedDebtsMappedByCustomer = new Map(
    selectedCustomers.map((customer) => [
      customer,
      customer.debts.filter(debtsMap!.get.bind(debtsMap)),
    ])
  );

  const messages = useMessages(selectedDebtsMappedByCustomer);

  const startSendingMessages = () => {
    selectedCustomers.forEach((customer) => {
      let customerPhones = [
        customer.firstPhone,
        customer.secondPhone,
        customer.thirdPhone,
      ];
      // let customerPhones = ["00000000000", "65999252721", "99999999999"];
      customerPhones.every(async (phone, index) => {
        if (phone) {
          let isMsgSended = await electronApi.sendWppMessage(
            phone,
            messages.get(customer)!
          );
          let prevPhoneState = phones.get(customer);
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
          <b>Nome do usuário:</b> {wppCustomerInfo?.pushname}
        </p>
        <p>
          <b>Telefone:</b> {wppCustomerInfo?.wid.user}
        </p>
      </div>
      <WppTable
        messages={messages}
        selectedDebtsByCustomer={selectedDebtsMappedByCustomer}
        phonesState={phones}
      ></WppTable>
      <button className="GreenButton" onClick={startSendingMessages}>
        Começar envio!
      </button>
    </div>
  );
};

export default WppMain;
