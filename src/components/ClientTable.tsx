import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useOrderedTable } from "../hooks/useOrderedTable";
import { TClient } from "../types/ClienteModel";
import { useClientsSelection } from "../context/clientsContext";
import { useIgnoredClients } from "../context/ignoredClientsContext";
import BanIcon from "./icons/Ban";

type ClientTableProps = {
  className?: string;
  onClientRowDoubleClick: (client: TClient) => void;
};

const rowTransition = { duration: 0.15 };
const rowExit = { transform: "translate(100%, 0)" };
const cellExit = { padding: 0 };
const cellDivExit = { maxHeight: 0 };

const ClientTable = ({
  className = "",
  onClientRowDoubleClick,
}: ClientTableProps) => {
  const { clientsMap, toggleClient, toggleAllClients } = useClientsSelection();
  const { ignoredClients, setClientAsIgnored } = useIgnoredClients();

  let allowedClients = [...clientsMap!.keys()].filter(
    (client) =>
      !ignoredClients.find((iClient) => iClient.clientId === client.clientId)
  );

  const { orderedContent, toggleOrdering, icons } = useOrderedTable(
    allowedClients,
    ["name", "bills"],
    18
  );

  const ignoreButtonHandler = (client: TClient) => setClientAsIgnored(client);
  const onCheckBoxCellClick = (client: TClient) => toggleClient(client);

  return (
    <div className={`ClientTable ${className}`}>
      <table>
        <thead>
          <tr className="[&>th]:bg-indigo-600 [&>th]:text-white">
            <th
              onDoubleClick={toggleAllClients}
              onMouseDown={(ev) => ev.preventDefault()}
            >
              Selecionar
            </th>
            <th colSpan={3}>
              <div className="relative">
                Nome
                <div
                  className="absolute top-1 right-0 cursor-pointer"
                  onClick={() => toggleOrdering("name")}
                >
                  {icons["name"]}
                </div>
              </div>
            </th>
            <th colSpan={2}>
              <div className="relative">
                Faturas Vencidas
                <div
                  className="absolute top-1 right-0 cursor-pointer"
                  onClick={() => toggleOrdering("bills")}
                >
                  {icons["bills"]}
                </div>
              </div>
            </th>
            <th>Ignorar</th>
          </tr>
        </thead>
        <tbody className="[&>tr>td]:bg-indigo-200">
          <AnimatePresence>
            {orderedContent.map((client) => (
              <motion.tr
                key={client.clientId}
                layout
                onDoubleClick={() => onClientRowDoubleClick(client)}
                className="hover:brightness-90"
                exit={rowExit}
                transition={rowTransition}
              >
                <motion.td
                  exit={cellExit}
                  transition={rowTransition}
                  onClick={() => onCheckBoxCellClick(client)}
                >
                  <motion.div
                    className="flex justify-center max-h-12"
                    exit={cellDivExit}
                    transition={rowTransition}
                  >
                    <input
                      type="checkbox"
                      checked={clientsMap!.get(client)}
                      onChange={() => {}}
                    />
                  </motion.div>
                </motion.td>
                <motion.td
                  exit={cellExit}
                  transition={rowTransition}
                  colSpan={3}
                >
                  <motion.div
                    exit={cellDivExit}
                    transition={rowTransition}
                    className="max-h-12"
                  >
                    {client.name}
                  </motion.div>
                </motion.td>
                <motion.td
                  exit={cellExit}
                  transition={rowTransition}
                  colSpan={2}
                >
                  <motion.div
                    className="flex justify-center max-h-12"
                    exit={cellDivExit}
                    transition={rowTransition}
                  >
                    {client.bills.length}
                  </motion.div>
                </motion.td>
                <motion.td exit={cellExit} transition={rowTransition}>
                  <motion.div
                    className="flex justify-center max-h-12"
                    exit={cellDivExit}
                    transition={rowTransition}
                  >
                    <button
                      className="flex items-center gap-1 border rounded-xl bg-zinc-500 hover:bg-zinc-600 active:bg-zinc-700 text-white px-2 py-1 text-xs"
                      onClick={() => ignoreButtonHandler(client)}
                    >
                      <BanIcon size={13} /> Ignorar
                    </button>
                  </motion.div>
                </motion.td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
