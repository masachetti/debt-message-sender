import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useOrderedTable } from "../hooks/useOrderedTable";
import { useCustomersSelection } from "../context/customerSelectionContext";
import { useIgnoredCustomers } from "../context/ignoredCustomersContext";
import BanIcon from "./icons/Ban";
import { useCustomers } from "../context/customersContext";

const CUSTOMER_TABLE_SCROLL_STORAGE_KEY = "customer_table_scroll_position";

type CustomersTableProps = {
  className?: string;
  onCustomerRowDoubleClick: (customer: Customer) => void;
};

const rowTransition = { duration: 0.15 };
const rowExit = { transform: "translate(100%, 0)" };
const cellExit = { padding: 0 };
const cellDivExit = { maxHeight: 0 };

const CustomersTable = ({
  className = "",
  onCustomerRowDoubleClick,
}: CustomersTableProps) => {
  const { customers } = useCustomers();
  const { customersMap, toggleCustomer, toggleAllCustomers } =
    useCustomersSelection();
  const { ignoredCustomers, setCustomerAsIgnored } = useIgnoredCustomers();

  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentTableScrollPosition = sessionStorage.getItem(
      CUSTOMER_TABLE_SCROLL_STORAGE_KEY
    );
    if (currentTableScrollPosition) {
      if (tableRef && tableRef.current) {
        tableRef.current.scrollTop = Number(currentTableScrollPosition);
      }
    }
  }, []);

  let allowedCustomers = customers.filter(
    (customer) =>
      !ignoredCustomers.find(
        (iCustomer) => iCustomer.customerId === customer.customerId
      )
  );

  const { orderedContent, toggleOrdering, icons } = useOrderedTable(
    allowedCustomers,
    ["name", "debts"],
    18
  );

  const onTableScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    let element = e.target as HTMLDivElement;
    let currentScrollPosition = element.scrollTop;
    sessionStorage.setItem(
      CUSTOMER_TABLE_SCROLL_STORAGE_KEY,
      "" + currentScrollPosition
    );
  };

  const ignoreButtonHandler = (customer: Customer) =>
    setCustomerAsIgnored(customer);
  const onCheckBoxCellClick = (customer: Customer) => toggleCustomer(customer);

  return (
    <div
      className={`CustomersTable ${className}`}
      onScroll={onTableScroll}
      ref={tableRef}
    >
      <table>
        <thead>
          <tr className="[&>th]:bg-indigo-600 [&>th]:text-white">
            <th
              onDoubleClick={toggleAllCustomers}
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
                  onClick={() => toggleOrdering("debts")}
                >
                  {icons["debts"]}
                </div>
              </div>
            </th>
            <th>Ignorar</th>
          </tr>
        </thead>
        <tbody className="[&>tr>td]:bg-indigo-200">
          <AnimatePresence>
            {orderedContent.map((customer) => (
              <motion.tr
                key={customer.customerId}
                layout
                onDoubleClick={() => onCustomerRowDoubleClick(customer)}
                className="hover:brightness-90"
                exit={rowExit}
                transition={rowTransition}
              >
                <motion.td
                  exit={cellExit}
                  transition={rowTransition}
                  onClick={() => onCheckBoxCellClick(customer)}
                >
                  <motion.div
                    className="flex justify-center max-h-12"
                    exit={cellDivExit}
                    transition={rowTransition}
                  >
                    <input
                      type="checkbox"
                      checked={customersMap!.get(customer)}
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
                    {customer.name}
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
                    {customer.debts.length}
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
                      onClick={() => ignoreButtonHandler(customer)}
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

export default CustomersTable;
