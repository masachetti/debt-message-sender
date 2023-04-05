import React, { useState } from "react";
import IgnoredCustomersTable from "../components/IgnoredCustomersTable";
import { Link } from "react-router-dom";

const IgnoredCustomers = () => {
  const [search, setSearch] = useState("");

  const updateSearch: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    setSearch(ev.target.value);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <div className="py-10 px-20 flex flex-col items-center overflow-y-hidden h-screen">
        <div className="flex justify-between items-center w-full px-2">
          <input
            type="text"
            name="search"
            placeholder="Procurar..."
            className="w-4/5 py-1 px-2 border-2 outline-0 rounded-xl border-indigo-400 focus:border-indigo-900"
            onChange={updateSearch}
          />
          <Link to={"/"}>
            <button className="border-neutral-800 border-2 rounded-2xl px-3 py-2 text-sm font-bold">
              Voltar
            </button>
          </Link>
        </div>
        <IgnoredCustomersTable className="max-h-[80vh] my-4" searchString={search}/>
      </div>
    </div>
  );
};

export default IgnoredCustomers;
