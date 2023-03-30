import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../components/Loading";
import { ClientInfo } from "whatsapp-web.js";
import WppTable from "../components/WppTable";
import { Link } from "react-router-dom";
import ArrowBackIcon from "../components/icons/ArrowBack";
import WppMain from "../components/WppMain";

const Wpp = () => {
  const [qrCode, setQrCode] = useState<null | string>(null);
  const [wppClientInfo, setWppClientInfo] = useState<null | ClientInfo>(null);

  useEffect(() => {
    let qrCodeHandlerCleaner = electronApi.handleWppQrCode((event, qrCode) => {
      setQrCode(qrCode);
    });
    let wppReadyHandlerCleaner = electronApi.handleWppReady(
      (event, clientInfo) => {
        setWppClientInfo(clientInfo);
      }
    );
    electronApi.startWpp();
    return () => {
      qrCodeHandlerCleaner();
      wppReadyHandlerCleaner();
    };
  }, []);

  let isLoading = !!!(qrCode || wppClientInfo);
  let isWppLogged = !!wppClientInfo;

  // let isLoading = false;
  // let isWppLogged = true;

  const loadingComponent = () => (
    <motion.div
      className="absolute"
      key={0}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Loading size={10} circleWidth={1} />
    </motion.div>
  );

  const qrCodeComponent = () => (
    <div className="relative flex items-center justify-center flex-col bg-gray-600 border-2 border-gray-600 rounded-lg py-10 mx-20">
      <Link to={"/"} className="self-start mb-5 mt-0 text-gray-200 absolute left-4 top-4">
        <ArrowBackIcon size={30}></ArrowBackIcon>
      </Link>
      <p className="mb-10 text-lg w-2/3 text-justify text-gray-200 font-bold">
        Abra o WhatsApp em seu celular com a conta que deseja utilizar para o
        envio de mensagens. Abra o menu no canto superior direito e vá para
        "Aparelhos Conectados". Clique em "Conectar um aparelho" e escaneie o QR
        Code abaixo.
      </p>
      <QRCodeSVG
        value={qrCode || ""}
        size={250}
        className="border-4 rounded-lg border-gray-300"
      />
    </div>
  );

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <AnimatePresence>
        {isLoading
          ? loadingComponent()
          : isWppLogged
          ? <WppMain wppClientInfo={wppClientInfo!}/>
          : qrCodeComponent()}
      </AnimatePresence>
    </div>
  );
};

export default Wpp;
