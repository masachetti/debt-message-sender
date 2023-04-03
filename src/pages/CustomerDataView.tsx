import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BillsTable from "../components/BillsTable";
import { useParams } from "react-router-dom";
import { useCustomersSelection } from "../context/customersContext";
import ArrowBackIcon from "../components/icons/ArrowBack";
import { Link } from "react-router-dom";

const CustomerDataView = () => {
  const { customerId } = useParams();
  const { customersMap: customersMap } = useCustomersSelection();
  const customerData = [...customersMap!.keys()].find(
    (customer) => customer.customerId === customerId
  );

  const [notifyCopyResult, setNotifyCopyResult] = useState<
    null | "success" | "fail"
  >(null);

  function notifyCopy(state: "success" | "fail", persistTime: number) {
    setNotifyCopyResult(state);
    setTimeout(() => setNotifyCopyResult(null), persistTime);
  }

  let copyNotification: JSX.Element | null = null;
  if (notifyCopyResult) {
    let notificationClassName =
      "rounded-3xl bg-cyan-200 border border-cyan-400 px-4 py-1 w-60 text-center";
    let notificationText = "Copiado para a área de transferência!";

    if (notifyCopyResult === "fail") {
      notificationClassName =
        "rounded-3xl bg-red-200 border border-red-400 px-4 py-1 w-64 text-center";
      notificationText = "Falha ao tentar copiar para a área de transferência!";
    }
    copyNotification = (
      <motion.div
        className={notificationClassName}
        initial={{ transform: "translate(0px, 100px)" }}
        animate={{ transform: "translate(0px, 50px)" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {notificationText}
      </motion.div>
    );
  }

  return (
    <div className="py-8 px-20 flex flex-col items-center overflow-y-hidden h-screen">
      <Link to={"/"} className="self-start mb-5 mt-0 text-zinc-700">
        <ArrowBackIcon size={30}></ArrowBackIcon>
      </Link>
      {customerData && (
        <>
          <div className="rounded-md border bg-gray-400 py-4 px-8 h-fit w-full">
            <p>
              <b>Nome:</b> {customerData.name}
            </p>
            <p>
              <b>Documento:</b> {customerData.customerId}
            </p>
            <p>
              <b>Telefone:</b> {customerData.firstPhone}
            </p>
          </div>
          <BillsTable
            customer={customerData}
            className="max-h-[50vh] my-4"
            onCopyToClipboardFail={() => {
              notifyCopy("fail", 1000);
            }}
            onCopyToClipboardSuccess={() => {
              notifyCopy("success", 1000);
            }}
          />
          <AnimatePresence>{copyNotification}</AnimatePresence>
        </>
      )}
    </div>
  );
};

export default CustomerDataView;
