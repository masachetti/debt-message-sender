import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useSortedContent } from "../hooks/useSortedContent";
import { useCustomersSelection } from "../context/customerSelectionContext";
import { useIgnoredCustomers } from "../context/ignoredCustomersContext";
import BanIcon from "./icons/Ban";
import { useCustomers } from "../context/customersContext";
import usePersistTableScrollPosition from "../hooks/usePersistentScrollPosition";

type CustomersTableProps = {
  className?: string;
  searchString: string;
  documentType?: "CPF" | "CNPJ" | null;
  onCustomerRowDoubleClick: (customer: Customer) => void;
};

const rowTransition = { duration: 0.15 };
const rowExit = { transform: "translate(100%, 0)" };
const cellExit = { padding: 0 };
const cellDivExit = { maxHeight: 0 };

function filterCustomers(
  customers: Array<Customer>,
  searchString: string,
  ignoredCustomers: Array<IgnoredCustomer>,
  documentType: "CPF" | "CNPJ" | null
) {
  const isCustomerSearchMatched = (cu: Customer) =>
    cu.name.toUpperCase().includes(searchString.toUpperCase());
  const isCustomerIgnored = (cu: Customer) =>
    ignoredCustomers.find(
      (iCu: IgnoredCustomer) => cu.customerId === iCu.customerId
    );
  const isCustomerDocumentTypeMatched = (cu: Customer) => {
    if (!documentType) return true;
    if (documentType === "CNPJ") return cu.customerId.length >= 14;
    if (documentType === "CPF") return cu.customerId.length < 14;
  };

  return customers.filter((customer) => {
    return (
      isCustomerSearchMatched(customer) &&
      !isCustomerIgnored(customer) &&
      isCustomerDocumentTypeMatched(customer)
    );
  });
}

const CustomersTable = ({
  className = "",
  searchString,
  documentType = null,
  onCustomerRowDoubleClick,
}: CustomersTableProps) => {
  const { customers } = useCustomers();
  const { customersMap, toggleCustomer, toggleAllCustomers } =
    useCustomersSelection();
  const { ignoredCustomers, setCustomerAsIgnored } = useIgnoredCustomers();

  const { elementRef: tableRef, onScroll } = usePersistTableScrollPosition(
    "customer_table_scroll_position"
  );

  let filteredCustomers = filterCustomers(
    customers,
    searchString,
    ignoredCustomers,
    documentType
  );

  const { sortedContent, toggleSortOrder, icons } = useSortedContent(
    filteredCustomers,
    ["name", "debts"],
    18
  );

  const ignoreButtonHandler = (customer: Customer) =>
    setCustomerAsIgnored(customer);
  const onCheckBoxCellClick = (customer: Customer) => toggleCustomer(customer);

  return (
    <div
      className={`CustomersTable ${className}`}
      onScroll={onScroll}
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
                  onClick={() => toggleSortOrder("name")}
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
                  onClick={() => toggleSortOrder("debts")}
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
            {sortedContent.map((customer) => (
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
