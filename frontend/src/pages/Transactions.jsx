// Transactions.jsx
import React, { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import TransactionFilters from "../components/Transactions/TransactionFilters";
import TransactionTable from "../components/Transactions/TransactionTable";
import TransactionModal from "../components/Transactions/TransactionModal ";

const Transactions = () => {
  const { callApi, loading, error } = useApi();

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [filters, setFilters] = useState({
    type: "all",
    branch: "all",
    category: "all",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ Fetch
  const fetchTransactions = async () => {
    const res = await callApi({ method: "GET", url: "/transactions" });
    setData(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ✅ Filter logic
  const filteredData = data.filter((t) => {
    return (
      (filters.type === "all" || t.type === filters.type) &&
      (filters.branch === "all" || t.branch === filters.branch) &&
      (filters.category === "all" || t.category === filters.category)
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Transactions</h1>
        <button onClick={() => setShowModal(true)}>+ Add</button>
      </div>

      <TransactionFilters
        data={data}
        filters={filters}
        setFilters={setFilters}
      />

      <TransactionTable
        data={paginatedData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {showModal && (
        <TransactionModal
          onClose={() => setShowModal(false)}
          onSuccess={(newData) =>
            setData((prev) => [newData, ...prev])
          }
        />
      )}
    </div>
  );
};

export default Transactions;