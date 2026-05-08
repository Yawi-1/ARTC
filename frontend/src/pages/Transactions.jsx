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
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  
  const itemsPerPage = 20;

  const fetchTransactions = async () => {
    const query = new URLSearchParams({
      page: currentPage,
      limit: itemsPerPage,
      ...(filters.type !== "all" && { type: filters.type }),
      ...(filters.branch !== "all" && { branch: filters.branch }),
      ...(filters.category !== "all" && { category: filters.category }),
    }).toString();

    const res = await callApi({
      method: "GET",
      url: `/transactions?${query}`,
    });
    console.log('Fetch Response ',res)
    setData(res.data);
    setTotalExpense(res.totalExpense);
    setTotalIncome(res.totalIncome);
    setTotalCount(res.totalCount);
    setTotalPages(res.totalPages);
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, filters]);

  const isProfit = totalIncome >= totalExpense;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Transactions
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-blue-700 transition"
        >
          + Add Transaction
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <TransactionFilters
          data={data}
          filters={filters}
          setFilters={setFilters}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-xs text-gray-500">Total Transactions</p>
          <h2 className="text-lg font-semibold">{totalCount}</h2>
        </div>

        <div className="bg-green-50 p-4 rounded-xl border">
          <p className="text-xs text-green-600">Total Income</p>
          <h2 className="text-lg font-semibold text-green-700">
            ₹{totalIncome.toLocaleString()}
          </h2>
        </div>

        <div className="bg-red-50 p-4 rounded-xl border">
          <p className="text-xs text-red-600">Total Expense</p>
          <h2 className="text-lg font-semibold text-red-700">
            ₹{totalExpense.toLocaleString()}
          </h2>
        </div>

        <div
          className={`p-4 rounded-xl border ${isProfit ? "bg-blue-50" : "bg-yellow-50"
            }`}
        >
          <p className="text-xs text-gray-600">
            {isProfit ? "Profit" : "Loss"}
          </p>
          <h2
            className={`text-lg font-semibold ${isProfit ? "text-blue-700" : "text-yellow-700"
              }`}
          >
            ₹{Math.abs(totalIncome - totalExpense).toLocaleString()}
          </h2>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-xl shadow border">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <TransactionTable
          data={data}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>

      {/* Modal */}
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