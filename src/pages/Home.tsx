import React, { useState } from "react";
import ClientTable from "../components/ClientTable";
import { TClient } from "../types/ClienteModel";
import Loading from "./../components/Loading";
import { AnimatePresence, motion } from "framer-motion";
import SendIcon from "../components/icons/Send";
import { useClientsSelection } from "../context/clientsContext";
import { useIgnoredClients } from "../context/ignoredClientsContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
  const [search, setSearch] = useState("");
  const { loading: clientsLoading } = useClientsSelection();
  const { loading: ignoredClientsLoading } = useIgnoredClients();

  const navigate = useNavigate();

  const updateSearch: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    setSearch(ev.target.value);
  };

  // if (search) {
  //   displayClients = displayClients!.filter((client) =>
  //     client.nome_razaosocial.toLowerCase().includes(search.toLowerCase())
  //   );
  //   displayIgnoredClients = displayIgnoredClients!.filter((client) =>
  //     client.nome_razaosocial.toLowerCase().includes(search.toLowerCase())
  //   );
  // }

  let loading = clientsLoading || ignoredClientsLoading;

  const goToClientPage = (client: TClient) => {
    let url = "/client/" + client.clientId;
    navigate(url);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <AnimatePresence>
        {loading ? (
          <motion.div
            className="absolute"
            key={0}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loading size={10} circleWidth={1} />
          </motion.div>
        ) : (
          <div className="py-10 px-20 flex flex-col items-center overflow-y-hidden h-screen">
            <div className="flex justify-between items-center w-full px-2">
              <input
                type="text"
                name="search"
                placeholder="Procurar..."
                className="w-4/5 py-1 px-2 border-2 outline-0 rounded-xl border-indigo-400 focus:border-indigo-900"
                onChange={updateSearch}
              />
              <Link to={"/ignored-clients"}>
                <button className="text-white bg-neutral-800 border rounded-2xl px-3 py-2 text-sm font-bold">
                  Ver ignorados
                </button>
              </Link>
            </div>
            <ClientTable
              className="max-h-[80vh] my-4"
              onClientRowDoubleClick={goToClientPage}
            />
            <Link to={"/wpp"}>
              <button className="GreenButton">
                <span>Enviar mensagens </span>
                <div className="self-center">
                  <SendIcon size={18} />
                </div>
              </button>
            </Link>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;
