import React, { useState } from "react";
import CustomersTable from "../components/CustomersTable";
import Loading from "./../components/Loading";
import { AnimatePresence, motion } from "framer-motion";
import SendIcon from "../components/icons/Send";
import { useIgnoredCustomers } from "../context/ignoredCustomersContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCustomers } from "../context/customersContext";
import ThreeStateToggleButton from "../components/ThreeStateToggleButton";

function Home() {
  const [search, setSearch] = useState("");
  const [documentFilter, setDocumentFilter] = useState<"CPF" | "CNPJ" | null>(
    null
  );
  const { isFetching } = useCustomers();
  const { loading: ignoredCustomersLoading } = useIgnoredCustomers();

  const navigate = useNavigate();

  const updateSearch: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    setSearch(ev.target.value);
  };

  const updateDocumentFilter = (buttonState: number) => {
    if (buttonState === -1) return setDocumentFilter("CPF");
    if (buttonState === 0) return setDocumentFilter(null);
    if (buttonState === 1) return setDocumentFilter("CNPJ");
  };

  let loading = isFetching || ignoredCustomersLoading;

  const goToCustomerPage = (customer: Customer) => {
    let url = "/customer/" + customer.customerId;
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
              <Link to={"/ignored-customers"}>
                <button className="text-white bg-neutral-800 border rounded-2xl px-3 py-2 text-sm font-bold">
                  Ver ignorados
                </button>
              </Link>
            </div>
            <div className="flex mt-2">
              <p>Apenas CPFs</p>
              <ThreeStateToggleButton
                className="mx-2"
                onStateChange={updateDocumentFilter}
              />
              <p>Apenas CNPJs</p>
            </div>
            <CustomersTable
              className="max-h-[80vh] my-4"
              searchString={search}
              onCustomerRowDoubleClick={goToCustomerPage}
              documentType={documentFilter}
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
