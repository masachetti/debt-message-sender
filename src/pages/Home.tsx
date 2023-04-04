import React, { useState } from "react";
import CustomersTable from "../components/CustomersTable";
import Loading from "./../components/Loading";
import { AnimatePresence, motion } from "framer-motion";
import SendIcon from "../components/icons/Send";
import { useCustomersSelection } from "../context/customersContext";
import { useIgnoredCustomers } from "../context/ignoredCustomersContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
  const [search, setSearch] = useState("");
  const { loading: customersLoading } = useCustomersSelection();
  const { loading: ignoredCustomersLoading } = useIgnoredCustomers();

  const navigate = useNavigate();

  const updateSearch: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    setSearch(ev.target.value);
  };

  // if (search) {
  //   displayCustomers = displayCustomers!.filter((customer) =>
  //     customer.nome_razaosocial.toLowerCase().includes(search.toLowerCase())
  //   );
  //   displayIgnoredCustomers = displayIgnoredCustomers!.filter((customer) =>
  //     customer.nome_razaosocial.toLowerCase().includes(search.toLowerCase())
  //   );
  // }

  let loading = customersLoading || ignoredCustomersLoading;

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
            <CustomersTable
              className="max-h-[80vh] my-4"
              onCustomerRowDoubleClick={goToCustomerPage}
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
