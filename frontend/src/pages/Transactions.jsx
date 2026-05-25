// Transactions.jsx
import React, { useState } from "react";
import { Plus, TrendingUp, TrendingDown, Wallet, Loader2 } from "lucide-react";
import TransactionFilters from "../components/Transactions/TransactionFilters";
import TransactionTable from "../components/Transactions/TransactionTable";
import TransactionModal from "../components/Transactions/TransactionModal ";
import { useTransaction } from "../context/TransactionContext";

const Transactions = () => {
  const {
    transactions,
    loading,
    error,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    totalPages,
    totalCount,
    totalIncome,
    totalExpense,
    isProfit,
    fetchTransactions,
    itemsPerPage,
    setItemsPerPage
  } = useTransaction();

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Transactions
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track all financial activities</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Transaction
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl">
          <p className="text-red-700 text-sm">{error || "Something went wrong!"}</p>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200">
        <TransactionFilters
          data={transactions}
          filters={filters}
          setFilters={setFilters}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Transactions */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Transactions</p>
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-blue-500 mt-2" />
              ) : (
                <h2 className="text-2xl font-bold text-gray-800 mt-2">{totalCount}</h2>
              )}
            </div>
            <Wallet className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
        </div>

        {/* Total Income */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 shadow-sm border border-green-100 hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-700 font-medium uppercase tracking-wider">Total Income</p>
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-green-600 mt-2" />
              ) : (
                <h2 className="text-2xl font-bold text-green-700 mt-2">₹{totalIncome.toLocaleString()}</h2>
              )}
            </div>
            <TrendingUp className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Total Expense */}
        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-5 shadow-sm border border-red-100 hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-red-700 font-medium uppercase tracking-wider">Total Expense</p>
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-red-600 mt-2" />
              ) : (
                <h2 className="text-2xl font-bold text-red-700 mt-2">₹{totalExpense.toLocaleString()}</h2>
              )}
            </div>
            <TrendingDown className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Profit/Loss */}
        <div className={`rounded-2xl p-5 shadow-sm border hover:shadow-md transition-all duration-200 group ${
          isProfit 
            ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100" 
            : "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-100"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider">
                {isProfit ? "Net Profit" : "Net Loss"}
              </p>
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mt-2" />
              ) : (
                <h2 className={`text-2xl font-bold mt-2 ${
                  isProfit ? "text-blue-700" : "text-yellow-700"
                }`}>
                  ₹{Math.abs(totalIncome - totalExpense).toLocaleString()}
                </h2>
              )}
            </div>
            <Wallet className={`w-8 h-8 transition-transform group-hover:scale-110 ${
              isProfit ? "text-blue-500" : "text-yellow-500"
            }`} />
          </div>
        </div>
      </div>

      {/* Items Per Page Selector */}
      <div className="flex items-center justify-end gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100 w-fit ml-auto">
        <label htmlFor="itemsPerPage" className="text-sm font-medium text-gray-700">
          Items per page
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:border-blue-300 transition-colors"
        >
          {[5, 10, 15, 20, 25, 30].map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
        <TransactionTable
          data={transactions}
          loading={loading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <TransactionModal
          onClose={() => setShowModal(false)}
          onSuccess={async () => {
            await fetchTransactions();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Transactions;