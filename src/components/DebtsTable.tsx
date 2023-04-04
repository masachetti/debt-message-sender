import React, { Fragment, useState } from "react";
import { useCustomersSelection } from "../context/customerSelectionContext";
import { AnimatePresence, motion } from "framer-motion";
import LinkIcon from "./icons/Link";
import CopyIcon from "./icons/Copy";
import ChevronDownIcon from "./icons/ChevronDown";
import {
  calculateDifferenceBetweenDates,
  makeDateFromBrDateString,
} from "../utils/date";

interface DebtsTableProps {
  customer: Customer;
  className?: string;
  onCopyToClipboardSuccess?: () => void;
  onCopyToClipboardFail?: () => void;
}

const DebtsTable: React.FC<DebtsTableProps> = ({
  customer,
  className = "",
  onCopyToClipboardFail,
  onCopyToClipboardSuccess,
}) => {
  const { toggleAllCustomerDebts, toggleDebt, debtsMap } =
    useCustomersSelection();
  let { debts } = customer;

  const [isDebtDetailsOpen, setIsDebtDetailsOpen] = useState(() => {
    let debtDetailsMap = new Map<Debt, boolean>(
      debts.map((debt) => [debt, false])
    );
    return debtDetailsMap;
  });

  function copyBarCodeToClipboard(debt: Debt) {
    navigator.clipboard.writeText(debt.barCode).then(
      () => {
        if (onCopyToClipboardSuccess) onCopyToClipboardSuccess();
      },
      () => {
        if (onCopyToClipboardFail) onCopyToClipboardFail();
      }
    );
  }

  function toggleDebtDetails(debt: Debt) {
    let prev = isDebtDetailsOpen.get(debt);
    isDebtDetailsOpen.set(debt, !prev);
    setIsDebtDetailsOpen(new Map(isDebtDetailsOpen));
  }

  return (
    <div className={`DebtsTable ${className}`}>
      <table>
        <thead>
          <tr className="[&>th]:bg-gray-400">
            <th
              onDoubleClick={() => toggleAllCustomerDebts(customer)}
              onMouseDown={(ev) => ev.preventDefault()}
            >
              Check
            </th>
            <th colSpan={2}>Vencimento</th>
            <th>Dias Vencido</th>
            <th>Link Boleto</th>
            <th>Codigo de Barras</th>
            <th>Valor</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {debts.map((debt) => (
            <Fragment key={debt.debtId}>
              <tr>
                <td onClick={() => toggleDebt(debt)}>
                  <input
                    type="checkbox"
                    checked={debtsMap!.get(debt)}
                    onChange={() => {}}
                  />
                </td>
                <td colSpan={2}>{debt.dueDate}</td>
                <td>
                  {calculateDifferenceBetweenDates(
                    makeDateFromBrDateString(debt.dueDate),
                    new Date()
                  )}
                </td>
                <td>
                  <a
                    className="flex justify-center"
                    target="_blank"
                    href={debt.link}
                  >
                    <LinkIcon strokeWidth={1} />
                  </a>
                </td>
                <td onClick={() => copyBarCodeToClipboard(debt)}>
                  <div className="flex justify-center cursor-pointer">
                    <CopyIcon strokeWidth={1} />
                  </div>
                </td>
                <td>{"R$" + debt.value}</td>
                <td
                  onClick={() => toggleDebtDetails(debt)}
                  className="flex justify-center"
                >
                  <motion.div
                    className="w-fit"
                    variants={{
                      open: { transform: "rotate(180deg)" },
                      closed: { transform: "rotate(0deg)" },
                    }}
                    animate={isDebtDetailsOpen.get(debt) ? "open" : "closed"}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDownIcon
                      strokeWidth={1}
                      size={25}
                      className="cursor-pointer"
                    />
                  </motion.div>
                </td>
              </tr>
              <AnimatePresence>
                {isDebtDetailsOpen.get(debt) && (
                  <tr className="[&>td]:bg-stone-400">
                    <td className="p-0"></td>
                    <motion.td
                      colSpan={7}
                      initial={{ padding: 0 }}
                      animate={{ padding: "8px 16px" }}
                      exit={{ padding: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        layout
                        className="overflow-hidden"
                        initial={{ maxHeight: 0 }}
                        animate={{ maxHeight: "15vh" }}
                        exit={{ maxHeight: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ul>
                          {debt.details.map((detail, index) => (
                            <li key={index}>{detail.description}</li>
                          ))}
                        </ul>
                      </motion.div>
                    </motion.td>
                  </tr>
                )}
              </AnimatePresence>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DebtsTable;
