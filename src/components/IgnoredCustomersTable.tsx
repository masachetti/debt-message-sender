import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSortedContent } from "../hooks/useSortedContent";
import { useIgnoredCustomers } from "../context/ignoredCustomersContext";
import CheckIcon from "./icons/Check";
import usePersistentScrollPosition from "../hooks/usePersistentScrollPosition";

const transition = { duration: 0.15 };
const cellExit = { padding: 0 };
const cellDivExit = { maxHeight: 0 };
const rowExit = { transform: "translate(100%, 0)" };

const IgnoredCustomersTable = ({ className = "", searchString = "" }) => {
  const { ignoredCustomers, removeCustomerFromIgnored } = useIgnoredCustomers();

  const filteredCustomers = ignoredCustomers.filter((iCustomer) =>
    iCustomer.name.toLowerCase().includes(searchString.toLowerCase())
  );

  const { sortedContent, toggleSortOrder, icons } = useSortedContent(
    filteredCustomers,
    ["name"],
    18
  );
  const { elementRef: tableRef, onScroll } = usePersistentScrollPosition(
    "ignored_customer_table_scroll_position"
  );
  return (
    <div
      className={`IgnoredCustomersTable ${className}`}
      ref={tableRef}
      onScroll={onScroll}
    >
      <table>
        <thead>
          <tr className="[&>th]:bg-neutral-600 [&>th]:text-white">
            <th colSpan={3}>
              <div className="relative">
                Nome
                <div
                  className="absolute top-1 right-0 cursor-pointer"
                  onClick={() => toggleSortOrder("name")}
                >
                  {icons["name"]}
                </div>
              </div>
            </th>
            <th>Habilitar</th>
          </tr>
        </thead>
        <tbody className="[&>tr>td]:bg-neutral-800 [&>tr>td]:text-white">
          <AnimatePresence>
            {sortedContent.map((customer) => (
              <motion.tr
                layout
                exit={rowExit}
                transition={transition}
                key={customer.customerId}
              >
                <motion.td exit={cellExit} transition={transition} colSpan={3}>
                  <motion.div
                    exit={cellDivExit}
                    transition={transition}
                    className="max-h-12"
                  >
                    {customer.name}
                  </motion.div>
                </motion.td>
                <motion.td exit={cellExit} transition={transition}>
                  <motion.div
                    className="flex justify-center max-h-12"
                    exit={cellDivExit}
                    transition={transition}
                  >
                    <button
                      className="flex items-center justify-center gap-1 border rounded-2xl bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-3 py-0.5 text-sm font-bold"
                      onClick={() => removeCustomerFromIgnored(customer)}
                    >
                      <CheckIcon size={25} /> Habilitar
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

export default IgnoredCustomersTable;
