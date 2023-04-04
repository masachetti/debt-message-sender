import React, { Fragment, useState } from "react";
import { useCustomersSelection } from "../context/customersContext";
import { AnimatePresence, motion } from "framer-motion";
import LinkIcon from "./icons/Link";
import CopyIcon from "./icons/Copy";
import ChevronDownIcon from "./icons/ChevronDown";
import {
  calculateDifferenceBetweenDates,
  makeDateFromBrDateString,
} from "../utils/date";

interface BillsTableProps {
  customer: Customer;
  className?: string;
  onCopyToClipboardSuccess?: () => void;
  onCopyToClipboardFail?: () => void;
}

const BillsTable: React.FC<BillsTableProps> = ({
  customer,
  className = "",
  onCopyToClipboardFail,
  onCopyToClipboardSuccess,
}) => {
  const { toggleAllCustomerBills: toggleAllCustomerBills, toggleBill, billsMap } = useCustomersSelection();
  let { bills } = customer;

  const [isBillDetailsOpen, setIsBillDetailsOpen] = useState(() => {
    let billDetailsMap = new Map<Debt, boolean>(
      bills.map((bill) => [bill, false])
    );
    return billDetailsMap;
  });

  function copyBarCodeToClipboard(bill: Debt) {
    navigator.clipboard.writeText(bill.barCode).then(
      () => {
        if (onCopyToClipboardSuccess) onCopyToClipboardSuccess();
      },
      () => {
        if (onCopyToClipboardFail) onCopyToClipboardFail();
      }
    );
  }

  function toggleBillDetails(bill: Debt) {
    let prev = isBillDetailsOpen.get(bill)
    isBillDetailsOpen.set(bill, !prev);
    setIsBillDetailsOpen(new Map(isBillDetailsOpen));
  }

  return (
    <div className={`BillTable ${className}`}>
      <table>
        <thead>
          <tr className="[&>th]:bg-gray-400">
            <th
              onDoubleClick={() => toggleAllCustomerBills(customer)}
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
          {bills.map((bill) => (
            <Fragment key={bill.billId}>
              <tr>
                <td onClick={() => toggleBill(bill)}>
                  <input
                    type="checkbox"
                    checked={billsMap!.get(bill)}
                    onChange={() => {}}
                  />
                </td>
                <td colSpan={2}>{bill.dueDate}</td>
                <td>
                  {calculateDifferenceBetweenDates(
                    makeDateFromBrDateString(bill.dueDate),
                    new Date()
                  )}
                </td>
                <td>
                  <a
                    className="flex justify-center"
                    target="_blank"
                    href={bill.link}
                  >
                    <LinkIcon strokeWidth={1} />
                  </a>
                </td>
                <td onClick={() => copyBarCodeToClipboard(bill)}>
                  <div className="flex justify-center cursor-pointer">
                    <CopyIcon strokeWidth={1} />
                  </div>
                </td>
                <td>{"R$" + bill.value}</td>
                <td
                  onClick={() => toggleBillDetails(bill)}
                  className="flex justify-center"
                >
                  <motion.div
                    className="w-fit"
                    variants={{
                      open: { transform: "rotate(180deg)" },
                      closed: { transform: "rotate(0deg)" },
                    }}
                    animate={isBillDetailsOpen.get(bill) ? "open" : "closed"}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDownIcon strokeWidth={1} size={25} className="cursor-pointer"/>
                  </motion.div>
                </td>
              </tr>
              <AnimatePresence>
                {isBillDetailsOpen.get(bill) && (
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
                          {bill.details.map((detail, index) => (
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

export default BillsTable;
